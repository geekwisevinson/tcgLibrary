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
import { formActions, FormReducer, FormsState } from './forms/form-state';

export interface State {
  ui : UiState;
  games: GamesState;
  forms: FormsState;
}

export const reducers : ActionReducerMap<State> = {
  ui : UiReducer,
  games : GameReducer,
  forms : FormReducer,
};

export const stateActions = {
  gameActions,
  formActions,
};


export const metaReducers : MetaReducer<State>[] = !environment.production ? [] : [];
