import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(public api: ApiService) { }
  public getGames() {
    return this.api.games.get();
  }
  public submitGame(game) {
    return this.api.addGame.post(game);
  }
  public removeGame(game) {
    return this.api.gameRemove.post(game);
  }
}
