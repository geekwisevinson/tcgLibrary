export interface UiState {
  title: string;
  titleIcon: string;
  titleInstructions: string;
  titlePicture: string;
  windowWidth: number;
  isSideNavOpen: boolean;
  hamburgerOverRide: boolean;
  mediaQueryState: string;
}

const defaultState: UiState = {
  title : '',
  titleIcon : 'home',
  titleInstructions : '',
  titlePicture : '',
  windowWidth : 0,
  isSideNavOpen : true,
  hamburgerOverRide : true,
  mediaQueryState : '',
};

const storeId = '[ui] update';
export const UI_UPDATE_TITLE = '[ui] update title';
export const UI_UPDATE_TITLE_SET = '[ui] update title set';
export const UI_UPDATE_TITLE_INSTRUCTIONS = '[ui] update title instructions';
export const UI_UPDATE_TITLE_PICTURE = '[ui] update title picture';
export const UI_UPDATE_WINDOW_WIDTH = '[ui] update windowWidth';
export const UI_UPDATE_IS_SIDE_NAV_OPEN = '[ui] update isSideNavOpen';
export const UI_UPDATE_HAMBURGER_OVER_RIDE = '[ui] update hamburgerOverRide';
export const UI_UPDATE_MEDIA_QUERY_STATE = '[ui] update mediaQueryState';
export const UI_UPDATE_TITLE_ICON = '[ui] update titleIcon';
const types = {
  UI_UPDATE_TITLE,
  UI_UPDATE_TITLE_SET,
  UI_UPDATE_TITLE_INSTRUCTIONS,
  UI_UPDATE_TITLE_PICTURE,
  UI_UPDATE_WINDOW_WIDTH,
  UI_UPDATE_IS_SIDE_NAV_OPEN,
  UI_UPDATE_HAMBURGER_OVER_RIDE,
  UI_UPDATE_MEDIA_QUERY_STATE,
  UI_UPDATE_TITLE_ICON,
};
export const uiActions = {
  updateUiTitle : ( payload : string ) => {
    return { type : UI_UPDATE_TITLE, payload };
  },
  updateUiTitleSet : ( payload : { titleIcon : string; titleInstructions : string; titlePicture : string } ) => {
    return { type : UI_UPDATE_TITLE_SET, payload };
  },
  updateUiTitleInstructions : ( payload : { titleInstructions : string; } ) => {
    return { type : UI_UPDATE_TITLE_INSTRUCTIONS, payload };
  },
  updateUiTitlePicture : ( payload : { titlePicture : string; } ) => {
    return { type : UI_UPDATE_TITLE_PICTURE, payload };
  },
  updateUiTitleIcon : ( payload : { titleIcon : string; } ) => {
    return { type : UI_UPDATE_TITLE_ICON, payload };
  },
  updateUiWindowWidth : ( payload : { windowWidth : number; hamburgerOverRide? : boolean } ) => {
    return { type : UI_UPDATE_WINDOW_WIDTH, payload };
  },
  updateUiIsSideNavOpen : ( payload : { isSideNavOpen : boolean; } ) => {
    return { type : UI_UPDATE_IS_SIDE_NAV_OPEN, payload };
  },
  updateHamburgerOverRide : ( payload : { hamburgerOverRide : boolean; } ) => {
    return { type : UI_UPDATE_HAMBURGER_OVER_RIDE, payload };
  },
  updateMediaQueryState : ( payload : { mediaQueryState : string; } ) => {
    return { type : UI_UPDATE_MEDIA_QUERY_STATE, payload };
  },
  types,
};

export function UiReducer ( state : UiState = defaultState, action : any ) {
  const ngrxRelated = (action.type.indexOf('@ngrx') !== -1);
  const differentState = (action.type.indexOf(storeId) === -1);
  if (differentState && !ngrxRelated) {return state; }
  switch ( action.type ) {
    case UI_UPDATE_TITLE:
      return { ...state, ...{ title : action.payload }, ...{ type : action.type } };
    case UI_UPDATE_TITLE_INSTRUCTIONS:
      return { ...state, ...{ titleInstructions : action.payload.titleInstructions }, ...{ type : action.type } };
    case UI_UPDATE_TITLE_ICON:
      return { ...state, ...{ titleIcon : action.payload.titleIcon }, ...{ type : action.type } };
    case UI_UPDATE_TITLE_PICTURE:
      return { ...state, ...{ titlePicture : action.payload.titlePicture }, ...{ type : action.type } };
    case UI_UPDATE_WINDOW_WIDTH:
      return { ...state, ...{ windowWidth : action.payload.windowWidth }, ...{ type : action.type } };
    case UI_UPDATE_IS_SIDE_NAV_OPEN:
      return { ...state, ...{ isSideNavOpen : action.payload.isSideNavOpen }, ...{ type : action.type } };
    case UI_UPDATE_HAMBURGER_OVER_RIDE:
      return { ...state, ...{ hamburgerOverRide : action.payload.hamburgerOverRide }, ...{ type : action.type } };
    case UI_UPDATE_MEDIA_QUERY_STATE:
      return { ...state, ...action.payload, ...{ type : action.type } };
    case UI_UPDATE_TITLE_SET:
      return {
        ...state, ...{
          titleIcon : action.payload.titleIcon,
          titleInstructions : action.payload.titleInstructions,
          titlePicture : action.payload.titlePicture,
        }, ...{ type : action.type },
      };
    default:
      return { ...state, type : action.type };
  }
}
