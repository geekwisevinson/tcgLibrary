export interface GameState {
  list : any[];
  selected : string;
}

const defaultState : GameState = {
  list : [],
  selected : null,
};

const storeId = '[game] update';
export const GAME_UPDATE_LIST = `${storeId} list`;
export const GAME_UPDATE_SELECTED = `${storeId} selected`;

const types = {
  GAME_UPDATE_LIST,
  GAME_UPDATE_SELECTED
};

export const gameActions = {
  updateList : ( payload : any[] ) => {
    return { type : types.GAME_UPDATE_LIST, payload };
  },
  updateSelected : ( payload : string ) => {
    return { type : types.GAME_UPDATE_SELECTED, payload };
  },
};

export function GameReducer ( state : GameState = defaultState, action : any ) {
  const ngrxRelated = (action.type.indexOf('@ngrx') !== -1);
  const differentState = (action.type.indexOf(storeId) === -1);
  if (differentState && !ngrxRelated) {return state; }
  switch ( action.type ) {
    case types.GAME_UPDATE_LIST:
      return {
        ...state, ...{
          list : action.payload,
        }, ...{ type : action.type },
      };
    case types.GAME_UPDATE_SELECTED:
      return {
        ...state, ...{
          selected : action.payload,
        }, ...{ type : action.type },
      };
    default:
      return { ...state, type : action.type };
  }
}
