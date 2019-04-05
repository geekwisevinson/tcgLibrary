import { Injectable } from '@angular/core';

import { ApiEndpoint } from '../../api-endpoint';

@Injectable ()
export class ApiFormLayoutsService extends ApiEndpoint {
  public config = {
    route : '/form-layouts',
    headers : {
      post : 'get',
    },
  };
}
