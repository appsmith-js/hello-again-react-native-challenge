import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { hs, ws } from '../utils/Metrics';

interface RewardCardProps {
  reward: {
    id?: string;
    name?: string;
    needed_points?: number;
    pictures?: { image: string }[];
  };
  isCollected?: boolean;
  onCollect?: () => void;
}

const RewardCardComponent: React.FC<RewardCardProps> = ({
  reward,
  isCollected,
  onCollect,
}) => {
  const imageUrl =
    reward?.pictures?.length > 0 && reward.pictures[0].image
      ? reward.pictures[0].image
      : 'https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=1024x1024&w=is&k=20&c=iBBM7YTn5Rf-QhCd0kkvFaDNLV6Rb02iMQlS39LSSTI=';

  return (
    <View style={[styles.container, isCollected && styles.collectedCard]}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{reward.name}</Text>

        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{reward.needed_points}</Text>
          <Text style={styles.pointsLabel}> points</Text>
        </View>

        {!isCollected ? (
          <TouchableOpacity style={styles.claimButton} onPress={onCollect}>
            <Text style={styles.buttonText}>COLLECT</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.collectedLabel}>Collected</Text>
        )}
      </View>
    </View>
  );
};

const RewardCard = React.memo(RewardCardComponent, (prev, next) => {
  return (
    prev.reward.id === next.reward.id && prev.isCollected === next.isCollected
  );
});

export default RewardCard;

const styles = StyleSheet.create({
  container: {
    minHeight: hs(270),
    width: ws(358),
    backgroundColor: '#FFFFFF',
    borderRadius: ws(12),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    marginVertical: hs(8),
  },
  collectedCard: {
    opacity: 0.5,
  },
  imageContainer: {
    height: hs(180),
    width: '100%',
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: ws(16),
  },
  title: {
    fontSize: ws(16),
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: hs(8),
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hs(12),
  },
  pointsText: {
    fontSize: ws(16),
    fontFamily: 'Inter-Bold',
    color: '#FFA500',
  },
  pointsLabel: {
    fontSize: ws(14),
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  claimButton: {
    backgroundColor: '#4CAF50',
    borderRadius: ws(10),
    width: '100%',
    height: hs(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: ws(14),
    letterSpacing: ws(0.5),
  },
  collectedLabel: {
    textAlign: 'center',
    fontSize: ws(14),
    fontFamily: 'Inter-Bold',
    color: '#999',
  },
});
