import React from "react";
import * as ReactDOM from "react-dom";
import Products from "./components/Products/product";
import Cart from "./components/Cart/cart";
import Button from "react-bootstrap/es/Button";

export default class App extends React.Component 
{
    constructor(props) // definition of the constructor
    {
        super(props);
        this.state = {currentComponent: <Products/>};
        this.onButtonClick = this.onButtonClick.bind(this);
    } 

    onButtonClick(event) // definition of the function onButtonClick
    {
        const PRODUCTS = "products";
        const CART = "cart"
        if(event.target.name==PRODUCTS)
        {
            this.setState({currentComponent: <Products/>});
            console.log("current component: cart");
        }
        if(event.target.name==CART)
        {
            this.setState({currentComponent: <Cart/>});
            console.log("current component: cart");
        }
    } 

    render() 
    {
        var currentComponent = this.state.currentComponent;
        return (
            <div style={{marginTop: '1em'}}>
                <div style={{alignSelf: 'center'}}><Button bsStyle="info" id="productsTab" name="products" style={{marginRight: '1.5em', fontSize: '1.5em'}} onClick={this.onButtonClick}>Products</Button><Button id="cartTab" name="cart" onClick={this.onButtonClick} bsStyle="info" style={{marginLeft: '1.5em', fontSize: '1.5em'}}>Cart</Button></div>
                {currentComponent}
            </div>
        );
    };
} // end of the class definition

var app = <App/>;
var node = document.getElementById("app");
ReactDOM.render(app, node);