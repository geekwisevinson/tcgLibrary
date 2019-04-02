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
  ]
} )

export class SharedModule {
}
