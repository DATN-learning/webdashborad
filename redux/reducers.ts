import { persistCombineReducers } from 'redux-persist';
import { ClassRoomReducer } from './classRoom/reducers';
import { PostReducer } from './post/reducers';
const storage = require('redux-persist/lib/storage').default;
const reducers = {
    classRoom: ClassRoomReducer,
    post: PostReducer
};

const persistConfig = {
  key: 'root',
  storage,
};

// Setup Reducers
export const persistedRootReducer = persistCombineReducers(persistConfig, reducers);

export type RootState = ReturnType<typeof persistedRootReducer>;

export default persistedRootReducer;
