import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, stateActions } from '../../reducers';
import { UiState } from '../../reducers/ui/ui-state';
import { GameState } from '../../reducers/games/game-state';
import { ApiService } from '../services/api/api.service';
import { Subscription } from 'rxjs';

@Component ( {
  selector : 'vf-smart',
  templateUrl : './smart.component.html',
  styleUrls : [ './smart.component.css' ]
} )
export class SmartComponent implements OnInit, OnDestroy {
  public ui : UiState;
  public game: GameState;
  private states = ['ui', 'game'];
  private subscriptions: Subscription[] = [];

  constructor (
    public store : Store<State>,
  ) {
  }

  ngOnInit () {
    this.onInit();
    this.initializeState ();
  }

  ngOnDestroy () : void {
    this.subscriptions.forEach( sub => {
      sub.unsubscribe();
    });
  }
  public onInit() {
    // over ride this if you want to add to extended;
  }

  private initializeState () {
    this.states.forEach( state => {
      console.log ( 'you subscribed to', state );
      const stateSub = this.store.select ( state ).subscribe ( stateValue => {
        this[state] = stateValue;
        console.log ( 'state for ', state, stateValue );
      });
      this.subscriptions.push(stateSub);
    });
  }

}
