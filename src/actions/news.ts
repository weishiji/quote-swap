import { Dispatch } from 'redux';

export const FETCH_NEWS_LIST_REQUEST = 'FETCH_NEWS_LIST_REQUEST';
export const FETCH_NEWS_LIST_SUCCESS = 'FETCH_NEWS_LIST_SUCCESS';
export const FETCH_NEWS_LIST_FAILTURE = 'FETCH_NEWS_LIST_FAILTURE';

export const fetchNews = () => async (dispatch: Dispatch) => {
  const response = () => new Promise((resolve) => resolve(true));

  if (response) {
    dispatch({
      type: FETCH_NEWS_LIST_REQUEST,
    });
  }
};
