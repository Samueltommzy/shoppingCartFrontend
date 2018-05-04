let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let productSchema = new Schema({
    available: { type: Boolean, default: true },
    productName: { type: String, required: true},
    productPrice: { type: Number, required: true},
    image:{ type: String},
    productdescription: { type: String, required: true}
});

module.exports = mongoose.model("Product", productSchema);
