import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

// 💡 Định kiểu cho prop `navigation` để IDE gợi ý chính xác tên màn hình cần chuyển tới
type Props = NativeStackScreenProps<RootStackParamList, 'Screen_01'>;

const Screen_01: React.FC<Props> = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      {/* Dòng mô tả cửa hàng theo thiết kế Figma */}
      <Text style={styles.title}>
        A premium online store for sporter and their stylish choice
      </Text>

      {/* Khung nền bo góc chứa hình xe đại diện */}
      <View style={styles.imageBox}>
        <Image
          source={{ uri: 'https://i.ibb.co/327vPck/bithree-removebg-preview.png' }}
          style={styles.image}
          // 💡 resizeMode="contain" giúp ảnh xe nằm trọn trong khung mà không bị cắt góc hay méo tỉ lệ
          resizeMode="contain"
        />
      </View>

      {/* Tên cửa hàng */}
      <Text style={styles.shopName}>POWER BIKE SHOP</Text>

      {/* Nút bấm chuyển sang Màn hình 2
          💡 Dùng TouchableOpacity thay vì Button để tự do chỉnh màu nền đỏ, bo góc tròn và có hiệu ứng mờ khi chạm */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Screen_02')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-around', // Tự động chia đều khoảng cách dọc giữa các thành phần
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400',
    color: '#000000',
    lineHeight: 24,
  },
  imageBox: {
    backgroundColor: '#E941411A', // Màu nền hồng nhạt bo góc theo Figma (có thể đổi sang #E8E5E5 nếu Figma của bạn là màu xám)
    borderRadius: 30,
    width: '100%',
    height: 310,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  shopName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  button: {
    backgroundColor: '#E94141',
    borderRadius: 30,
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Screen_01;