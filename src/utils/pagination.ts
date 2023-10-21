export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
}

/**
 * Get the pagination item list for the pagination component.
 *
 * e.g.
 *   currentPage = 5, totalPages = 10, maxItems = 5
 *   => ['1', '...', '4', '5', '6', '...', '10']
 *   currentPage = 1, totalPages = 10, maxItems = 5
 *   => ['1', '2', '3', '4', '...', '10']
 *   currentPage = 10, totalPages = 10, maxItems = 5
 *   => ['1', '...', '7', '8', '9', '10']
 * @param currentPage The current page number.
 * @param totalPages The total number of pages.
 * @param maxPageNumItems The maximum number of items to show(... is not included)
 */
export function getPaginationItemList(
  currentPage: number,
  totalPages: number,
  maxItems: number = 5,
) {
  const halfMaxItems = Math.floor(maxItems / 2);
  const beforeCurrentPageList = Array.from(
    { length: halfMaxItems },
    (_, i) => currentPage - i - 1,
  )
    .filter((pageNum) => pageNum > 0)
    .reverse()
    .map((pageNum) => pageNum.toString());
  const afterCurrentPage = Array.from(
    { length: halfMaxItems },
    (_, i) => currentPage + i + 1,
  )
    .filter((pageNum) => pageNum <= totalPages)
    .map((pageNum) => pageNum.toString());
  const paginationItemList = [
    ...beforeCurrentPageList,
    currentPage.toString(),
    ...afterCurrentPage,
  ];

  if (paginationItemList[0] !== '1') {
    // replace to 1
    paginationItemList.splice(0, 1, '1');
  }
  if (
    paginationItemList[paginationItemList.length - 1] !== totalPages.toString()
  ) {
    // replace to totalPages
    paginationItemList.splice(
      paginationItemList.length - 1,
      1,
      totalPages.toString(),
    );
  }

  // insert '...' if needed
  const result: String[] = [];

  for (let i = 0; i < paginationItemList.length; i++) {
    if (
      i > 0 &&
      parseInt(paginationItemList[i]) - parseInt(paginationItemList[i - 1]) > 1
    ) {
      result.push('...');
    }
    result.push(paginationItemList[i]);
  }

  return result;
}
