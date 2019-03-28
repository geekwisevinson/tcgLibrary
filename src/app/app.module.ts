import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { SharedModule } from './shared/shared.module';

@NgModule ( {
  declarations : [
    AppComponent
  ],
  imports : [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot ( reducers, { metaReducers } ),
  ],
  providers : [],
  bootstrap : [ AppComponent ]
} )
export class AppModule {
}
