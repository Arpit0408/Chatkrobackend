const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String , required:true, unique:true},
    password:{type:String, required:true},
    pic:{type:String, default:"https://cdn-icons-png.freepik.com/512/552/552909.png"},
},
{
    timestamps:true
}
);


userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
const User = mongoose.model("User" , userSchema);
module.exports = User;