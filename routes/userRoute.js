"use strict";

let userModel = require("../models/user");
let express = require("express");
let passport = require("passport");
let Order = require("../models/order");
let Cart = require("../models/cart");
let { authmw,tokenmw } = require("../middleware/middleware");
let csrf = require("csrf");

let csrfProtection = csrf();
//userRoute.use(csrfProtection);
module.exports = (express)=>{
let userRoute = express.Router();
userRoute.get('/profile',(req, res, next)=>{
  Order.find({user:req.user},function(err,orders){
    if(err){
      return res.write('Error');
    }
    let cart;
    orders.forEach((order)=>{
      cart=new Cart(order.cart);
      order.products=cart.generateArray();
    });
    res.render('user/profile',{orders:orders});
  });
});

userRoute.get('/logout',(req, res, next)=>{
  req.logout();
  res.redirect('/');
});

userRoute.use('/',(req, res, next)=>{
  next();
});

userRoute.post('/signup',(req,res,next)=>{
  let userObj = {
             password:    req.body.password,
             firstName:   req.body.firstName,
             lastName:    req.body.lastName,
             email:       req.body.email,
             phoneNumber: req.body.phoneNumber,
           
         };
         console.log(userObj);
         userModel.find({ email:userObj.email, phoneNumber: userObj.phoneNumber,available: true}).exec((err,document)=>{
            //  if (err) return next(err);
            //  if (req.session.oldUrl) {
            //    let oldUrl=req.session.oldUrl;
            //    req.session.oldUrl=null;
            //    res.redirect(oldUrl);
            //  }
  
            //  else {
            //    res.redirect('/user/profile');
            //   }
             if (document.length) {
                 res.status(200).send({
                     success: false,
                     message: "sorry email or phone number has been used already"
                 });

                 return false;
             };

             let user = new userModel(userObj);
             user.save((err,doc)=>{
                 if(err) return next(err);
                 res.status(200).send({
                     success: true,
                     status: 200,
                     message: "successfully created user",
                     data: doc
                 })
             })
         });
});

userRoute.post('/signin',(req, res, next)=> {
 let loginDetails = {
   email: req.body.email,
   password: req.body.password
 }

 userModel.findOne({email:loginDetails.email,available:true}).exec((err,doc)=>{
   console.log(loginDetails.email);
   console.log(loginDetails.password);
   
   if (err) return next(err);
   if (!doc) {
     res.status(200).send({
       success: false,
       message: "wrong email address"
     });
     return false;
   };
   doc.passwordCheck(loginDetails.password,(err,isMatch)=>{
     if (err) return next(err);
     if(!isMatch) {
       res.status(200).send({
         success: false,
         message: "wrong password"
       });
       return false;
     }
     console.log("doc",doc);
     let tokenObj = {
       id:doc.id,
       email: doc.email
     }
     let token = tokenmw(tokenObj);
     res.status(200).send({
       status:200,
       success:true,
       message: "sucessfully logged in",
       data: doc,
       token: token
     })
   })
 })
});
return userRoute;
};

// function isLoggedIn(req, res, next){
//   if(req.isAuthenticated()){
//     return next();
//   }
//   res.redirect('/');
// }
// function notLoggedIn(req, res, next){
//   if(!req.isAuthenticated()){
//     return next();
//   }
//   res.redirect('/');
// }

