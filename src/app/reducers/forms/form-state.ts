export interface FormsState {
  list : any[];
  selected : string;
}

const defaultState : FormsState = {
  list : [],
  selected : null,
};

const storeId = '[form] update';
export const FORM_UPDATE_LIST = `${storeId} list`;
export const FORM_UPDATE_SELECTED = `${storeId} selected`;

const types = {
  FORM_UPDATE_LIST,
  FORM_UPDATE_SELECTED
};

export const formActions = {
  updateList : ( payload : any[] ) => {
    return { type : types.FORM_UPDATE_LIST, payload };
  },
  updateSelected : ( payload : string ) => {
    return { type : types.FORM_UPDATE_SELECTED, payload };
  },
};

export function FormReducer ( state : FormsState = defaultState, action : any ) {
  const ngrxRelated = (action.type.indexOf('@ngrx') !== -1);
  const differentState = (action.type.indexOf(storeId) === -1);
  if (differentState && !ngrxRelated) {return state; }
  switch ( action.type ) {
    case types.FORM_UPDATE_LIST:
      return {
        ...state, ...{
          list : action.payload,
        }, ...{ type : action.type },
      };
    case types.FORM_UPDATE_SELECTED:
      return {
        ...state, ...{
          selected : action.payload,
        }, ...{ type : action.type },
      };
    default:
      return { ...state, type : action.type };
  }
}
