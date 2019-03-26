import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ApiService, ApiServices } from './api.service';
import { AuthInterceptor } from './api-interceptor.service';

@NgModule ( {
  imports : [
    CommonModule,
    HttpClientModule,
  ],
  declarations : [
  ],
  providers : [
    ApiServices,
    ApiService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true,
    },
  ],
} )
export class ApiModule {
}
