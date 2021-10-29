import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware, AnyAction, Store } from 'redux';

import rootReducer from '@/reducers';

export type TRootState = ReturnType<typeof rootReducer>;

const bindMiddleware = (middleware: ThunkMiddleware[]) => {
  const { composeWithDevTools } = require('redux-devtools-extension/developmentOnly');
  return composeWithDevTools(applyMiddleware(...middleware));
};

const reducer = (state: TRootState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default:
      return rootReducer(state, action);
  }
};

const makeStore = () => createStore(reducer, bindMiddleware([thunkMiddleware]));

export const wrapper = createWrapper<Store<TRootState>>(makeStore, {
  debug: process.env.NODE_ENV === 'development',
});
