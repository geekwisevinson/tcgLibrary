import { Component } from '@angular/core';
import { SmartComponent } from '../smart/smart.component';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { GamesService } from '../services/services/games/games.service';

@Component ( {
  selector : 'vf-game-list',
  templateUrl : './game-list.component.html',
  styleUrls : [ './game-list.component.css' ]
} )
export class GameListComponent extends SmartComponent {
  public gameList = [];

  constructor (
    public store : Store<State>,
    public games : GamesService,
  ) {
    super ( store );
  }

  onInit () {
    console.log('call games');
    this.games.getGames ().subscribe ( (games: any[]) => {
      console.log ( 'sub api games', games );
      this.gameList = games;
    });
  }

}
