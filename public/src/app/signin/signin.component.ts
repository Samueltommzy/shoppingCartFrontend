import { Component, OnInit ,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormControl,Validators,FormGroup } from '@angular/forms';
import { ApiService } from '../../app/api.service';
import { StateService } from '@uirouter/angular';
import { dataValidator } from '../validation';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
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
    this.api.login(this.userData).then((data)=>{
      console.log(data.success);
      if (!data.success) { 
        alert(data.message);
      }

      else {
      alert(data.message);
      this.state.go('products' , null ,{reload: true});
      }
    });
  }
}

