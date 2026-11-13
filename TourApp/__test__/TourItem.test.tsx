import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TourItem, { Tour } from '../components/TourItem';

const sampleTour: Tour = {
  id: '10',
  name: 'Đà Lạt mộng mơ',
  city: 'Đà Lạt',
  days: 3,
  price: 3590000,
  seats: 5,
  departure: '2026-11-05',
  image: 'https://example.com/dalat.jpg',
  isFavorite: false,
};

describe('TourItem Component', () => {
  it('compact=true ẩn thành phố, compact=false hiển thị thành phố', () => {
    const { getByText, rerender, queryByText } = render(
      <TourItem
        tour={sampleTour}
        compact={false}
        onPress={jest.fn()}
        onToggleFavorite={jest.fn()}
      />
    );
    expect(getByText('Đà Lạt')).toBeTruthy();

    rerender(
      <TourItem
        tour={sampleTour}
        compact={true}
        onPress={jest.fn()}
        onToggleFavorite={jest.fn()}
      />
    );
    expect(queryByText('Đà Lạt')).toBeNull();
  });

  it('nhấn fav-btn gọi onToggleFavorite(id, true) và không gọi onPress; nhấn tên gọi onPress(tour)', () => {
    const mockOnPress = jest.fn();
    const mockOnToggle = jest.fn();

    const { getByTestId, getByText } = render(
      <TourItem
        tour={sampleTour}
        onPress={mockOnPress}
        onToggleFavorite={mockOnToggle}
      />
    );

    fireEvent.press(getByTestId('fav-btn'));
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith('10', true);
    expect(mockOnPress).not.toHaveBeenCalled();

    fireEvent.press(getByText('Đà Lạt mộng mơ'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalledWith(sampleTour);
  });
});