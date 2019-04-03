import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '../../shared/smart/smart.component';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GamesService } from '../../shared/services/services/games/games.service';
import { FormsService } from '../../shared/services/services/forms/forms.service';

@Component ( {
  selector : 'vf-game',
  templateUrl : './game.component.html',
  styleUrls : [ './game.component.css' ]
} )
export class GameComponent extends SmartComponent implements OnInit {
  public gameName = '';
  public cardForm;

  public carFormQuestions = [
    { type : 'text', label : 'Title', prop : 'title', placeholder : 'Enter the card title', defaultValue : 'Halo' },
    { type : 'text', label : 'Developer', prop : 'developer', placeholder : 'Enter the card title', defaultValue : 'Microsoft' },
    { type : 'text', label : 'Details', prop : 'details', placeholder : 'Enter the details', defaultValue : 'First Person Shooter Game' },
    { type : 'checkbox', label : 'Own', prop : 'own', placeholder : 'Do you own this', defaultValue : true },
    { type : 'text', label : 'O.S.', prop : 'os', placeholder : 'Enter the os', defaultValue : 'XBox' },
    { type : 'form-array-text', label : 'Comments', prop : 'comments', dynamic : true, defaultValue : [ 'First Person', 'Shooter' ] },
    { type : 'form-array-object', label : 'Meta', prop : 'meta', dynamic : true, defaultValue : { votes : 2 } },
  ];
  constructor (
    private route : ActivatedRoute,
    private router : Router,
    public store : Store<State>,
    private games : GamesService,
    public forms: FormsService,
  ) {
    super ( store );
  }

  ngOnInit () {
    this.cardForm = this.forms.createFormGroup(this.carFormQuestions);
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
