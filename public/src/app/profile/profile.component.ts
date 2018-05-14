import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Observable';
import { slide } from '../animations/slide';

@Component({
selector: 'app-news',
templateUrl: './profile.component.html',
styleUrls: ['./profile.component.scss'],
animations: [slide]
})

export class ProfileComponent implements OnInit {
@Input() products : Array<object>;

constructor(private apiService : ApiService) { }
ngOnInit() { 
    console.log("products" , this.products);
    }
public add(){

 }
}
