import {configureStore} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import Slicer from './Slicer';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, Slicer);

const logger = createLogger({});

export default () => {
  const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware(
        {
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        },
        // if production remove logger
    ).concat(logger),
  });

  const Persistor = persistStore(Store);
  return {Store, Persistor};
};
