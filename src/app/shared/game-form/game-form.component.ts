import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GamesService } from '../services/services/games/games.service';
import { Game } from '../../models/game';
import { gameActions } from '../../reducers/games/game-state';
import { SmartComponent } from '../smart/smart.component';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';

@Component ( {
  selector : 'vf-game-form',
  templateUrl : './game-form.component.html',
  styleUrls : [ './game-form.component.css' ]
} )
export class GameFormComponent extends SmartComponent implements OnInit {
  public Object = Object;
  public error;

  public defaultForm = {
    title : 'Halo',
    developer : 'Microsoft',
    details : 'First Person Shooter Game',
    comments : this.fb.array ( [ 'First Person', 'Shooter' ] ),
    own : false,
    os : 'XBox',
    meta : this.fb.group ( {
      votes : 1
    } ),
    metaName : '',
  };
  public form : FormGroup;

  constructor (
    public store: Store<State>,
    private fb : FormBuilder,
    private games : GamesService,
  ) {
    super ( store );
    this.form = this.fb.group ( this.defaultForm );
  }

  ngOnInit () {
  }

  public addComment ( control ) {
    console.log ( 'control', control );
    control.push (
      this.fb.control ( '' ) );
  }

  public addMeta ( control ) {
    if ( !this.form.get ( 'metaName' ).value ) {
      return;
    }
    const newControl = new FormControl ( '' );
    control.addControl ( this.form.get ( 'metaName' ).value, newControl );
    this.form.get ( 'metaName' ).setValue ( '' );
    this.form.get ( 'metaName' ).updateValueAndValidity ();
  }

  public testNan ( control ) {
    const isNanValue = isNaN ( control.value );
    if ( !isNanValue && control.value ) {
      control.setValue ( Number ( control.value ) );
    }
    if ( !control.value && control.value !== 0 ) {
      return 'text';
    }
    return isNaN ( control.value ) ? 'text' : 'number';
  }

  public submitGame () {
    const game = new Game ( this.form.value );
    console.log ( 'game', game );
    this.games.submitGame ( game ).subscribe (
      ( saved ) => {
        console.log ( 'game saved', saved );
        this.games.getGames().subscribe((games: any) => {
          this.store.dispatch(gameActions.updateList(games));
        });
      },
      ( err ) => {
        this.error = err;
      }
    );
  }
}
