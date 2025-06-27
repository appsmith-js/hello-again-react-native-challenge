import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RewardsCatalog from '../screens/RewardsCatalog';
import ClaimedRewards from '../screens/ClaimedRewards';

export type RootStackParamList = {
  RewardsCatalog: undefined;
  CollectedRewards: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="RewardsCatalog"
    >
      <Stack.Screen name="RewardsCatalog" component={RewardsCatalog} />
      <Stack.Screen name="CollectedRewards" component={ClaimedRewards} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
