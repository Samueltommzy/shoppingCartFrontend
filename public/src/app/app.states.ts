"use strict";

import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component'
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { SourceHeadlineComponent } from './source-headline/source-headline.component';
import { SigninComponent } from './signin/signin.component';

import { UIRouterModule } from '@uirouter/angular';
import { ApiService } from './api.service';
import { StateService, Transition } from "@uirouter/angular";
import { AppComponent } from './app.component';

export function productService (api: ApiService): any {
    return api.getAllProducts().then(data => {
        console.log("got products" , data.data);
        if (!data) return false; 

        return data.data.slice(1,30);
    });
}

export const AppRoute = {
    name: 'app',
    redirectTo: 'signup',
    component: AppComponent
}

export const signupRoute = {
    parent: 'app',
    name : "signup",
    url: '/user/signup',
    component: SignupComponent,
}

export const signinRoute = {
    parent:'app',
    name : "signin",
    url: '/user/signin',
    component:SigninComponent
}

export const productRoute = {
    name: 'products',
    url: '/products',
    component: ProfileComponent,
    resolve :[
        {
            token: 'products',
            deps:[ApiService],
            resolveFn : productService
        }
    ]
}

export const APP_STATES = [AppRoute,signinRoute,signupRoute,productRoute];