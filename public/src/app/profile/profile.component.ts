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
@Input() products : Array<object>;
//@Input() name : any;

constructor(private apiService : ApiService, public trans: Transition , public state: StateService) { 
   // this.name = this.trans.params().name ; 
    
}
ngOnInit() { 
    console.log("products in profile " , this.products);
    //console.log("name" , this.name);
   // alert(`welcome ${this.name}`);
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
}
