import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule, routesLandingModule } from './landing-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule ( {
  imports : [
    CommonModule,
    SharedModule,
    LandingRoutingModule,
  ],
  declarations : [ routesLandingModule ]
} )
export class LandingModule {
}
