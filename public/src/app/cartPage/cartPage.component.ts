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
  constructor(private location:Location,private state:StateService) { }

  ngOnInit() { 
  
  }

  goBack(){
    this.location.back();
  }
}
