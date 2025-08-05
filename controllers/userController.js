const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const  registerUser = asyncHandler(
async (req,res) =>{
  
    const{name, email,password,pic}=req.body

if(!name || !email || !password){
    throw new Error('Please provide all fields');
}

const userExists = await User.findOne({email})

if(userExists){
    throw new Error('Email already in use');
}
const user = await User.create({
    name,
    email,
    password,
    pic,
})

if(user){
    res.status(201).json({
_id:user._id,
email:user.email,
name:user.name,
pic:user.pic,
    
    })
}
else{
    res.status(400).json({message:'Invalid user data'})
}

});


const authUser = asyncHandler(async(req,res)=>{
const{email,password} = req.body;
const user = await User.findOne({email});
if(user && (await user.matchPassword(password))){
    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
}
})

//allusers?serach=query
const allUsers =  asyncHandler(async(req,res)=>{
const keyword = req.query.search ?{
    $or:[
        {name:{$regex:req.query.search,$options:'i'}},
        {email:{$regex:req.query.search,$options:'i'}},

    ]
}:{};
const users = await User.find(keyword).find({_id:{ $ne: req.user._id} })
res.send(users);
console.log(keyword);

})

module.exports = {registerUser , authUser , allUsers };
