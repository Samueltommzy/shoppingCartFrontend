import React from "react";
import axios from "axios";
import Table from "react-bootstrap/es/Table";


export default class Products extends React.Component{
    constructor(props){
        super(props);
        this.state = { products: [], totalCost: 0, productQuantity: 0};
        this.onChange = this.onChange.bind(this);
        this.cartRefresh = this.cartRefresh.binf(this);
    }

    componentDidMount(){
        this.cartRefresh();
    }

    cartRefresh(){
        let url = "http://localhost:3000/api/cart/getCart";
        axios.get(url).then((res)=>{
            let products = res.data;
            let url = "http://localhost:3000/api/cart/totalCost";
            axios.get(url).then((res)=>{
                let totalCost = res.data;
                let url = "http://localhost:3000/api/cart/productQuantity";
                axios.get(url).then((res)=>{
                    let productQuantity = res.data;
                    this.setState({products:products,totalcost:totalCost,productQuantity:productQuantity});
                    if (products == "") {
                        let productsTab = document.getElementById("productsTab");
                        setTimeout(function(){
                            productsTab.click();
                        }.bind(this),1000);
                    }
                }).bind(this)
            }).bind(this)
        }).bind(this)
    }

    onChange(event){
        const checkout = "checkout";
        const addtoCart = "add";
        const remove = "remove";
        if (event.target.name == checkout) {
            let url = "http://localhost:3000/api/cart/checkout";
            axios.post(url,{id:event.target.id}).then((res) =>{});
                if (res.data.success) {
                    alert("Thank you for shopping");
                    setTimeout(function(){
                        this.cartRefresh();
                    }.bind(this),150);
                }
        };

        if  (event.target.name == "addtoQuantity"){
            let url = "http:localhost:3000/api/cart/add";
            axios.post(url,{id: event.target.id}).then((res)=>{});
            setTimeout(function(){
                this.cartRefresh();
            }.bind(this),150);
        };

        if (event.target.name == "reduceQuantity"){
            let quantity = +$('quantity[id=' + event.target.id + ']').text();
            if (quantity > 1){
                let url = "http://localhost:3000/api/cart/remove";
                axios.post(url,{id: event.target.id}).then((res)=>{});
                setTimeout(function(){
                    this.cartRefresh();
                }.bind(this),150);
            }
        }

        if (event.target.name ="remove") {
            let url = "http://localhost:3000/api/cart/removeProduct";
            axios.post(url,{id:event.target.id}).then((res)=>{});
            setTimeout(function(){
                this.cartRefresh();
            }.bind(this),150);
        }
    }
    render(){
        if(this.state.products == ""){
            return(
                <p style = {{marginTop:'2em', fontSize:'2em', fontFamily:'monospace', color:'red'}}>Cart is empty!</p>
            )
        }
        else{
            return(
                 <div style={{fontFamily: 'monospace'}}>
                    <div className="card" style={{textAlign:'center', width: '50%', marginLeft: '25%', marginTop: '2em'}}>
                        <div style={{fontSize: '2em'}} className="card-header">Cart</div>
                            <h3 style={{marginTop: '1.5em'}}>Number of products: {this.state.noOfProducts}</h3>
                            <div style={{width: '70%', marginLeft: '15%', marginTop: '1em'}}>
                                <Table striped bordered condensed hover fill>
                                    <thead style={{fontWeight: 'bold'}}>
                                    <tr style={{textAlign: 'center'}}>
                                        <td>Name</td>
                                        <td>Price</td>
                                        <td>Quantity</td>
                                        <td>Amount</td>
                                    </tr>
                                    </thead>
                                    <tbody style={{overflowY: 'auto', height: '50%'}}>
                                    {this.state.products.map(function(product){
                                        return (
                                            <tr style={{textAlign: 'center'}}>
                                                <td><button className="red" name={'remove'} id={product.id} onClick={this.onChange} style={{float: 'left'}}>X</button>{product.name}</td>
                                                <td><price>{product.price}</price></td>
                                                <td><button className="red" name={'cminus'} id={product.id} onClick={this.onChange} style={{float: 'left'}}>-</button><quantity id={product.id}>{product.quantity}</quantity><button className="green" name={'cplus'} id={product.id} onClick={this.onChange} style={{float: 'right'}}>+</button></td>
                                                <td id={product.id}>{product.amount}</td>
                                            </tr>
                                        )
                                    }.bind(this))}
                                    </tbody>
                                </Table>
                            </div>
                        <h3 style={{fontSize: '2em'}} id="totalcost">Total cost: {this.state.totalamount}</h3>
                        <button style={{marginRight: '0.1em', marginBottom: '0.1em', fontFamily: 'monospace', fontSize: '1.5em', width: 'wrap', alignSelf: 'center'}} className="purple" name="checkout" onClick={this.onChange}>Checkout</button>
                    </div>
</div>  
            );
        }
    }
    }
