
module.exports = function Cart(old){
    this.products = old.products || {};
    this.totalQuantity = old.totalQuantity || 0;
    this.totalPrice = old.totalPrice || 0;
    this.add = (product,id)=>{
        let storedproduct = this.product[id];
        if (!storedproduct) {
            storedproduct = this.products[id] = {product: product,quantity:0,price: 0};
        }
        storedproduct++;
        storedproduct.price = storedproduct.product.price *  storedproduct.quantity;
        this.totalQuantity++;
        this.totalPrice += storedproduct.item.price;
    };
    this.decrement = (id)=>{
        this.products[id].quantity--;
        this.products.price -= this.products[id].product.price;
        this.totalQuantity--;
        this.totalPrice -= this.products[id].product.price;
        if (this.products[id].quantity <= 0) {
            delete this.products[id];
        }
    };
    this.removeProduct = (id)=>{
        this.totalQuantity -= this.products[id].quantity;
        this.totalPrice -= this.products[id].price;
        delete this.products[id];
    };
    this.generate = ()=>{
        let arr =[];
        for (let id in this.products) {
            arr.push(this.products[id]);
        }
        return arr;
    };
}