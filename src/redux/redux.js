import { configureStore } from '@reduxjs/toolkit';
import { createReducer, createAction } from '@reduxjs/toolkit';
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
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
};

export const addItems = createAction('items/add');
export const removeItems = createAction('items/remove');
export const addFilter = createAction('filter/add');

export const itemsReducer = createReducer([], {
  [addItems]: (state, action) => {
    state.push(action.payload);
  },
  [removeItems]: (state, action) => {
    state.filter(elem => elem.id !== action.payload);
  },
});
export const filterReducer = createReducer('', {
  [addFilter]: (state, action) => (state = action.payload),
});

const persistedReducer = persistReducer(persistConfig, itemsReducer);

export const store = configureStore({
  reducer: {
    items: persistedReducer,
    filter: filterReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);
