import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Reward {
  id: string;
  name: string;
  needed_points: number;
  pictures: any[];
}

interface CollectedRewardsState {
  items: Reward[];
}

const initialState: CollectedRewardsState = {
  items: [],
};

const collectedRewardsSlice = createSlice({
  name: 'collectedRewards',
  initialState,
  reducers: {
    collectReward: (state, action: PayloadAction<Reward>) => {
      const alreadyCollected = state.items.find(
        item => item.id === action.payload.id,
      );
      if (!alreadyCollected) {
        state.items.push(action.payload);
      }
    },
  },
});

export const COLLECT_REWARD = collectedRewardsSlice.actions.collectReward;
export default collectedRewardsSlice.reducer;
