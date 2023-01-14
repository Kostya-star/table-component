import mock_data from 'api/Mock_data.json';
import { useMemo, useState } from 'react';
import { Column, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import 'scss/all.scss';
import { ISelectOption, ITableRow } from 'types';
import { columnsTable } from './columnsTable';
import { InputSearch } from './InputSearch/InputSearch';
import { InputSelect } from './InputSelect/InputSelect';
import { Pagination } from './Pagination/Pagination';
import { Table } from './Table/Table';

const optionsMulti = [
  { value: 'date', label: 'Date' },
  { value: 'number', label: 'Number' },
  { value: 'string', label: 'String' },
];
const optionsPageSize = [
  { value: 10, label: 10 },
  { value: 25, label: 25 },
  { value: 50, label: 50 },
];


export const TableComponent = () => {
  const [sortBy, setSortBy] = useState<ISelectOption[]>();

  const data = useMemo(() => mock_data, []);
  const columns = useMemo(() => columnsTable(sortBy), [sortBy]);

  const {
    headerGroups,
    rows,
    state,
    page,
    canNextPage,
    canPreviousPage,
    pageCount,
    pageOptions,
    setPageSize,
    gotoPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    prepareRow,
  } = useTable(
    {
      columns: columns as Array<Column<ITableRow>>,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  const pageSizeSelectVal = optionsPageSize.find((obj) => obj.value === pageSize)

  return (
    <div className="container">
      <div className="table__header">
        <InputSelect
          onChangeSingle={(e) => setPageSize(e.value as number)}
          isMulti={false}
          name="pageSizeSelect"
          label="Показывать страниц: "
          options={optionsPageSize}
          value={pageSizeSelectVal}
        />
      <div className="table__header__group">
        <InputSelect
          onChangeMulti={setSortBy}
          isMulti={true}
          name="sortByColumnsSelect"
          label="Сортировать по: "
          options={optionsMulti}
        />
        <InputSearch filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      </div>
      <Table
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        page={page}
        prepareRow={prepareRow}
      />
      <Pagination
        goBack={previousPage}
        goNext={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        gotoPage={gotoPage}
        pageCount={pageCount}
        rows={rows}
      />
    </div>
  );
};
