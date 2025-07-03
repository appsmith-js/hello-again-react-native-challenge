import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { COLLECT_REWARD } from '../redux/rewards/rewardsSlice';
import RewardCard from '../components/RewardCard';
import { hs, ws } from '../utils/Metrics';
import { RootState } from '../redux/store';

const INITIAL_URL =
  'https://staging.helloagain.at/api/v1/clients/5189/bounties/?limit=10&page=1';

const RewardsCatalog = ({ navigation }: any) => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState(INITIAL_URL);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const collected = useSelector(
    (state: RootState) => state.collectedRewards.items,
  );
  const totalPoints = collected.reduce(
    (sum, item) => sum + (item.needed_points || 0),
    0,
  );

  const fetchRewards = async (url: string, reset = false) => {
    if (!url) return;
    if (!reset && isFetchingMore) return;

    try {
      reset
        ? setRefreshing(true)
        : rewards.length > 0
        ? setIsFetchingMore(true)
        : setLoading(true);
      setError(false);

      const res = await fetch(url);
      const json = await res.json();

      const filtered = json.results.filter(
        (item: any) => item.pictures && item.pictures.length > 0,
      );

      setRewards(prev => (reset ? filtered : [...prev, ...filtered]));
      setNextPageUrl(json.next || null);
    } catch (err) {
      console.error('Failed to fetch rewards', err);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchRewards(INITIAL_URL, true);
  }, []);

  const handleLoadMore = () => {
    if (nextPageUrl && !isFetchingMore && !refreshing && !loading && !error) {
      fetchRewards(nextPageUrl);
    }
  };

  const handleRetry = () => {
    setNextPageUrl(INITIAL_URL);
    fetchRewards(INITIAL_URL, true);
  };

  const handleCollect = (reward: any) => {
    dispatch(COLLECT_REWARD(reward));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar
        translucent
        backgroundColor="#FCF7F7"
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.totalPoints}>Total points {totalPoints}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('CollectedRewards')}
            style={styles.historyButton}
          >
            <Text style={styles.historyText}>Show history</Text>
          </TouchableOpacity>
        </View>

        {error && rewards.length === 0 ? (
          <View style={styles.centered}>
            <Text style={styles.errorText}>
              Something went wrong. Please try again.
            </Text>
            <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : loading && rewards.length === 0 ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#4CAF50" />
          </View>
        ) : (
          <FlatList
            data={rewards}
            keyExtractor={(item: any) => item?.id}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item }) => {
              const isCollected = collected.some(r => r.id === item.id);
              return (
                <RewardCard
                  reward={item}
                  isCollected={isCollected}
                  onCollect={() => handleCollect(item)}
                />
              );
            }}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.6}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={() => fetchRewards(INITIAL_URL, true)}
            ListFooterComponent={() =>
              isFetchingMore ? (
                <ActivityIndicator
                  size="small"
                  color="#888"
                  style={styles.footerLoader}
                />
              ) : null
            }
            ListEmptyComponent={() =>
              !loading &&
              !error && (
                <Text style={styles.emptyText}>No rewards available.</Text>
              )
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default RewardsCatalog;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FCF7F7',
  },
  header: {
    height: hs(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ws(16),
    marginBottom: hs(12),
  },
  totalPoints: {
    fontSize: ws(16),
    fontFamily: 'Inter-SemiBold',
  },
  historyButton: {
    backgroundColor: 'lightblue',
    paddingHorizontal: ws(12),
    paddingVertical: hs(8),
    borderRadius: ws(8),
  },
  historyText: {
    fontFamily: 'Inter-Medium',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: ws(16),
    fontFamily: 'Inter-Medium',
    color: '#D32F2F',
    marginBottom: hs(8),
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: ws(20),
    paddingVertical: hs(10),
    borderRadius: ws(8),
  },
  retryText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
  flatListContent: {
    paddingBottom: hs(40),
    paddingHorizontal: ws(16),
    flexGrow: 1,
  },
  footerLoader: {
    marginVertical: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: hs(20),
    color: '#888',
    fontFamily: 'Inter-Regular',
  },
});
