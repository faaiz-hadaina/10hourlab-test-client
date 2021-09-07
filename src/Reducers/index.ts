import * as types from '../Actions/ActionTypes';

const rootReducer = (state = { loading: false }, action: any) => {
  switch (action.type) {
    case types.LOAD_CATEGORY_START:
      return Object.assign({}, state, {
        selectedCategory: action.payload
      });

    case types.LOAD_GENERIC_FILTER_START:
      return Object.assign({}, state, {
        dashboardFilter: action.payload,
        chartFilter: action.payload
      });

    case types.CHANGE_CHART_TYPE:
      return Object.assign({}, state, {
        chartType: action.payload
      });

    case types.LOAD_MAP:
      return Object.assign({}, state, {
        mapData: action.payload
      });

    case types.LOAD_REPORT_FILTER_START:
      return Object.assign({}, state, {
        dashboardFilter: action.payload
      });

    case types.LOAD_CHART_FILTER_START:
      return Object.assign({}, state, {
        chartFilter: action.payload
      });

    case types.TOGGLE_DIALOG:
      return Object.assign({}, state, {
        dialogOpened: action.payload
      });

    case types.SELECT_DATE:
      return Object.assign({}, state, {
        selectedDate: action.payload
      });

    case types.LOAD_GENERIC_FILTER_SUCCESS:
      return Object.assign({}, state, {
        currentResponseReport: action.payload,
        currentResponseChart: action.payload
      });
    case types.LOAD_CHART_FILTER_SUCCESS:
      return Object.assign({}, state, {
        currentResponseChart: action.payload
      });
    case types.LOAD_REPORT_FILTER_SUCCESS:
      return Object.assign({}, state, {
        currentResponseReport: action.payload
      });

    default:
      return state;
  }
};

export default rootReducer;
