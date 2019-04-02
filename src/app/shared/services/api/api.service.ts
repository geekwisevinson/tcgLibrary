import { Injectable } from '@angular/core';
import { ApiGamesService } from './endpoints/games/api-games.service';
import { ApiAddGameService } from './endpoints/add-game/api-add-game.service';
import { ApiGameRemoveService } from './endpoints/game-remove/api-game-remove.service';

@Injectable ()
export class ApiService {
  constructor (
    public games : ApiGamesService,
    public addGame: ApiAddGameService,
    public gameRemove: ApiGameRemoveService,
  ) {
  }
}


export const ApiServices = [ApiGamesService, ApiAddGameService, ApiGameRemoveService];

