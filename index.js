const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// const port = 5000;
const chats = require('./data/data');
const  connectiondb = require('./config/db');
dotenv.config();
connectiondb();
const app = express();
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes.js')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

app.use(express.json());

const port = process.env.PORT || 5000;

const corsOptions = {
origin: ['https://chatkro-ochre.vercel.app/', 'http://localhost:5000'],
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true, // if you're using cookies/tokens
};

app.use(cors(corsOptions));


app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const io =require('socket.io')(server,{
  pingTimeout: 60000,
  cors: {
    origin:"https://chatkro-ochre.vercel.app/"
  }
});

io.on("connection" , (socket)=>{
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
})
