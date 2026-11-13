import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Tour, formatDate, getSeatLabel, formatPrice } from '../utils/tour';

export { Tour };

export interface TourItemProps {
  tour: Tour;
  compact?: boolean;
  onPress: (tour: Tour) => void;
  onToggleFavorite: (id: string, next: boolean) => void;
}

const TourItem: React.FC<TourItemProps> = ({
  tour,
  compact = false,
  onPress,
  onToggleFavorite,
}) => {
  const isLowSeats = tour.seats <= 3;

  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.cardCompact]}
      onPress={() => onPress(tour)}
      activeOpacity={0.85}
    >
      {/* Khung ảnh (khi compact=true nút tim đè góc phải trên) */}
      <View style={[styles.imageWrap, compact && styles.imageWrapCompact]}>
        <Image
          source={{ uri: tour.image }}
          style={[styles.image, compact && styles.imageCompact]}
          resizeMode="cover"
        />
        {compact && (
          <TouchableOpacity
            testID="fav-btn"
            style={[styles.favBtn, styles.favBtnOverlay]}
            onPress={(e) => {
              e.stopPropagation?.();
              onToggleFavorite(tour.id, !tour.isFavorite);
            }}
          >
            <Text style={[styles.favIcon, tour.isFavorite && styles.favActive]}>
              {tour.isFavorite ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Thông tin tour */}
      <View style={[styles.info, compact && styles.infoCompact]}>
        <Text style={styles.name} numberOfLines={compact ? 1 : 2}>
          {tour.name}
        </Text>

        {!compact && <Text style={styles.city}>{tour.city}</Text>}

        {!compact && (
          <Text style={styles.dateRow}>
            📅 {formatDate(tour.departure)} · {tour.days} ngày
          </Text>
        )}

        <View style={styles.bottomRow}>
          <Text style={styles.price}>{formatPrice(tour.price)}</Text>
          {!compact && (
            <Text style={[styles.seats, isLowSeats && styles.seatsDanger]}>
              {getSeatLabel(tour.seats)}
            </Text>
          )}
        </View>
      </View>

      {/* Nút tim ở mép phải khi compact=false */}
      {!compact && (
        <TouchableOpacity
          testID="fav-btn"
          style={styles.favBtn}
          onPress={(e) => {
            e.stopPropagation?.();
            onToggleFavorite(tour.id, !tour.isFavorite);
          }}
        >
          <Text style={[styles.favIcon, tour.isFavorite && styles.favActive]}>
            {tour.isFavorite ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  cardCompact: {
    flexDirection: 'column',
    width: 160,
    padding: 0,
    marginBottom: 0,
    overflow: 'hidden',
    alignItems: 'stretch',
  },
  imageWrap: {
    position: 'relative',
  },
  imageWrapCompact: {
    width: '100%',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  imageCompact: {
    width: '100%',
    height: undefined,
    aspectRatio: 4 / 3,
    borderRadius: 0,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  infoCompact: {
    marginLeft: 0,
    padding: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },
  city: {
    fontSize: 13,
    color: '#4B5563',
    marginTop: 2,
  },
  dateRow: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0284C7',
  },
  seats: {
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '500',
  },
  seatsDanger: {
    color: '#DC2626',
  },
  favBtn: {
    padding: 6,
    marginLeft: 4,
  },
  favBtnOverlay: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginLeft: 0,
  },
  favIcon: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  favActive: {
    color: '#EF4444',
  },
});

export default React.memo(TourItem);