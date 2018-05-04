"use strict";

let userModel = require("../models/user");
let express = require("express");
let passport = require("passport");
let Order = require("../models/order");
let Cart = require("../models/cart");
let { authmw,tokenmw } = require("../middleware/middleware");
let csrf = require("csrf");
let userRoute = express.Router();
let csrfProtection = csrf();
userRoute.use(csrfProtection);

userRoute.get('/profile',isLoggedIn,(req, res, next)=>{
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
userRoute.get('/logout',isLoggedIn,(req, res, next)=>{
  req.logout();
  res.redirect('/');
});

userRoute.use('/',notLoggedIn,(req, res, next)=>{
  next();
});

userRoute.get('/signup',(req, res, next)=>{
  let messages=req.flash('error');
  res.render('user/signup',{csrfToken: req.csrfToken(), messages:messages, hasErrors:messages.length>0});
});

userRoute.post('/signup',passport.authenticate('local.signup',{
  failureRedirect:'/user/signup',
  failureFlash:true
}),(req, res, next)=>{
  if (req.session.oldUrl) {
    let oldUrl=req.session.oldUrl;
    req.session.oldUrl=null;
    res.redirect(oldUrl);
  }
  
  else {
    res.redirect('/user/profile');
  }
});

userRoute.get('/signin',(req, res, next)=>{
 var messages=req.flash('error');
 res.render('user/signin',{csrfToken: req.csrfToken(), messages:messages, hasErrors:messages.length>0});
});

userRoute.post('/signin', passport.authenticate('local.signin',{
 failureRedirect:'/user/signin',
 failureFlash:true
}),(req, res, next)=>{
  if(req.session.oldUrl){
    let oldUrl=req.session.oldUrl;
    req.session.oldUrl=null;
    res.redirect(oldUrl);
  }
  else {
    res.redirect('/user/profile');
  }
} );

module.exports = userRoute;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

//  userRoute.post('/signup',(req,res,next)=>{
//         let userObj = {
//             firstName:    req.body.firstName,
//             lastName:    req.body.lastName,
//             email:       req.body.email,
//             phoneNumber: req.body.phoneNumber,
//             password:    req.body.password
//         };
//         console.log(userObj);
//         userModel.find({ email:userObj.email, phoneNumber: userObj.phoneNumber,available: true}).exec((err,document)=>{
//             if (err) return next(err);

//             if (document.email) {
//                 res.status(200).send({
//                     success:false,
//                     message: "sorry,email has been used already"
//                 });

//                 return false;
//             };
//             if (document.length) {
//                 res.status(200).send({
//                     success: false,
//                     message: "sorry email or phone number has been used already"
//                 });

//                 return false;
//             };

//             let user = new userModel(userObj);
//             user.save((err,doc)=>{
//                 if(err) return next(err);
//                 res.status(200).send({
//                     success: true,
//                     status: 200,
//                     message: "successfully created user",
//                     data: doc
//                 })
//             })
//         });
//     });

//     userRoute.post('/login' , (req,res,next)=>{
//         let userObj = {
//             email: req.body.email,
//             password: req.body.password
//         };
//     console.log("here",userObj);
//         userModel.findOne({email:userObj.email , available:true}).exec((err,document)=>{
//             if (err) return next(err);
//             console.log(document);
//             if (!document) {
//                 res.status(200).send({
//                     status: 200,
//                     success: false,
//                     message: "Invalid email address"
//                 });
//                 return false;
//             }
//             document.passwordCheck(userObj.password,(err,isMatch)=>{
//                 if (err) return next(err);
//                 if (!isMatch) {
//                     res.status(200).send({
//                         status: 200,
//                         success: false,
//                         message: "Invalid password"
//                     });
//                     return false;
//                 }
//                 let tokenObj = {
//                     id: document.id,
//                     email: document.email
//                 }
//                 let token = tokenmw(tokenObj);
//                 res.status(200).send({
//                     status: 200,
//                     success: true,
//                     message: "successfully logged in",
//                     authentication: token
//                 });
//             });
//         });
//     });
//     return userRoute;
// }
