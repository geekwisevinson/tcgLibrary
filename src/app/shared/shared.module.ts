import { CommonModule } from '@angular/common';
import { SmartComponent } from './smart/smart.component';
import { ApiModule } from './services/api/api.module';
import { GameListComponent } from './game-list/game-list.component';
import { GameFormComponent } from './game-form/game-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ErrorDisplayComponent } from './error-display/error-display.component';
import { RouterModule } from '@angular/router';
import { CardFormComponent } from './card-form/card-form.component';
import { FormLayoutsComponent } from '../landing/form-layouts/form-layouts.component';
import { FormLayoutsListComponent } from './form-layouts-list/form-layouts-list.component';


@NgModule ( {
  imports : [
    CommonModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations : [
    SmartComponent,
    GameListComponent,
    GameFormComponent,
    ErrorDisplayComponent,
    CardFormComponent,
    FormLayoutsListComponent,

  ],
  exports : [
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    SmartComponent,
    GameListComponent,
    GameFormComponent,
    RouterModule,
    CardFormComponent,
    FormLayoutsListComponent,
  ]
} )

export class SharedModule {
}
