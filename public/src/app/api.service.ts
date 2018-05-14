import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http,Response } from '@angular/http' ;
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class ApiService {
baseUrl : string
constructor( private http: Http) {
this.baseUrl = "https://cartbackend/herokuapp.com";
}

signup(user): any {
  console.log("api",user);
  return this.http.post(`${ this.baseUrl }/user/signup` , {user:user}).map(this.parseData).toPromise().then(response => {
    return response;
  }).catch(this.handleError);
};
 
login(user: {}): any{
 return this.http.post(`${this.baseUrl}/user/signin`, {user: user}).map(this.parseData).toPromise().then( response =>{
   return response;
  }).catch(this.handleError);
};

googleLogin(user: {}) {
  console.log("user",user);
  return this.http.post(`${this.baseUrl}/user/googlesignin` , {user: user}).map(this.parseData).toPromise().then(res=>{
    console.log("google api");
    return res;
  }).catch(this.handleError);
};

getAllProducts(): any{
  return this.http.get(`${this.baseUrl}/home/product`)
  .map(this.parseData).toPromise().then(response=>{
    console.log("product api" , response);
    return response;
  }).catch(this.handleError);
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
  }

