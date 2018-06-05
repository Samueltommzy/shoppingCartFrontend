import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Observable';
import { slide } from '../animations/slide';
import { Transition, StateService } from '@uirouter/angular'


@Component({
selector: 'app-news',
templateUrl: './profile.component.html',
styleUrls: ['./profile.component.scss'],
animations: [slide]
})

export class ProfileComponent implements OnInit {
@Input() products : any;
@Input() Quantity: number;

//@Input() name : any;

constructor(private apiService : ApiService, public trans: Transition , public state: StateService) { 
   // this.name = this.trans.params().name ; 
    
}
ngOnInit() { 
    }
public add(){

 }
 public logout() {
     this.apiService.logout().then(data=>{
         if (data.success)  {
             alert(data.message);
             this.state.go('signup' , null , {reload: true});
         }
     });
 }
 public addtoCart(product) {
     let producIndex = this.products.indexOf(product);
     let productId = this.products[producIndex].id;
     product = this.products[producIndex];
     this.apiService.addtoCart(product).then(data=>{
       if (data.success)  {
    //        alert(data.message);
    //        let cartProduct = data.data;
    //        sessionStorage.setItem("products" ,JSON.stringify(cartProduct));
    //        let myObj = JSON.parse(sessionStorage.getItem('products'));
    //        this.state.go('cart' , {product: data.data} , {reload: true});
              let item = JSON.parse(localStorage.getItem("cartItems"));
              if ( item ) {
                  let exists = false;
                  for (let i = 0; i <item.length;i++) {
                      if (product.productName == item[i].productName) {
                          exists = true;
                          item[i].productPrice = (product.productPrice * this.Quantity) + item[i].productPrice;
                          item[i].quantity = this.Quantity;
                      }
                  }

                  if (!exists) {
                      localStorage.setItem("cartItems", JSON.stringify(item));
                      item.productPrice = (product.productprice * this.Quantity);
                  }
              }
              else {
                  let cartArray = new Array();
                  cartArray.push(product);
                  localStorage.setItem("cartitems", JSON.stringify(cartArray));
              };
              alert(data.message);
              this.state.go('cart' , null, {reload:true});
      }
      else {
          alert(data.message);
      }
     });
 }
}
