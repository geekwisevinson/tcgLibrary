import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '../smart/smart.component';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { FormsService } from '../services/services/forms/forms.service';
import { formActions } from '../../reducers/forms/form-state';

@Component({
  selector: 'vf-form-layouts-list',
  templateUrl: './form-layouts-list.component.html',
  styleUrls: ['./form-layouts-list.component.css']
})
export class FormLayoutsListComponent extends SmartComponent {
  public formList = [];

  constructor (
    public store : Store<State>,
    public forms : FormsService,
  ) {
    super ( store );
  }

  onInit () {
    this.store.select ( 'forms' ).subscribe ( forms => {
      console.log ( 'list', forms );
      if ( forms ) {
        this.formList = forms.list;
      }
    } );
    this.getForms ();
  }

  public formRemove ( form ) {
    console.log ( form );
    this.forms.removeForm ( form ).subscribe ( () => {
      this.getForms ();
    } );
  }

  private getForms () {
    this.forms.getForms ().subscribe ( ( forms : any[] ) => {
      console.log ( 'sub api forms', forms );
      this.store.dispatch ( formActions.updateList ( forms ) );
    } );
  }

}
