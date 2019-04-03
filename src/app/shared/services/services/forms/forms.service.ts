import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(
    private fb : FormBuilder,
  ) { }
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
    return this.fb.group(group);
  }
}
