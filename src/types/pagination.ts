export interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  setPage: (page: number) => void;
  setItemsPerPage: (number: number) => void;
}
