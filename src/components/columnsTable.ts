import { ISelectOption } from 'types';

export const columnsTable = (sortBy?: ISelectOption[]) => [
  {
    Header: 'Date',
    accessor: 'item_date' as const,
    disableGlobalFilter: sortBy?.length && !sortBy?.find((val) => val.value === 'date'),
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
