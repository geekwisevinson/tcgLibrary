import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '../../shared/smart/smart.component';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GamesService } from '../../shared/services/services/games/games.service';

@Component ( {
  selector : 'vf-game',
  templateUrl : './game.component.html',
  styleUrls : [ './game.component.css' ]
} )
export class GameComponent extends SmartComponent implements OnInit {
  public gameName = '';

  constructor (
    private route : ActivatedRoute,
    private router : Router,
    public store : Store<State>,
    private games : GamesService,
  ) {
    super ( store );
  }

  ngOnInit () {
    // if using query param
    this.route.queryParamMap.subscribe ( ( params : ParamMap ) => {
      console.log ( 'params.get(\'id\')', params.get ( 'game' ) );
      this.gameName = params.get ( 'game' );
    } );

    //  if using params
    this.route.paramMap.subscribe ( ( params : ParamMap ) => {
      console.log ( 'params.get(\'id\')', params.get ( 'game' ) );
    } );
  }

}
