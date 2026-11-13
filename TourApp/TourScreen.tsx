import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  SectionList,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TourItem from './components/TourItem';
import { Tour, groupByCity, formatDate, formatPrice } from './utils/tour';

const API_URL = 'https://6af6f65be844c7ff741bd3c1.mockapi.io/tours';

export default function TourScreen() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchTours = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        setTours(data);
      }
    } catch (err) {
      console.error('Lỗi tải danh sách tour:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const showMessage = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  // Nhấn vào thẻ tour -> hiện Alert gồm tên, ngày khởi hành, số ngày và giá
  const handlePressTour = useCallback((tour: Tour) => {
    const info = `Ngày khởi hành: ${formatDate(tour.departure)}\nSố ngày: ${tour.days} ngày\nGiá: ${formatPrice(tour.price)}`;
    showMessage(tour.name, info);
  }, []);

  // Cập nhật lạc quan (Optimistic UI) + PUT API + hoàn tác nếu lỗi
  const handleToggleFavorite = useCallback(async (id: string, next: boolean) => {
    setTours((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isFavorite: next } : t))
    );

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: next }),
      });
      if (!res.ok) {
        throw new Error('Cập nhật thất bại');
      }
    } catch (error) {
      // Hoàn tác về trạng thái cũ
      setTours((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isFavorite: !next } : t))
      );
      showMessage('Lỗi', 'Không thể cập nhật tour yêu thích. Vui lòng thử lại!');
    }
  }, []);

  // Danh sách yêu thích (không bị ảnh hưởng bởi ô tìm kiếm)
  const favoriteTours = useMemo(
    () => tours.filter((t) => t.isFavorite),
    [tours]
  );

  // Lọc theo từ khóa tìm kiếm (không phân biệt hoa thường, trim) + nhóm theo thành phố
  const sections = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    const filtered = keyword
      ? tours.filter((t) => t.name.toLowerCase().includes(keyword))
      : tours;
    return groupByCity(filtered);
  }, [tours, search]);

  const renderFavoriteHeader = () => (
    <View style={styles.favSection}>
      <Text style={styles.favSectionTitle}>
        Tour yêu thích ({favoriteTours.length})
      </Text>
      {favoriteTours.length === 0 ? (
        <Text style={styles.emptyFavText}>Chưa có tour yêu thích</Text>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={favoriteTours}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          renderItem={({ item }) => (
            <TourItem
              tour={item}
              compact={true}
              onPress={handlePressTour}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header: Tiêu đề + MSSV - Họ tên + Ô tìm kiếm */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tour Việt</Text>
          <Text style={styles.studentInfo}>
            23723871 – Bùi Nguyễn Kim Ngân
          </Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm tour theo tên..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#0284C7" />
          </View>
        ) : (
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            stickySectionHeadersEnabled={true}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={renderFavoriteHeader}
            ListEmptyComponent={
              <Text style={styles.emptySearchText}>
                Không tìm thấy tour phù hợp
              </Text>
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => fetchTours(true)}
              />
            }
            renderSectionHeader={({ section }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>
                  {section.title} · {section.data.length} tour
                </Text>
              </View>
            )}
            renderItem={({ item }) => (
              <TourItem
                tour={item}
                compact={false}
                onPress={handlePressTour}
                onToggleFavorite={handleToggleFavorite}
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0284C7',
  },
  studentInfo: {
    fontSize: 13,
    color: '#4B5563',
    marginTop: 2,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  favSection: {
    marginTop: 12,
    marginBottom: 8,
  },
  favSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  emptyFavText: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
    paddingVertical: 8,
  },
  sectionHeader: {
    backgroundColor: '#E0F2FE',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0369A1',
  },
  emptySearchText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 15,
    color: '#6B7280',
  },
});