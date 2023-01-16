import { baseUrl } from 'api/baseUrl';
import { InputSearch } from 'components/InputSearch/InputSearch';
import { InputSelect } from 'components/InputSelect/InputSelect';
import { Pagination } from 'components/Pagination/Pagination';
import { TableBlock } from 'components/TableBlock/TableBlock';
import { columnsTable, pageSizeOptions, sortColumnsOptions, tableColumns } from 'helpers';
import { useEffect, useMemo, useState } from 'react';
import {
  Column,
  useExpanded,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import 'scss/all.scss';
import { ISelectOption, ITableRow } from 'types';

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
  const columns = useMemo(() => columnsTable(hiddenColumns, sortBy), [hiddenColumns, sortBy]);

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
