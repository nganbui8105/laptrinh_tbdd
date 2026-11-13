// 💡 Lý do tách file types.ts riêng: Để Screen_01, Screen_02, Screen_03 cùng import kiểu dữ liệu tại một chỗ, tránh lỗi vòng lặp (circular dependency) và không phụ thuộc vào file App.tsx bên ngoài.

export type Bike = {
  id: string;
  name: string;
  price: number;
  discount: string;
  description: string;
  image: string;
  category: 'Roadbike' | 'Mountain';
};

export type RootStackParamList = {
  Screen_01: undefined;        // Màn hình 1 không nhận tham số
  Screen_02: undefined;        // Màn hình 2 không nhận tham số
  Screen_03: { bike: Bike };   // Màn hình 3 bắt buộc nhận 1 đối tượng `bike` từ Màn hình 2 truyền sang
};