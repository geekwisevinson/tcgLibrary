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
import { gameActions, GameReducer, GameState } from './games/game-state';

export interface State {
  ui : UiState;
  game: GameState;
}

export const reducers : ActionReducerMap<State> = {
  ui : UiReducer,
  game : GameReducer,
};

export const stateActions = {
  gameActions,
};


export const metaReducers : MetaReducer<State>[] = !environment.production ? [] : [];
