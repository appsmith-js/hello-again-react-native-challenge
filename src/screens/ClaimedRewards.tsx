import React from 'react';
import {
  FlatList,
  StatusBar,
  Text,
  View,
  StyleSheet,
  Platform,
  Button,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ClaimedRewardCard from '../components/ClaimedRewardCard';
import { hs, ws } from '../utils/Metrics';
import { SafeAreaView } from 'react-native-safe-area-context';

const ClaimedRewards = ({navigation}:any) => {
  const collected = useSelector(
    (state: RootState) => state.collectedRewards.items,
  );
  const totalPoints = collected.reduce(
    (sum, reward) => sum + (reward.needed_points || 0),
    0,
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="#FCF7F7"
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <Button title={'Go back'} onPress={()=>navigation.goBack()}/>
        <Text style={styles.headerText}>Total points {totalPoints}</Text>

      </View>

      <FlatList
        data={collected}
        contentContainerStyle={styles.listContent}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ClaimedRewardCard reward={item} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Claimed Rewards Yet</Text>
            <Text style={styles.emptySubtitle}>
              Start collecting rewards and they will appear here!
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FCF7F7',
  },
  header: {
    height: hs(60),
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection:'row',

  },
  headerText: {
    fontSize: ws(16),
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ws(24),
  },
  emptyTitle: {
    fontSize: ws(18),
    fontFamily: 'Inter-Bold',
    color: '#444',
    marginBottom: hs(6),
  },
  emptySubtitle: {
    fontSize: ws(14),
    fontFamily: 'Inter-Regular',
    color: '#888',
    textAlign: 'center',
  },
});

export default ClaimedRewards;
