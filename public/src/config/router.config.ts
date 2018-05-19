import { UIRouter, Transition } from "@uirouter/angular";
import { Injector, Injectable } from "@angular/core";
import { ApiService } from '../app/api.service';

/** UIRouter Config  */
export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
  // let authentication= { to: (state) => !!state.data.authorization };
  // let noAuthentication = {to: (state)=> !state.data.authorization };
  
  // router.transitionService.onStart(authentication,transition=>{
  //   let stateService = transition.router.stateService;
  //   let apiService: ApiService = transition.injector().get(ApiService);
  //   if (apiService.isLoggedOut()) {
  //     // transition.abort();
  //     return stateService.target('signup');
  //   }
  // });

  // router.transitionService.onEnter(noAuthentication,transition=>{
  //   let stateService = transition.router.stateService;
  //   let apiService: ApiService = transition.injector().get(ApiService);
  //   if (apiService.isLoggedIn()) {
  //     stateService.transitionTo('products');
  //   }
  // //});
  // router.transitionService.onBefore({to: 'products'},(transition : Transition)=>
  // {
  //   let auth: ApiService = transition.injector().get(ApiService);
  //   if (auth.isLoggedIn) {
  //     return transition.router.stateService.target('products');
  //   }
  //   else {
  //     return transition.router.stateService.target('signup');
  //   }
  //  });
  router.urlService.rules.otherwise({ state: "signup" });
}
