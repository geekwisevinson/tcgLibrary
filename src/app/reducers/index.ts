// import {
//   ActionReducer,
//   ActionReducerMap,
//   createFeatureSelector,
//   createSelector,
//   MetaReducer
// } from '@ngrx/store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { UiReducer, UiState } from './ui/ui-state';
import { gameActions, GameReducer, GamesState } from './games/game-state';

export interface State {
  ui : UiState;
  games: GamesState;
}

export const reducers : ActionReducerMap<State> = {
  ui : UiReducer,
  games : GameReducer,
};

export const stateActions = {
  gameActions,
};


export const metaReducers : MetaReducer<State>[] = !environment.production ? [] : [];
