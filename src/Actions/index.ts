import axios from 'axios';
import moment from 'moment';
import * as config from '../Config';
import * as types from './ActionTypes';

export const loadCategory = (type: String) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: types.LOAD_CATEGORY_START, payload: type });
  };
};

export const changeChartType = (type: number) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: types.CHANGE_CHART_TYPE, payload: type });
  };
};

export const loadFilter = (type: string, typeValue: number, mode: number) => {
  return (dispatch: any, getState: any) => {
    const selectedCategory = getState().selectedCategory;
    const selectedDate = getState().selectedDate;
    let date2: string,
      date3: string = '';
    if (typeValue === 1) {
      date2 = moment().subtract(7, 'days').format('YYYY-MM-DD');
      date3 = moment(new Date(moment.now())).format('YYYY-MM-DD');
    } else {
      date2 = selectedDate.dateFrom;
      date3 = selectedDate.dateTo;
    }

    if (mode === 1) {
      dispatch({ type: types.LOAD_REPORT_FILTER_START, payload: type });
    } else if (mode === 2) {
      dispatch({ type: types.LOAD_CHART_FILTER_START, payload: type });
    } else {
      dispatch({ type: types.LOAD_GENERIC_FILTER_START, payload: type });
    }

    const query = `{
      ${selectedCategory}(date_from:"${date2}", date_to:"${date3}") {
              created_at
              ${selectedCategory === 'Transactions' ? 'branch' : ''}
              ${selectedCategory === 'Sessions' ? ' lat  long' : 'type'}
             }
            }`;
    axios
      .post(config.SERVER_URL, {
        query
      })
      .then((response) => {
        const payload = {
          requestType: selectedCategory,
          response: response.data,
          dateType: typeValue
        };

        if (selectedCategory === 'Sessions') {
          const locations = payload.response.data.Sessions.map((item: any) => {
            return { lat: item.lat, lng: item.long };
          });

          dispatch({
            type: types.LOAD_MAP,
            payload: locations
          });
        } else {
          if (mode === 1) {
            dispatch({
              type: types.LOAD_REPORT_FILTER_SUCCESS,
              payload: payload
            });
          } else if (mode === 2) {
            dispatch({
              type: types.LOAD_CHART_FILTER_SUCCESS,
              payload: payload
            });
          } else {
            dispatch({
              type: types.LOAD_GENERIC_FILTER_SUCCESS,
              payload: payload
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const toggleDialog = (type: Boolean, mode: number) => {
  const payload = {
    type: type,
    mode: mode
  };
  return (dispatch: any, getState: any) => {
    dispatch({ type: types.TOGGLE_DIALOG, payload: payload });
  };
};

export const selectDate = (date: any) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: types.SELECT_DATE, payload: date });
  };
};
