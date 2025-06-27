import React from 'react';
import { FlatList, StatusBar, Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ClaimedRewardCard from '../components/ClaimedRewardCard';
import { hs, ws } from '../utils/Metrics';

const ClaimedRewards = () => {
  const collected = useSelector(
    (state: RootState) => state.collectedRewards.items,
  );
  const totalPoints = collected.reduce(
    (sum, reward) => sum + (reward.needed_points || 0),
    0,
  );

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="#FCF7F7"
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Total points {totalPoints}</Text>
      </View>

      <FlatList
        data={collected}
        contentContainerStyle={{
          padding: 16,
          flexGrow: 1,
          backgroundColor: '#FCF7F7',
        }}
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
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: hs(60),
    width: ws(390),
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hs(12),
  },
  headerText: {
    fontSize: ws(16),
    fontFamily: 'Inter-SemiBold',
    color: '#333',
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
