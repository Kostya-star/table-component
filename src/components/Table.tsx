import mock_data from 'api/Mock_data.json';
import { useMemo, useState } from 'react';
import {
  Column,
  Row,
  useExpanded,
  UseExpandedRowProps,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import 'scss/all.scss';
import { ISelectOption, ITableRow } from 'types';
import { InputSearch } from './InputSearch/InputSearch';
import { InputSelect } from './InputSelect/InputSelect';
import { Pagination } from './Pagination/Pagination';
import { TableBlock } from './TableBlock/TableBlock';

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

export const Table = () => {
  const [sortBy, setSortBy] = useState<ISelectOption[]>();

  const data = useMemo(() => mock_data, []);
  const columns = useMemo(
    () => [
      {
        Header: 'Date of birth',
        accessor: 'item_date' as const,
        disableGlobalFilter: sortBy?.length && !sortBy?.find((val) => val.value === 'date'),
        // Cell: (rows: Row<UseExpandedRowProps<ITableRow>>) => {
        Cell: ({ row }: any) => {
          return (
            <>
              <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? '👇' : '👉'}</span>{' '}
              {row.values.item_date}
            </>
          );
        },
      },
      {
        Header: 'Number in table',
        accessor: 'item_number' as const,
        disableGlobalFilter: sortBy?.length && !sortBy?.find((val) => val.value === 'number'),
      },
      {
        Header: 'Name',
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
    visibleColumns,
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
    useExpanded,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  const pageSizeSelectVal = optionsPageSize.find((obj) => obj.value === pageSize);

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
      <TableBlock
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        page={page}
        prepareRow={prepareRow}
        visibleColumns={visibleColumns}
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
