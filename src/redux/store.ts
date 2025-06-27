
import { configureStore } from '@reduxjs/toolkit';
import collectedRewardsReducer from './rewards/rewardsSlice';

const store = configureStore({
  reducer: {
    collectedRewards: collectedRewardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
