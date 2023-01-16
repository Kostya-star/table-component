import { ISelectOption } from 'types';

export const columnsTable = (hiddenColumns: ISelectOption[], sortBy?: ISelectOption[]) => [
  {
    accessor: 'item_extend' as const,
    Cell: ({ row }: any) => (
      <span {...row.getToggleRowExpandedProps({ title: undefined })}>
        {row.isExpanded ? '👇' : '👉'}
      </span>
    ),
    show: !hiddenColumns.find((col) => col.value === 'item_extend'),
  },
  {
    // Cell: (rows: Row<UseExpandedRowProps<ITableRow>>) => {
    Header: 'Date of birth',
    accessor: 'item_date' as const,
    disableGlobalFilter: sortBy?.length && !sortBy?.find((val) => val.value === 'item_date'),
    show: !hiddenColumns.find((col) => col.value === 'item_date'),
  },
  {
    Header: 'Number in table',
    accessor: 'item_number' as const,
    disableGlobalFilter: sortBy?.length && !sortBy?.find((val) => val.value === 'item_number'),
    show: !hiddenColumns.find((col) => col.value === 'item_number'),
  },
  {
    Header: 'Name',
    accessor: 'item_string' as const,
    disableGlobalFilter: sortBy?.length && !sortBy?.find((val) => val.value === 'item_string'),
    show: !hiddenColumns.find((col) => col.value === 'item_string'),
  },
];
