import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule , Http } from '@angular/http';
import { FormsModule } from '@angular/forms';

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
import { Location } from'@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    SigninComponent, 
    SignupComponent,
    FooterComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
     ApiService,
     Location
  ],
  bootstrap: [UIView]
})
export class AppModule { }
