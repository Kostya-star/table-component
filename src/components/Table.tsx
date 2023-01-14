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
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [sortBy, setSortBy] = useState<ISelectOption[]>();

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
          // const error = data?.message || response.status;
          // return await Promise.reject(error);
        }
      });
      // .catch((error) => {
      //   console.error('There was an error!', error);
      //   setIsLoading(false);
      //   return setServerError('Server error');
      // });
    };
    void fetchData();
  }, []);

  const data = useMemo(() => users, [users]);
  const columns = useMemo(
    () => [
      {
        id: 'extandable',
        Cell: ({row} : any) => (
          <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? '👇' : '👉'}</span>
        )
      },
      {
        Header: 'Date of birth',
        accessor: 'item_date' as const,
        disableGlobalFilter: sortBy?.length && !sortBy?.find((val) => val.value === 'date'),
        // Cell: (rows: Row<UseExpandedRowProps<ITableRow>>) => {
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
    allColumns,
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
    getToggleHideAllColumnsProps
  } = useTable(
    {
      columns: columns as Array<Column<ITableRow>>,
      data,
      initialState: {
        // hiddenColumns: ['item_date']
      },
    },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  const pageSizeSelectVal = optionsPageSize.find((obj) => obj.value === pageSize);
console.log(allColumns);

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
        </>
      )}
    </div>
  );
};
