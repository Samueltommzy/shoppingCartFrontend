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
        if (!data) return false; 

        return data.data;
    });
}

export function signupService(api: ApiService, trans: Transition): any {
    return api.signup(trans.params().user).then(data=>{
        if (!data) return false;

        return data;
    })
}

export function signinService(api: ApiService, trans: Transition): any {
    let user = trans.params().user;
    return api.login(user).then(data=>{
        
        if (!data) return false;

        return data;
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
    resolve: [
        {
            token: 'signup',
            deps:[ ApiService, Transition ],
            resolveFn: signupService
        }
    ]
}

export const signinRoute = {
    parent:'app',
    name : "signin",
    url: '/user/signin',
    component:SigninComponent,
    resolve:[
        {
            token : 'signin',
            deps: [ApiService, Transition],
            resolveFn:signinService
        }
    ]
}

export const productRoute = {
    name : 'products',
    url: ' /product',
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