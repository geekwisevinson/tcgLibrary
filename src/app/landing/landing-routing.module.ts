import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';

const routes: Routes = [
  {component: HomeComponent, path: ''},
  {component: GameComponent, path: 'game'},
  {component: FormLayoutsComponent, path: 'form-layouts'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }


export const routesLandingModule = [HomeComponent, GameComponent, FormLayoutsComponent];
