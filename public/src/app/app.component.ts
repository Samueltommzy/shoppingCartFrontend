import { Component, AfterViewInit } from '@angular/core';
import { UIROUTER_DIRECTIVES } from '@uirouter/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'shoppingCart';
  constructor(){
  
  }
  ngAfterViewInit(){

  }
}
