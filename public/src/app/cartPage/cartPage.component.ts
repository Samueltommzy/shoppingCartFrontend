import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from'@angular/common';

import { ApiService } from '../../app/api.service';
import { StateService } from '@uirouter/angular';


@Component({
  selector: 'app-cartpage',
  templateUrl: './cartPage.component.html',
  styleUrls: ['./cartPage.component.scss']
})
export class CartPageComponent implements OnInit {
  @Input() product: any;
  constructor(private location:Location,private state:StateService , public apiService: ApiService) { }

  ngOnInit() { 
    this.product =  JSON.parse(localStorage.getItem("cart"));
    console.log(this.product);
  }

  goBack(){
    this.location.back();
  }
  public logout() {
     this.apiService.logout().then(data=>{
         if (data.success)  {
             alert(data.message);
             this.state.go('signup' , null , {reload: true});
         }
     });
 }

 public clear() {
   localStorage.clear();
   alert("cart has been cleared")
   this.state.go('cart' , null, {reload: true});
   
 }
}
