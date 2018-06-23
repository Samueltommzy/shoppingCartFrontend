import { Component, OnInit ,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormControl,Validators,FormGroup } from '@angular/forms';
import { ApiService } from '../../app/api.service';
import { StateService } from '@uirouter/angular';
import { dataValidator } from '../validation';
import { fadeIn } from '../animations/fadeIn';
import * as moment from 'moment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations: [fadeIn],
  
})
export class SigninComponent implements OnInit {
  public signinForm: FormGroup;
  @Input() userData: any;
  constructor(public api: ApiService, public state: StateService) { 
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.compose([Validators.required,Validators.pattern(dataValidator.emailRegex)])]),
      password: new FormControl('', [Validators.compose([Validators.required, Validators.pattern(dataValidator.passwordRegex)])])
    })
  }

  ngOnInit() { }

  public login() {
    this.userData = {
      email: this.signinForm.controls['email'].value,
      password: this.signinForm.controls['password'].value
    }
    
    this.api.login(this.userData).subscribe(data=>{
      if ( data ['success'])
      {
        let expiresAt = moment().add(data['expiresIn'],'seconds');
        let userSession = {"token":   data['token'],
                           "expires": JSON.stringify(expiresAt).valueOf(),
                           "status" : data['status'],
                           "success": data['success'],
                         }
        localStorage.setItem("userSession" , JSON.stringify(userSession));
      }
      alert("successfully logged in");
      this.state.go("products" ,null , {reload:true});
    });
  }
}

