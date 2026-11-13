import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Bike } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'Screen_02'>;

const Screen_02 = ({ navigation }: Props) => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const API_URL = 'https://6af6eebae844c7ff741bcb96.mockapi.io/bikes';

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBikes(data);
      })
      .catch((err) => console.error('Lỗi fetch API:', err))
      .finally(() => setLoading(false));
  }, []);

  // Hàm bật/tắt trạng thái thả tim đỏ theo id xe
  const toggleLike = (id: string) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredBikes =
    selectedCategory === 'All'
      ? bikes
      : bikes.filter(
          (item) =>
            item.category?.trim().toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  const renderItem = ({ item }: { item: Bike }) => {
    const isLiked = likedIds.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Screen_03', { bike: item })}
      >
        {/* Nút trái tim: bấm vào đổi tintColor sang đỏ */}
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => toggleLike(item.id)}
        >
          <Image
            source={{ uri: 'https://i.ibb.co/7N2jJDVV/heart.png' }}
            style={[
              styles.heartIcon,
              { tintColor: isLiked ? '#E94141' : '#BEB3B3' },
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Image
          source={{ uri: item.image }}
          style={styles.bikeImage}
          resizeMode="contain"
        />
        <Text style={styles.bikeName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.bikePrice}>
          <Text style={styles.dollar}>$ </Text>
          {item.price}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>The World's Best Bike</Text>

      <View style={styles.filterRow}>
        {['All', 'Roadbike', 'Mountain'].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterBtn,
              selectedCategory === cat && styles.filterBtnActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === cat && styles.filterTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#E94141" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={filteredBikes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E94141',
    marginBottom: 15,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterBtn: {
    paddingVertical: 7,
    paddingHorizontal: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E9414187',
  },
  filterBtnActive: {
    backgroundColor: '#F7BA8326',
    borderColor: '#E94141',
  },
  filterText: {
    fontSize: 15,
    color: '#BEB3B3',
  },
  filterTextActive: {
    color: '#E94141',
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#F7BA8326',
    borderRadius: 10,
    width: '48%',
    padding: 12,
    alignItems: 'center',
  },
  heartBtn: {
    alignSelf: 'flex-start',
    padding: 4,
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
  bikeImage: {
    width: '100%',
    height: 115,
    marginVertical: 8,
  },
  bikeName: {
    fontSize: 16,
    color: '#00000099',
    fontWeight: '500',
  },
  bikePrice: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 4,
  },
  dollar: {
    color: '#F7BA83',
  },
});

export default Screen_02;