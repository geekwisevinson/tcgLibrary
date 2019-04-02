import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { UiState } from '../../reducers/ui/ui-state';
import { GamesState } from '../../reducers/games/game-state';
import { Subscription } from 'rxjs';

@Component ( {
  selector : 'vf-smart',
  templateUrl : './smart.component.html',
  styleUrls : [ './smart.component.css' ]
} )
export class SmartComponent implements OnInit, OnDestroy {
  public ui : UiState;
  public game : GamesState;
  private states = [ 'ui', 'game' ];
  private subscriptions : Subscription[] = [];

  constructor (
    public store : Store<State>,
  ) {
  }

  ngOnInit () {
    this.onInit ();
    this.initializeState ();
  }

  ngOnDestroy () : void {
    this.subscriptions.forEach ( sub => {
      sub.unsubscribe ();
    } );
  }

  public onInit () {
    // over ride this if you want to add to extended;
  }

  public updateSelected () {
    console.log ( 'selected' );
  }

  private initializeState () {
    this.states.forEach ( state => {
      console.log ( 'you subscribed to', state );
      const stateSub = this.store.select ( state ).subscribe ( stateValue => {
        this[ state ] = stateValue;
        console.log ( 'state for ', state, stateValue );
      } );
      this.subscriptions.push ( stateSub );
    } );
  }

}
