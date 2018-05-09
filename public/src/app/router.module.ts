import { NgModule } from '@angular/core';
import { UIRouterModule } from "@uirouter/angular"
import { APP_STATES } from "./app.states";
import { uiRouterConfigFn } from "../config/router.config";


@NgModule({
  imports: [ UIRouterModule.forRoot({ states: APP_STATES, useHash: false, config: uiRouterConfigFn }) ],
  exports: [ UIRouterModule ],
  declarations: []
})

export class RouterModule { }