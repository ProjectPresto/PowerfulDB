import { configureStore as configureMainStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureMainStore({
	reducer
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch