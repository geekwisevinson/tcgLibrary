import { Injectable } from '@angular/core';

import { ApiEndpoint } from '../../api-endpoint';

@Injectable ()
export class ApiGamesService extends ApiEndpoint {
  public config = {
    route : '/games',
    headers : {
      get : 'none',
    },
  };
}
