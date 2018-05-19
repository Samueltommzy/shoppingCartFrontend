import { Component, OnInit , Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StateService , Transition } from '@uirouter/angular';
import { dataValidator } from '../validation';
import { AuthService, FacebookLoginProvider,GoogleLoginProvider} from 'angular5-social-login';
import { fadeIn } from '../animations/fadeIn';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [fadeIn],
  host: {'[@fadeIn]' : ''},
  moduleId: module.id.toString()
})


export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public submitted: false;
  @Input() userData;
  constructor( public formbuider: FormBuilder, public state: StateService,public api: ApiService ,private social: AuthService, public trans: Transition) {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [ Validators.required,Validators.minLength(3)]),
      lastName: new FormControl('',  [ Validators.required, Validators.minLength(3)]),
      email: new FormControl('',[Validators.compose([Validators.pattern(dataValidator.emailRegex),Validators.required])]),
      phoneNumber: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.compose([Validators.pattern(dataValidator.passwordRegex),Validators.required])]),
    });
   }

  ngOnInit() {
       

  }
  public user(){
  let firstName = this.signupForm.controls['firstName'].value;
  let lastName = this.signupForm.controls['lastName'].value;
  let email = this.signupForm.controls['email'].value; 
  let phoneNumber = this.signupForm.controls['phoneNumber'].value;
  let password = this.signupForm.controls['password'].value;
   this.userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    password: password
  }

  this.api.signup(this.userData).then((data)=>{
    if (!data.success) { console.log("error"); alert(data.message); }
    else{
    console.log("new state");
    alert(data.message);
    this.state.go('products' , { name: this.userData.firstName}, { reload: true});
    }
  });   
  }

  fbLogin() {
    let fbProvider = FacebookLoginProvider.PROVIDER_ID;
    this.social.signIn(fbProvider).then((data)=>{
      console.log("data",data);
      let userData = {
        name: data.name,
        email: data.email,
        id: data.id,
        token: data.token
      }
      this.api.socialLogin(userData).then(data=>{
        if (!data.success) {
          this.state.go('signup' ,null ,{reload: true});
        }

        else if (data.status == 201) {
          alert(`Already logged in as ${userData.name}`);
          this.state.go('products', null, {reload: true})
        }

        else {
          alert("successfully logged in with facebook");
          this.state.go('products' , {name:userData.name.split(" ")[0] }, {reload:true});
        }
      });
    });
    };



googleLogin() {
  let googleProvider = GoogleLoginProvider.PROVIDER_ID;
    this.social.signIn(googleProvider).then((data)=>{
      console.log("data",data);
      let userData = {
        name:data.name,
        email: data.email,
        id: data.id,
        token: data.token
      }
      this.api.socialLogin(userData).then(data=>{
        console.log(data);
        if(!data.success){
          alert(data.message);
          this.state.go('signup', null, {reload:true});
        }
        else if(data.status == 201) {
          alert(data.message);
          this.state.go('products', null, {reload: true});
        }
        else{
          alert(data.message);
          this.state.go('products', null, {reload: true});
        }
      });
    });
}
}
