import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Observable';

@Component({
selector: 'app-news',
templateUrl: './profile.component.html',
styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

constructor(private apiService : ApiService) { }

ngOnInit() { 
    }
 
}
