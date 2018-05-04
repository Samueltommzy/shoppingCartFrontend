let express = require("express");
let productRoute =  express.Router();
let product = require("../randomProducts/products");
let Product = require("../models/product");
let Cart = require("../models/cart");

productRoute.get('/', (req,res,next)=>{
    Product.find({available:true}).exec((err,document)=>{
        if(err) return next(err);
        console.log("products", document);
        res.status(200).send({
            status: 200,
            success: true,
            message: "Products loaded",
            data: document
        });
    });
});

productRoute.get('/addtoCart/:id',(req,res,next)=>{
    let productId = req.params.id;
    let cart = new Cart(req.session.cart? req.session.cart: {});
    Product.findById(productId,(err,product)=>{
        if (err) return res.redirect('/');
        cart.add(product,productId);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

productRoute.get('/decrement/:id',(req,res,next)=>{
    let productid = req.params.id;
    let cart = new Cart(req.session.cart? req.session.cart: {});
    cart.decrement(productid);
    req.session.cart = cart;
    res.redirect('/cart');
});

productRoute.get('/cart',(req,res,next)=>{
    if (!req.session.cart) {
        return res.render('cart/cart' , {products:null});
    }
    let cart = new cart(req.session.car);
     res.render('cart/cart',{products:cart.generateArray(), totalPrice:cart.totalPrice});
     

})
module.exports = productRoute;