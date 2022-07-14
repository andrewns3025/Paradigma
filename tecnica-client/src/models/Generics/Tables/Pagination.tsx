export interface Pagination<T> {
    currentPage: number;
    pageSize: number;
    rowCount: number;
    pageCount: number;
    values: T[];
}
