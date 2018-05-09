let express = require("express");
let bodyParser = require("body-parser");
let morgan = require("morgan");
let config = require("./config/config");
let productRoute = require("./routes/productRoute");
let mongoose = require("mongoose");
let passport = require("passport");
let cors = require("cors");
let session = require("express-session");
let flash = require("connect-flash");
let mongoStore =require("connect-mongo")(session);
let cookieParser = require("cookie-parser");
let methodOverride = require("method-override");
let Products = require("./routes/productRoute");
let app = express();
let http = require("http").createServer(app)
let port = process.env.port || 3000;
let userRoute = require("./routes/userRoute")(express);

mongoose.Promise = global.Promise;
mongoose.connect(config.database).then((err)=>{
    if(err) console.log(err);
    console.log("successfully connected to " + config.databaseName);
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(session({
    secret: "sammy",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 180*60*1000}
 }));


app.use(express.static(__dirname + "/public"));
app.use("/npm",express.static(__dirname + "/node_modules"));
app.use('/user', userRoute);
app.use('/' , productRoute);

app.get('*',(req,res)=>{
    res.redirect('/user/signup');
})
http.listen(port,(err)=>{
    if(err) console.log(err);
    console.log("app listening on " + port);
});

app.use((req,res)=>{
   // console.log(err)
    res.status(500).send({
        status: 500,
        success: false,
        message: `could not start app`
    });
    return false;
});
