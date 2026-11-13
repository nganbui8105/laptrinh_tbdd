import { groupByCity, formatDate, getSeatLabel, Tour } from '../utils/tour';

const mockTours: Tour[] = [
  { id: '1', name: 'Tour B', city: 'Hà Nội', days: 2, price: 2000000, seats: 5, departure: '2026-11-20', image: '', isFavorite: false },
  { id: '2', name: 'Tour A', city: 'Đà Lạt', days: 3, price: 3000000, seats: 2, departure: '2026-11-15', image: '', isFavorite: true },
  { id: '3', name: 'Tour C', city: 'Đà Lạt', days: 2, price: 2500000, seats: 0, departure: '2026-11-05', image: '', isFavorite: false },
];

describe('tour utils', () => {
  it('groupByCity nhóm đúng số lượng, sắp xếp thành phố A -> Z và ngày tăng dần', () => {
    const sections = groupByCity(mockTours);
    expect(sections).toHaveLength(2);
    expect(sections[0].title).toBe('Đà Lạt');
    expect(sections[1].title).toBe('Hà Nội');
    expect(sections[0].data[0].departure).toBe('2026-11-05');
    expect(sections[0].data[1].departure).toBe('2026-11-15');
  });

  it('formatDate chuyển đổi đúng định dạng dd/MM/yyyy', () => {
    expect(formatDate('2026-11-05')).toBe('05/11/2026');
  });

  it('getSeatLabel trả về đúng nhãn ở các giá trị biên 0, 3, 4', () => {
    expect(getSeatLabel(0)).toBe('Hết chỗ');
    expect(getSeatLabel(3)).toBe('Chỉ còn 3 chỗ');
    expect(getSeatLabel(4)).toBe('Còn 4 chỗ');
  });
});