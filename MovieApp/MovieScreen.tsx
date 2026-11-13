import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Switch,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieCard, { Movie } from './components/MovieCard';

const API_URL = 'https://6af6f65be844c7ff741bd3c1.mockapi.io/movies';

export default function MovieScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isTile, setIsTile] = useState<boolean>(false);

  const fetchMovies = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) {
        setMovies(data);
      }
    } catch (error) {
      console.error('Lỗi tải danh sách phim:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSelectMovie = useCallback(
    (id: string) => {
      const selected = movies.find((m) => m.id === id);
      if (!selected) return;

      if (Platform.OS === 'web') {
        window.alert(selected.title);
      } else {
        Alert.alert('Phim đã chọn', selected.title);
      }
    },
    [movies]
  );

  const numColumns = isTile ? 2 : 1;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header: Tiêu đề + Switch Dạng lưới */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Movie App</Text>
          <View style={styles.switchGroup}>
            <Text style={styles.switchLabel}>Dạng lưới</Text>
            <Switch value={isTile} onValueChange={setIsTile} />
          </View>
        </View>

        {/* Nội dung danh sách */}
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#2563EB" />
          </View>
        ) : (
          <FlatList
            key={String(numColumns)}
            data={movies}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            columnWrapperStyle={isTile ? styles.columnWrapper : undefined}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => fetchMovies(true)}
              />
            }
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                layout={isTile ? 'tile' : 'row'}
                onSelect={handleSelectMovie}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  switchGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    fontSize: 14,
    color: '#374151',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});