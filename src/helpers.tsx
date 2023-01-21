import { ISelectOption } from 'types';

export const tableColumns = [
  { value: 'item_extend', label: 'Details' },
  { value: 'item_date', label: 'Date of birth' },
  { value: 'item_number', label: 'Number in table' },
  { value: 'item_string', label: 'Name' },
];

export const sortColumnsOptions = tableColumns.filter((col) => col.value !== 'item_extend');

export const pageSizeOptions = [
  { value: 10, label: 10 },
  { value: 25, label: 25 },
  { value: 50, label: 50 },
];

// COLUMNS IN TABLE

const checkIsShow = (hiddenColumns: ISelectOption[], currentValueL: string) => {

  return !hiddenColumns.find(({ value }) => value === currentValueL);
};

export const columnsTable = (hiddenColumns: ISelectOption[], sortBy?: ISelectOption[]) => [
  {
    accessor: 'item_extend' as const,
    // Cell: (rows: Row<UseExpandedRowProps<ITableRow>>) => {
    //   Cell: ({ row }: any) => (
    //   <span {...row.getToggleRowExpandedProps()}> {row.isExpanded ? '👇' : '👉'} </span>
    // ),
    show: checkIsShow(hiddenColumns, 'item_extend'),
  },
  {
    Header: 'Date of birth',
    accessor: 'item_date' as const,
    disableGlobalFilter: sortBy?.length && !sortBy?.find((val) => val.value === 'item_date'),
    show: checkIsShow(hiddenColumns, 'item_date'),
  },
  {
    Header: 'Number in table',
    accessor: 'item_number' as const,
    disableGlobalFilter: sortBy?.length && !sortBy?.find((val) => val.value === 'item_number'),
    show: checkIsShow(hiddenColumns, 'item_number'),
  },
  {
    Header: 'Name',
    accessor: 'item_string' as const,
    disableGlobalFilter: sortBy?.length && !sortBy?.find((val) => val.value === 'item_string'),
    show: checkIsShow(hiddenColumns, 'item_string'),
  },
];
