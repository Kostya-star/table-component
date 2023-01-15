import { useMemo, useState, useEffect } from 'react';
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
import axios from 'axios';
import { baseUrl } from './../api/baseUrl';

const tableColumns = [
  { value: 'item_extend', label: 'Details' },
  { value: 'item_date', label: 'Date of birth' },
  { value: 'item_number', label: 'Number in table' },
  { value: 'item_string', label: 'Name' },
];

const sortColumnsOptions = tableColumns.filter((col) => col.value !== 'item_extend');

const pageSizeOptions = [
  { value: 10, label: 10 },
  { value: 25, label: 25 },
  { value: 50, label: 50 },
];

export const Table = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [sortBy, setSortBy] = useState<ISelectOption[]>();
  const [hiddenColumns, setHiddenColumns] = useState<ISelectOption[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      void fetch(`${baseUrl}table`).then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : null;

        if (response.ok) {
          setUsers(data);
          setIsLoading(false);
        } else {
          setServerError('oopppss! Some error occured!');
          setIsLoading(false);
        }
      });
    };
    void fetchData();
  }, []);

  const data = useMemo(() => users, [users]);
  const columns = useMemo(
    () => [
      {
        accessor: 'item_extend' as const,
        Cell: ({ row }: any) => (
          <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? '👇' : '👉'}</span>
        ),
        show: !hiddenColumns.find((col) => col.value === 'item_extend'),
        // tipText: <span>{rows.values.name}</span>
        tipText: "Text for the Last Name tooltip"
      },
      {
        // Cell: (rows: Row<UseExpandedRowProps<ITableRow>>) => {
        Header: 'Date of birth',
        accessor: 'item_date' as const,
        disableGlobalFilter: sortBy?.length && !sortBy?.find((val) => val.value === 'item_date'),
        show: !hiddenColumns.find((col) => col.value === 'item_date'),
        // tipText: <span>{rows.values.name}</span>
        tipText: "Text for the Last Name tooltip"
      },
      {
        Header: 'Number in table',
        accessor: 'item_number' as const,
        disableGlobalFilter: sortBy?.length && !sortBy?.find((val) => val.value === 'item_number'),
        show: !hiddenColumns.find((col) => col.value === 'item_number'),
        // tipText: <span>{rows.values.name}</span>
        tipText: "Text for the Last Name tooltip"
      },
      {
        Header: 'Name',
        accessor: 'item_string' as const,
        disableGlobalFilter: sortBy?.length && !sortBy?.find((val) => val.value === 'item_string'),
        show: !hiddenColumns.find((col) => col.value === 'item_string'),
        // tipText: <span>{rows.values.name}</span>
        tipText: "Text for the Last Name tooltip"
      },
    ],
    [hiddenColumns, sortBy]
  );
  
  
  const initialState = {
    hiddenColumns: columns.filter((column) => !column.show).map((column) => column.accessor),
  };
  
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
      initialState,
    },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
    );

    // console.log(rows.values.name);
    
    const { globalFilter, pageIndex, pageSize } = state;

  const pageSizeSelectVal = pageSizeOptions.find((obj) => obj.value === pageSize);

  return (
    <div className="container">
      {!users.length ? (
        (isLoading && <div className="table__loading">Loading, plase wait!</div>) ||
        (serverError && <div className="table__loading">{serverError}</div>)
      ) : (
        <>
          <div className="table__header">
            <InputSelect
              onChangeSingle={(e) => setPageSize(e.value as number)}
              isMulti={false}
              name="pageSize"
              label="Показывать страниц: "
              options={pageSizeOptions}
              value={pageSizeSelectVal}
            />
            <InputSelect
              onChangeMulti={setHiddenColumns}
              isMulti={true}
              name="hideColumns"
              label="Скрыть колонки: "
              options={tableColumns}
            />
            <InputSelect
              onChangeMulti={setSortBy}
              isMulti={true}
              name="sortColumns"
              label="Сортировать по: "
              options={sortColumnsOptions}
            />
            <InputSearch filter={globalFilter} setFilter={setGlobalFilter} />
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
            headerGroups={headerGroups}
            rows={rows}
          />
        </>
      )}
    </div>
  );
};
