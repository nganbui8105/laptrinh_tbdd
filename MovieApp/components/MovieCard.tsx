import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}

export interface MovieCardProps {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  layout = 'row',
  onSelect,
}) => {
  const isTile = layout === 'tile';
  const ratingText = `⭐ ${Number(movie.rating).toFixed(1)}`;
  const statusText = movie.isShowing ? '✅' : '❌';

  return (
    <TouchableOpacity
      style={[styles.card, isTile && styles.cardTile]}
      onPress={() => onSelect(movie.id)}
      activeOpacity={0.8}
    >
      {/* Khu vực Poster (và nhãn điểm đè góc khi ở chế độ tile) */}
      <View style={[styles.posterWrap, isTile && styles.posterWrapTile]}>
        <Image
          source={{ uri: movie.poster }}
          style={[styles.poster, isTile && styles.posterTile]}
          resizeMode="cover"
        />
        {isTile && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingBadgeText}>{ratingText}</Text>
          </View>
        )}
      </View>

      {/* Khu vực Thông tin */}
      <View style={[styles.info, isTile && styles.infoTile]}>
        <Text style={styles.title} numberOfLines={isTile ? 1 : 2}>
          {movie.title}
        </Text>

        {!isTile && (
          <Text style={styles.meta}>
            {movie.genre} • {movie.year}
          </Text>
        )}

        <View style={styles.footerRow}>
          {!isTile && <Text style={styles.rating}>{ratingText}</Text>}
          <Text style={styles.status}>{statusText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTile: {
    flexDirection: 'column',
    flex: 1,
    maxWidth: '48.5%', // Đảm bảo 2 cột rộng đều và item lẻ cuối không bị giãn full
    padding: 0,
    overflow: 'hidden',
  },
  posterWrap: {
    position: 'relative',
  },
  posterWrapTile: {
    width: '100%',
  },
  poster: {
    width: 70,
    height: 100,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  posterTile: {
    width: '100%',
    height: undefined,
    aspectRatio: 2 / 3,
    borderRadius: 0,
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  infoTile: {
    marginLeft: 0,
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  meta: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D97706',
  },
  status: {
    fontSize: 14,
  },
});

export default React.memo(MovieCard);