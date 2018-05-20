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
           alert(data.message);
           let cartProduct = data.data;
           sessionStorage.setItem("products" ,JSON.stringify(cartProduct));
           let myObj = JSON.parse(sessionStorage.getItem('products'));
           this.state.go('cart' , {product: data.data} , {reload: true});
       }
     })
 }
}
