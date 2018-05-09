import { UIRouter } from "@uirouter/angular";
import { Injector, Injectable } from "@angular/core";

/** UIRouter Config  */
export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
  router.urlService.rules.otherwise({ state: 'signup' });
}
