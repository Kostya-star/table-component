import { ISelectOption } from 'types';
import { Fragment } from 'react';

export const columnsTable = (sortBy?: ISelectOption[]) => [
  {
    Header: 'Date',
    accessor: 'item_date' as const,
    disableGlobalFilter: sortBy?.length && !sortBy?.find((val) => val.value === 'date'),
    // Cell: (rows: Row<UseExpandedRowProps<ITableRow>>) => {
    // Cell: ({ row }: any) => {
    //   return (
    //     <Fragmen>
    //       <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? '👇' : '👉'}</span>{' '}
    //       {row.values.item_date}
    //     </Fragmen>
    //   );
    // }
  },
  {
    Header: 'Number',
    accessor: 'item_number' as const,
    disableGlobalFilter: sortBy?.length && !sortBy?.find((val) => val.value === 'number'),
  },
  {
    Header: 'String',
    accessor: 'item_string' as const,
    disableGlobalFilter: sortBy?.length && !sortBy?.find((val) => val.value === 'string'),
  },
];
