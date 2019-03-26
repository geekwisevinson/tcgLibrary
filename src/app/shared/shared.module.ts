import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartComponent } from './smart/smart.component';
import { ApiModule } from './services/api/api.module';
import { GameListComponent } from './game-list/game-list.component';

const declarations = [
  SmartComponent,
  GameListComponent,
];

@NgModule ( {
  imports : [
    CommonModule,
    ApiModule,
  ],
  declarations,
  exports : declarations
} )
export class SharedModule {
}
