let express = require("express");
let bodyParser = require("body-parser");
let morgan = require("morgan");
let config = require("./config/config");
let userRoute = require("./routes/userRoute");
let mongoose = require("mongoose");
let cors = require("cors");
let methodOverride = require("method-override");
let Products = require("./routes/productRoute");
let app = express();
let http = require("http").createServer(app)
let port = process.env.port || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(config.database).then((err)=>{
    if(err) console.log(err);
    console.log("successfully connected to " + config.databaseName);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
let api = require("./routes/userRoute")(app);
app.use('/api',api);
app.use('api/products' , Products);
app.use(express.static(__dirname + "/public"));
app.use("/npm",express.static(__dirname + "/node_modules"));

app.get('*',(req,res)=>{
    res.redirect('/api/login');
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
