import { Injectable } from '@angular/core';
import { ApiGamesService } from './endpoints/games/api-games.service';
import { ApiAddGameService } from './endpoints/add-game/api-add-game.service';

@Injectable ()
export class ApiService {
  constructor (
    public games : ApiGamesService,
    public addGame: ApiAddGameService,
  ) {
  }
}


export const ApiServices = [ApiGamesService, ApiAddGameService];

