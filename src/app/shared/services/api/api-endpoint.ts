import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { environment } from '../../../../environments/environment';

type headerProp =
  'getValidateHeaders'
  | 'getTokenHeaders'
  | 'getTokenHeadersWithFingerprint'
  | 'basic'
  | 'basicWithFingerprint'
  | 'passThrough'
  | 'none';

interface EndpointConfig {
  route : string;
  headers : {
    get? : string;
    post? : string;
    put? : string;
    delete? : string;
  };
}

@Injectable ()
export class ApiEndpoint {
  public url : string = environment.apiRoute;
  public config : EndpointConfig;
  public getAction : string;
  public postAction : string;
  public putAction : string;
  public deleteAction : string;
  public getError;
  public postError;
  public putError;
  public deleteError;
  private canLog = true;
  private session : any = {
    fingerprint : ''
  };

  constructor (
    public http : HttpClient,
    public store : Store<any>,
  ) {
  }

  public initialize ( config : EndpointConfig ) : void {
    this.config = config;
  }

  public post ( payload : any, paramRoute? : string, paramHeader? : headerProp ) : Observable<Object> {
    const headers = this.prepareHeader ( paramHeader || this.config.headers.post );
    const route = paramRoute || this.config.route;

    const apiRequest = {
      route : this.config.route,
      payload,
      type : 'post',
      headers : headers,
      response : null,
      status : null,
    };
    const subscription = this.http.post ( `${ this.url }${ route }`, payload, headers ).pipe ( shareReplay () );

    subscription.subscribe (
      ( response : HttpRequest<any> ) => {
        apiRequest.response = response;
        apiRequest.status = response;
        if ( this.postAction ) {
          this.store.dispatch ( { type : this.postAction, payload : response } );
        }
      },
      error => {
        console.log ( 'i got an error from api', error );
        try {
          apiRequest.response = error.json ();
        } catch ( e ) {
          apiRequest.response = null;
        }
        apiRequest.status = error.status;
        if ( this.postError ) {
          this.store.dispatch ( { type : this.postError, payload : error } );
        }
      },
    );
    return subscription;
  }

  public put ( payload : any, paramRoute? : string, paramHeader? : headerProp ) : Observable<Object> {
    const headers = this.prepareHeader ( paramHeader || this.config.headers.put );
    const route = paramRoute || this.config.route;

    const apiRequest = {
      route : this.config.route,
      payload,
      type : 'put',
      headers : headers,
      response : null,
      status : null,
    };
    const subscription = this.http.put ( `${ this.url }${ route }`, payload, headers ).pipe ( shareReplay () );

    subscription.subscribe (
      ( response : HttpRequest<any> ) => {
        apiRequest.response = response;
        apiRequest.status = response;
        if ( this.putAction ) {
          this.store.dispatch ( { type : this.putAction, payload : response } );
        }
      },
      error => {
        try {
          apiRequest.response = error.json ();
        } catch ( e ) {
          apiRequest.response = null;
        }
        apiRequest.status = error.status;
        if ( this.putError ) {
          this.store.dispatch ( { type : this.putError, payload : error } );
        }
      },
    );
    return subscription;
  }

  public delete ( paramRoute? : string, paramHeader? : headerProp ) : Observable<Object> {
    const headers = this.prepareHeader ( paramHeader || this.config.headers.delete );
    const route = paramRoute || this.config.route;

    const apiRequest = {
      route : this.config.route,
      type : 'delete',
      headers : headers,
      response : null,
      status : null,
    };
    const subscription = this.http.delete ( `${ this.url }${ route }`, headers ).pipe ( shareReplay () );

    subscription.subscribe (
      ( response : HttpRequest<any> ) => {
        apiRequest.response = response;
        apiRequest.status = response;
        if ( this.deleteAction ) {
          this.store.dispatch ( { type : this.deleteAction, payload : response } );
        }
      },
      error => {
        try {
          apiRequest.response = error.json ();
        } catch ( e ) {
          apiRequest.response = null;
        }
        apiRequest.status = error.status;
        if ( this.deleteError ) {
          this.store.dispatch ( { type : this.deleteError, payload : error } );
        }
      },
    );
    return subscription;
  }

  public get ( paramRoute? : string, paramHeader? : headerProp ) : Observable<Object> {
    const headers = this.prepareHeader ( paramHeader || this.config.headers.get, false );
    const route = paramRoute || this.config.route;

    const apiRequest = {
      route,
      payload : {},
      type : 'get',
      headers : headers,
      response : null,
      status : null,
    };
    const finalRoute = `${ this.url }${ route }`;
    const subscription = this.http.get ( finalRoute, headers ).pipe ( shareReplay () );

    subscription.subscribe (
      ( response : HttpRequest<any> ) => {
        try {
          apiRequest.response = response;
        } catch ( e ) {
          apiRequest.response = null;
        }
        apiRequest.status = response;
        if ( this.getAction ) {
          this.store.dispatch ( { type : this.getAction, payload : response } );
        }
      },
      ( error : HttpErrorResponse ) => {
        try {
          apiRequest.response = error;
        } catch ( e ) {
          apiRequest.response = null;
        }
        apiRequest.status = error.status;
        if ( this.getError ) {
          this.store.dispatch ( { type : this.getError, payload : error } );
        }
      },
    );
    return subscription;
  }

  private prepareHeader ( headerType : headerProp | string, withCredentials? : boolean )
    : { headers : HttpHeaders; withCredentials : boolean } {
    let headers = new HttpHeaders ();

    if ( headerType === 'getTokenHeaders' ) {
      headers = headers.set ( 'Content-Type', 'application/x-www-form-urlencoded' );
      headers = headers.set ( 'Accept', 'application/json' );
    }

    if ( headerType === 'getTokenHeadersWithFingerprint' ) {
      headers = headers.set ( 'Content-Type', 'application/x-www-form-urlencoded' );
      headers = headers.set ( 'X-Auth-Fingerprint', this.session.fingerprint );
      headers = headers.set ( 'Accept', 'application/json' );
    }

    if ( headerType === 'getValidateHeaders' ) {
      headers = headers.set ( 'X-Auth-Fingerprint', this.session.fingerprint );
    }

    if ( headerType === 'basic' ) {
      headers = headers.set ( 'Content-Type', 'application/json; charset=utf-8' );
      headers = headers.set ( 'Accept', '*/*' );
    }

    if ( headerType === 'basicWithFingerprint' ) {
      headers = headers.set ( 'X-Auth-Fingerprint', this.session.fingerprint );
      headers = headers.set ( 'Content-Type', 'application/json; charset=utf-8' );
      headers = headers.set ( 'Accept', '*/*' );
    }

    if ( headerType === 'passThrough' ) {
      headers = headers.set ( 'Content-Type', 'application/json; charset=utf-8' );
      headers = headers.set ( 'X-Auth-Fingerprint', this.session.fingerprint );
      headers = headers.set ( 'Accept', 'application/json' );
    }

    if ( headerType === 'none' ) {
      headers = headers.set ( 'Content-Type', 'application/json; charset=utf-8' );
      headers = headers.set ( 'Accept', '*/*' );
    }

    return {
      headers,
      withCredentials,
    };
  }

  public subscribe(subscription) {

  }
}
