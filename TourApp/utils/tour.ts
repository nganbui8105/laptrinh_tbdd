export interface Tour {
  id: string;
  name: string;
  city: string;
  days: number;
  price: number;
  seats: number;
  departure: string;
  image: string;
  isFavorite: boolean;
}

export interface TourSection {
  title: string;
  data: Tour[];
}

// Nhóm tour theo thành phố (A -> Z), trong mỗi nhóm sắp xếp departure tăng dần
export function groupByCity(tours: Tour[]): TourSection[] {
  const map: Record<string, Tour[]> = {};

  for (const tour of tours) {
    if (!map[tour.city]) {
      map[tour.city] = [];
    }
    map[tour.city].push(tour);
  }

  return Object.keys(map)
    .sort((a, b) => a.localeCompare(b, 'vi'))
    .map((city) => ({
      title: city,
      data: [...map[city]].sort((a, b) =>
        a.departure.localeCompare(b.departure)
      ),
    }));
}

// "2026-11-05" -> "05/11/2026"
export function formatDate(dateStr: string): string {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// Nhãn số chỗ còn
export function getSeatLabel(seats: number): string {
  if (seats <= 0) return 'Hết chỗ';
  if (seats <= 3) return `Chỉ còn ${seats} chỗ`;
  return `Còn ${seats} chỗ`;
}

// Định dạng giá VNĐ: 3590000 -> "3.590.000 ₫"
export function formatPrice(price: number): string {
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ₫`;
}