import { baseUrl } from 'api/baseUrl';
import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { Table } from 'components/Table/Table';
import { columnsTable } from 'helpers';
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

export const Main = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isServerError, setServerError] = useState(false);
  const [sortBy, setSortBy] = useState<ISelectOption[]>();
  const [hiddenColumns, setHiddenColumns] = useState<ISelectOption[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      void fetch(`${baseUrl}table`).then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : null;

        if (response.ok) {
          setUsers(data);
        } else {
          setServerError(true);
        }
        setLoading(false);
      });
    };
    void fetchData();
  }, []);

  const data: ITableRow[] = useMemo(() => users, [users]);
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

  return (
    <div className="container">
      {isLoading ? <div className="loading">Loading, plase wait!</div> : null}
      {isServerError ? <div className="loading">Ooopss, something went wrong!</div> : null}
      {users?.length ? (
        <>
          <Header
            globalFilter={globalFilter}
            pageSize={pageSize}
            setPageSize={setPageSize}
            setHiddenColumns={setHiddenColumns}
            setSortBy={setSortBy}
            setGlobalFilter={setGlobalFilter}
          />
          <Table
            getTableProps={getTableProps}
            headerGroups={headerGroups}
            getTableBodyProps={getTableBodyProps}
            page={page}
            prepareRow={prepareRow}
            visibleColumns={visibleColumns}
          />
          <Footer
            pageCount={pageCount}
            pageOptions={pageOptions}
            pageIndex={pageIndex}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            headerGroups={headerGroups}
            rows={rows}
            data={data}
            columns={columns as Array<Column<ITableRow>>}
            goBack={previousPage}
            goNext={nextPage}
            gotoPage={gotoPage}
          />
        </>
      ) : null}
    </div>
  );
};
