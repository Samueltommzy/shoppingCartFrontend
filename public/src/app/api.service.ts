import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http,Response } from '@angular/http' ;
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { _throw } from 'rxjs/observable/throw';
import * as moment from 'moment';

@Injectable()
export class ApiService {
baseUrl : string
//"https://cartbackend.herokuapp.com"
constructor( private http: Http , private httpClient: HttpClient ) {
this.baseUrl = "http://localhost:3000";
}

signup(user): any {
  console.log("api",user);
  return this.http.post(`${this.baseUrl}/user/signup` , {user:user}).map(this.parseData).toPromise().then(response => {
    return response;
  }).catch(this.handleError);
};
 
login(user: {}): any{
  return this.httpClient.post(`${this.baseUrl}/user/signin`,{user: user});
};

socialLogin(user: {}) {
  console.log("user",user);
  return this.http.post(`${this.baseUrl}/user/googlesignin` , {user: user}).map(this.parseData).toPromise().then(response=>{
    console.log("google api");
    return response;
  }).catch(this.handleError);
};

getAllProducts(): any{
  return this.http.get(`${this.baseUrl}/home/product`).map(this.parseData).toPromise()
  .then(data=>{console.log("products" , data);return data}).catch(this.handleError);
};

logout(): any {
  return this.http.get(`${this.baseUrl}/user/logout`).map(this.parseData).toPromise()
  .then(data=>{
    console.log("log out" , data);
    if (data.success){
      localStorage.clear();
      return data;
    }
  })
}

private parseData(res: Response) {
  let data = res.json();
  console.log('got data', data);
    return data;
}
private handleError(error: Response | any) {
  let errorMessage: string;
  errorMessage = error.message ? error.message : error.toString();
  console.log("caught error",errorMessage);
  return Observable.throw(errorMessage);
}

public setsession(authResponse) {
  let expiresAt = moment().add(authResponse.expiresIn,'second');
  localStorage.setItem('token' , authResponse.token);
  localStorage.setItem('status', authResponse.status);
  localStorage.setItem('message' , authResponse.message);
  localStorage.setItem('expiresAt' , JSON.stringify(expiresAt.valueOf()));
}
public isLoggedIn() {
  return moment().isBefore(this.getExpiration());
}

public isLoggedOut() {
  return !this.isLoggedIn();
}

public getExpiration() {
  let expiration  = localStorage.getItem('expires');
  let expiresAt = JSON.parse(expiration);
  return moment(expiresAt);
}
  }

