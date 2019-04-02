import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { GamesService } from '../services/services/games/games.service';
import { Game } from '../../models/game';
import { gameActions } from '../../reducers/games/game-state';
import { SmartComponent } from '../smart/smart.component';

@Component ( {
  selector : 'vf-card-form',
  templateUrl : './card-form.component.html',
  styleUrls : [ './card-form.component.css' ]
} )
export class CardFormComponent extends SmartComponent implements OnInit {
  public Object = Object;
  public error;

  public questions : any = [
    { type : 'text', label : 'Title', prop : 'title', placeholder : 'Enter the card title', defaultValue : 'Halo' },
    { type : 'text', label : 'Developer', prop : 'developer', placeholder : 'Enter the card title', defaultValue : 'Microsoft' },
    { type : 'text', label : 'Details', prop : 'details', placeholder : 'Enter the details', defaultValue : 'First Person Shooter Game' },
    { type : 'checkbox', label : 'Own', prop : 'own', placeholder : 'Do you own this', defaultValue : true },
    { type : 'text', label : 'O.S.', prop : 'os', placeholder : 'Enter the os', defaultValue : 'XBox' },
    { type : 'form-array-text', label : 'Comments', prop : 'comments', dynamic : true, defaultValue : [ 'First Person', 'Shooter' ] },
    { type : 'form-array-object', label : 'Meta', prop : 'meta', dynamic : true, defaultValue : { votes : 2 } },
  ];
  public form : FormGroup;

  constructor (
    public store : Store<State>,
    private fb : FormBuilder,
    private games : GamesService,
  ) {
    super ( store );

  }

  ngOnInit () {
    this.form = this.fb.group ( this.createFormGroup ( this.questions ) );
  }

  public addComment ( control ) {
    console.log ( 'control', control );
    control.push (
      this.fb.control ( '' ) );
  }

  public addMeta ( control, propName ) {
    if ( !this.form.get ( propName ).value ) {
      return;
    }
    const newControl = new FormControl ( '' );
    control.addControl ( this.form.get ( propName ).value, newControl );
    this.form.get ( propName ).setValue ( '' );
    this.form.get ( propName ).updateValueAndValidity ();
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
    return;
    const game = new Game ( this.form.value );
    console.log ( 'game', game );
    this.games.submitGame ( game ).subscribe (
      ( saved ) => {
        console.log ( 'game saved', saved );
        this.games.getGames ().subscribe ( ( games : any ) => {
          this.store.dispatch ( gameActions.updateList ( games ) );
        } );
      },
      ( err ) => {
        this.error = err;
      }
    );
  }

  public createFormGroup ( questions ) {
    console.log ( questions );
    const group = {};
    questions.forEach ( q => {
      if ( q.type === 'text' ) {
        group[ q.prop ] = q.defaultValue ? q.defaultValue : '';
      }
      if ( q.type === 'checkbox' ) {
        group[ q.prop ] = q.defaultValue ? q.defaultValue : false;
      }
      if ( q.type === 'form-array-text' ) {
        group[ q.prop ] = this.fb.array ( q.defaultValue ? q.defaultValue : [] );
      }
      if ( q.type === 'form-array-object' ) {
        group[ q.prop ] = this.fb.group ( q.defaultValue ? q.defaultValue : {} );
        group[ `${ q.prop }PropName` ] = '';
        q.propName = `${ q.prop }PropName`;
      }
    } );
    console.log ( 'group', group );
    return group;
  }

  public removeS ( text ) {
    return text[ text.length - 1 ].toLowerCase () === 's' ? text.substring(0, text.length - 1) : text;
  }
}
