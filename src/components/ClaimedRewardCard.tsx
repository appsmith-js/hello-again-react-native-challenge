import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { hs, ws } from '../utils/Metrics';

const ClaimedRewardCard = ({ reward }: { reward: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              reward?.pictures?.[0]?.image || 'https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=1024x1024&w=is&k=20&c=iBBM7YTn5Rf-QhCd0kkvFaDNLV6Rb02iMQlS39LSSTI=',
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{reward.name}</Text>
        <Text style={styles.pointsText}>
          Collected at {reward.needed_points} points
        </Text>
        <Text style={styles.status}>Already Collected</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ws(358),
    flex:1,
    backgroundColor: '#FFFFFF',
    borderRadius: ws(12),
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginVertical: hs(10),
  },
  imageContainer: {
    height: hs(150),
    width: '100%',
    backgroundColor: '#f2f2f2',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: ws(12),
  },
  title: {
    fontSize: ws(16),
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: hs(4),
  },
  pointsText: {
    fontSize: ws(14),
    color: '#999',
    fontFamily: 'Inter-Regular',
  },
  status: {
    marginTop: hs(6),
    fontSize: ws(13),
    fontFamily: 'Inter-Bold',
    color: '#4CAF50',
  },
});

export default ClaimedRewardCard;
