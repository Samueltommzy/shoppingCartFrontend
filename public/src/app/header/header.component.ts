import { Component, OnInit,Input, Output } from '@angular/core';
import { StateService } from '@uirouter/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(public stateService: StateService) {   }

ngOnInit() {}

};
