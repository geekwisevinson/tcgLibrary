import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule, routesLandingModule } from './landing-routing.module';

@NgModule ( {
  imports : [
    CommonModule,
    LandingRoutingModule
  ],
  declarations : [ routesLandingModule ]
} )
export class LandingModule {
}
