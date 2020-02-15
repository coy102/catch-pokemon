import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
import rootSagas from './rootSaga';
import rootReducers from './rootReducer';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
});

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware: Array<any>) => {
  if (process.env.NODE_ENV !== 'production') {
    return applyMiddleware(...middleware);
  }
  return applyMiddleware(sagaMiddleware);
};

function initStore(initialState: any) {
  const store: any = createStore(
    rootReducers,
    initialState,
    bindMiddleware([sagaMiddleware, loggerMiddleware])
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSagas);
  };

  store.runSagaTask();

  return store;
}

export default initStore;
