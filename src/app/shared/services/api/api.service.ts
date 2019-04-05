import { Injectable } from '@angular/core';
import { ApiGamesService } from './endpoints/games/api-games.service';
import { ApiAddGameService } from './endpoints/add-game/api-add-game.service';
import { ApiGameRemoveService } from './endpoints/game-remove/api-game-remove.service';
import { ApiFormLayoutsService } from './endpoints/forms/api-form-layouts.service';

@Injectable ()
export class ApiService {
  constructor (
    public games : ApiGamesService,
    public addGame: ApiAddGameService,
    public gameRemove: ApiGameRemoveService,
    public forms: ApiFormLayoutsService,
  ) {
  }
}


export const ApiServices = [
  ApiGamesService,
  ApiAddGameService,
  ApiGameRemoveService,
  ApiFormLayoutsService,
];

