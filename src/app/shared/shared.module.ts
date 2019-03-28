import { CommonModule } from '@angular/common';
import { SmartComponent } from './smart/smart.component';
import { ApiModule } from './services/api/api.module';
import { GameListComponent } from './game-list/game-list.component';
import { GameFormComponent } from './game-form/game-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


@NgModule ( {
  imports : [
    CommonModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations : [
    SmartComponent,
    GameListComponent,
    GameFormComponent,
  ],
  exports : [
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    SmartComponent,
    GameListComponent,
    GameFormComponent
  ]
} )

export class SharedModule {
}
