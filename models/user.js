"use strict";
let mongoose = require("mongoose");
let bcrypt = require("bcrypt-nodejs");
let Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: { type: String, required:true },
    lastName:  { type: String, required:true },
    email: { type:String, required: true},
    phoneNumber: { type:Number, required: true},
    password: { type: String, required:true},
    available: { type: Boolean, default: true}
});

userSchema.methods.encryptPassword=function(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};
userSchema.methods.validPassword=function(password){
  return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model("User" , userSchema);