import { getPaginationItemList } from './pagination';

describe('getPaginationItemList', () => {
  test('currentPage: 5, totalPages: 10, maxItems: 5 => [1, ..., 4, 5, 6, ..., 10]', () => {
    expect(getPaginationItemList(5, 10, 5)).toEqual([
      '1',
      '...',
      '4',
      '5',
      '6',
      '...',
      '10',
    ]);
  });

  test('currentPage: 1, totalPages: 10, maxItems: 5 => [1, 2, ..., 10]', () => {
    expect(getPaginationItemList(1, 10, 5)).toEqual(['1', '2', '...', '10']);
  });

  test('currentPage: 2, totalPages: 10, maxItems: 5 => [1, 2, 3, ..., 10]', () => {
    expect(getPaginationItemList(2, 10, 5)).toEqual([
      '1',
      '2',
      '3',
      '...',
      '10',
    ]);
  });

  test('currentPage: 10, totalPages: 10, maxItems: 5 => [1, ..., 9, 10]', () => {
    expect(getPaginationItemList(10, 10, 5)).toEqual(['1', '...', '9', '10']);
  });

  test('currentPage: 1, totalPages: 10, maxItems: 3', () => {
    expect(getPaginationItemList(1, 10, 3)).toEqual(['1', '...', '10']);
  });

  test('currentPage: 1, totalPages: 1, maxItems: 5', () => {
    expect(getPaginationItemList(1, 2, 5)).toEqual(['1', '2']);
  });

  test('currentPage: 1, totalPages: 2, maxItems: 5', () => {
    expect(getPaginationItemList(1, 2, 5)).toEqual(['1', '2']);
  });
});
