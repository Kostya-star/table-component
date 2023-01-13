import mock_data from 'api/Mock_data.json';
import { useMemo, useState } from 'react';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import 'scss/all.scss';
import { ISelectOption } from 'types';
import { InputFilter } from './InputFilter/InputSearch';
import { InputSelect } from './InputSelect/InputSelect';
import { Paginations } from './Pagination/Paginations';
import { Table } from './Table/Table';

const optionsMulti = [
  { value: 'date', label: 'Date' },
  { value: 'number', label: 'Number' },
  { value: 'string', label: 'String' },
];

export const TableComponent = () => {
  const [sortBy, setSortBy] = useState<ISelectOption[]>();

  const data = useMemo(() => mock_data, []);
  const columns = useMemo(
    () => [
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
    ],
    [sortBy]
  );

  const {
    headerGroups,
    rows,
    state,
    page,
    canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    prepareRow,
  } = useTable(
    {
      // @ts-expect-error
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;

  return (
    <div className="container">
      <div className="header__group">
        <InputSelect
          onChangeMulti={setSortBy}
          isMulti={true}
          name="multiSelect"
          label="Сортировать по: "
          options={optionsMulti}
        />
        <InputFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <Table
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        page={page}
        prepareRow={prepareRow}
      />
      <Paginations goBack={previousPage} goNext={nextPage} canPreviousPage={canPreviousPage} canNextPage={canNextPage}/>
    </div>
  );
};
