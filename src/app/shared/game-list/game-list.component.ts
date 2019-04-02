import { Component } from '@angular/core';
import { SmartComponent } from '../smart/smart.component';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { GamesService } from '../services/services/games/games.service';
import { gameActions } from '../../reducers/games/game-state';

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
    this.store.select ( 'games' ).subscribe ( games => {
      console.log ( 'list', games );
      if ( games ) {
        this.gameList = games.list;
      }
    } );
    this.getGames ();
  }

  public gameRemove ( game ) {
    console.log ( game );
    this.games.removeGame ( game ).subscribe ( () => {
      this.getGames ();
    } );
  }

  private getGames () {
    this.games.getGames ().subscribe ( ( games : any[] ) => {
      console.log ( 'sub api games', games );
      this.store.dispatch ( gameActions.updateList ( games ) );
    } );
  }

}
