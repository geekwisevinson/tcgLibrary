import { Injectable } from '@angular/core';

import { ApiEndpoint } from '../../api-endpoint';

@Injectable ()
export class ApiGameRemoveService extends ApiEndpoint {
  public config = {
    route : '/game-remove',
    headers : {
      post : 'none',
    },
  };
}
