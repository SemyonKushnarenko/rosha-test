export interface IRow {
    rowId: number;
    row: boolean[];
}

export interface ITableProps {
    mode: 'edit' | 'normal'
}