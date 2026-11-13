import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'Screen_03'>;

const Screen_03 = ({ route, navigation }: Props) => {
  const { bike } = route.params;
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageBox}>
        <Image
          source={{ uri: bike.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.name}>{bike.name}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.discount}>{bike.discount}</Text>
        <Text style={styles.price}>${bike.price}</Text>
      </View>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{bike.description}</Text>

      <View style={styles.bottomRow}>
        {/* Bấm nút trái tim đổi giữa đen và đỏ */}
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => setLiked(!liked)}
        >
          <Image
            source={{ uri: 'https://i.ibb.co/7N2jJDVV/heart.png' }}
            style={[
              styles.heartIcon,
              { tintColor: liked ? '#E94141' : '#000000' },
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.addBtnText}>Add to card</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 25,
    justifyContent: 'space-between',
  },
  imageBox: {
    backgroundColor: '#E941411A',
    borderRadius: 15,
    width: '100%',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 15,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  discount: {
    fontSize: 18,
    color: '#00000096',
    marginRight: 25,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    color: '#000000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#00000091',
    lineHeight: 22,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  heartBtn: {
    padding: 10,
    marginRight: 20,
  },
  heartIcon: {
    width: 28,
    height: 28,
  },
  addBtn: {
    flex: 1,
    backgroundColor: '#E94141',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Screen_03;