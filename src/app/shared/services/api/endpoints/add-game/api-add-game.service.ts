import { Injectable } from '@angular/core';

import { ApiEndpoint } from '../../api-endpoint';

@Injectable ()
export class ApiAddGameService extends ApiEndpoint {
  public config = {
    route : '/add-game',
    headers : {
      post : 'none',
    },
  };
}
