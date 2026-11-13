import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MovieCard, { Movie } from '../components/MovieCard';

const sampleMovie: Movie = {
  id: '101',
  title: 'Inception',
  genre: 'Sci-Fi',
  year: 2010,
  rating: 8,
  poster: 'https://example.com/poster.jpg',
  isShowing: true,
};

describe('MovieCard Component', () => {
  // 7a. Test render: tên phim và điểm đánh giá đúng định dạng "⭐ 8.0"
  it('hiển thị đúng tên phim và định dạng điểm đánh giá', () => {
    const { getByText } = render(
      <MovieCard movie={sampleMovie} onSelect={jest.fn()} />
    );

    expect(getByText('Inception')).toBeTruthy();
    expect(getByText('⭐ 8.0')).toBeTruthy();
  });

  // 7b. Test layout: row có thể loại; tile ẩn thể loại
  it('hiển thị thể loại ở layout row và ẩn ở layout tile', () => {
    const { getByText, rerender, queryByText } = render(
      <MovieCard movie={sampleMovie} layout="row" onSelect={jest.fn()} />
    );
    expect(getByText(/Sci-Fi/)).toBeTruthy();

    rerender(
      <MovieCard movie={sampleMovie} layout="tile" onSelect={jest.fn()} />
    );
    expect(queryByText(/Sci-Fi/)).toBeNull();
  });

  // 7c. Test trạng thái: isShowing true -> ✅, false -> ❌
  it('hiển thị đúng icon trạng thái đang chiếu / ngừng chiếu', () => {
    const { getByText, rerender } = render(
      <MovieCard
        movie={{ ...sampleMovie, isShowing: true }}
        onSelect={jest.fn()}
      />
    );
    expect(getByText('✅')).toBeTruthy();

    rerender(
      <MovieCard
        movie={{ ...sampleMovie, isShowing: false }}
        onSelect={jest.fn()}
      />
    );
    expect(getByText('❌')).toBeTruthy();
  });

  // 7d. Test sự kiện: nhấn gọi onSelect 1 lần với movie.id
  it('gọi hàm onSelect đúng 1 lần với tham số movie.id khi nhấn', () => {
    const mockOnSelect = jest.fn();
    const { getByText } = render(
      <MovieCard movie={sampleMovie} onSelect={mockOnSelect} />
    );

    fireEvent.press(getByText('Inception'));
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith('101');
  });
});