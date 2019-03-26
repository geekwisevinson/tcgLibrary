import { Component } from '@angular/core';
import { SmartComponent } from '../smart/smart.component';
import { Store } from '@ngrx/store';
import { ApiService } from '../services/api/api.service';
import { State } from '../../reducers';
import { GamesService } from '../services/services/games/games.service';

@Component ( {
  selector : 'vf-game-list',
  templateUrl : './game-list.component.html',
  styleUrls : [ './game-list.component.css' ]
} )
export class GameListComponent extends SmartComponent {

  constructor (
    public store : Store<State>,
    public api : ApiService,
    public games: GamesService,
  ) {
    super ( store, api );
  }

  onInit () {
    console.log('games service', this.games);
    this.games.getGames().subscribe ( games => {
      console.log ( 'sub api games', games );
    });
  }

}
