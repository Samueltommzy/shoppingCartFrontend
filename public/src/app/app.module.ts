import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule , Http } from '@angular/http';
import { FormsModule,FormControl, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';


import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { SourceHeadlineComponent } from './source-headline/source-headline.component';

import { ApiService } from './api.service';
import { UIRouterModule } from '@uirouter/angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UIView } from '@uirouter/angular';
import { StateService, Transition } from "@uirouter/angular";
import { RouterModule } from  './router.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from'@angular/common';
import {  SocialLoginModule,AuthServiceConfig } from  'angular5-social-login';
import { authConfig } from '../config/social.config';
import { AuthInterceptor } from './auth-interceptor';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    SigninComponent, 
    SignupComponent,
    FooterComponent,
    SourceHeadlineComponent 
  ],
  imports: [
    RouterModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    SocialLoginModule,
    BrowserAnimationsModule,
      HttpClientModule
  ],
  providers: [
     ApiService, 
     Location,
     {
       provide: AuthServiceConfig,
       useFactory: authConfig
     }
    //  {
    //    provide: HTTP_INTERCEPTORS,
    //    useClass: AuthInterceptor,
    //    multi: true
    //  }
  ],
  bootstrap: [UIView]
})
export class AppModule { }
