import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';

import { Observable, throwError as observableThrowError, } from 'rxjs';
import { catchError, tap, timeout, } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { environment } from '../../../../environments/environment';


const defaultTimeout = environment.production ? 60000 : 300000;

@Injectable ()
export class AuthInterceptor implements HttpInterceptor {
  constructor (
    private store : Store<any>
  ) {
  }

  intercept ( req : HttpRequest<any>, next : HttpHandler ) : Observable<HttpEvent<any>> {
    const requestToForward : HttpRequest<any> = req;
    return next.handle ( requestToForward ).pipe (
      timeout ( defaultTimeout ),
      tap ( ( evt : any ) => {
        evt.method = requestToForward.method;
        console.log(`API//: ${req.method} :/ ${req.url}` );
      } ),
      catchError ( response => {
        response.url = requestToForward.url;
        response.method = requestToForward.method;
        return observableThrowError ( response );
      } ),
    );
  }
}
