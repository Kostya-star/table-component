import { baseUrl } from 'api/baseUrl';
import { DownloadTableBtns } from 'components/DownloadTableBtns/DownloadTableBtns';
import { InputSearch } from 'components/InputSearch/InputSearch';
import { InputSelect } from 'components/InputSelect/InputSelect';
import { Pagination } from 'components/Pagination/Pagination';
import { TableBlock } from 'components/TableBlock/TableBlock';
import { columnsTable, pageSizeOptions, sortColumnsOptions, tableColumns } from 'helpers';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import { useEffect, useMemo, useRef, useState } from 'react';
import { downloadExcel } from 'react-export-table-to-excel';
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

const downloadPDF = (data: ITableRow[], columns: Array<Column<ITableRow>>) => {
  const doc = new JsPDF('portrait', 'pt', 'A4');

  // const head = [['Date of birth', 'Number in table', 'Name']];
  const head = [columns.slice(1).map((col) => col.Header as string)];
  const body = data.map((col) => [col.item_date, col.item_number, col.item_string]);

  const content = {
    startY: 50,
    head,
    body,
  };

  doc.setFontSize(15);
  doc.text('Table', 40, 40);
  doc.autoTable(content);
  doc.save('report.pdf');
};

const downloadXLS = (data: ITableRow[], columns: Array<Column<ITableRow>>) => {
  downloadExcel({
    fileName: 'table',
    sheet: 'table',
    tablePayload: {
      header: columns.slice(1).map((col) => col.Header as string),
      body: data.map((col) => [col.item_date, col.item_number, col.item_string]),
    },
  });
};

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
        } else {
          setServerError('oopppss! Some error occured!');
        }
        setIsLoading(false);
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

  const pageSizeSelectVal = pageSizeOptions.find((obj) => obj.value === pageSize);

  const onTableDownloadPDFHandler = () => {
    downloadPDF(data, columns as Array<Column<ITableRow>>);
  };

  const onTableDownloadExcelHandler = () => {
    downloadXLS(data, columns as Array<Column<ITableRow>>);
  };

  const tableRef = useRef(null);

  return (
    <div className="container">
      {isLoading ? <div className="table__loading">Loading, plase wait!</div> : null}
      {serverError ? <div className="table__loading">{serverError}</div> : null}
      {users?.length ? (
        <>
          <div className="table__header">
            <div className="table__header-group">
              <InputSelect
                onChangeSingle={(e) => setPageSize(e.value as number)}
                isMulti={false}
                name="pageSize"
                label="Rows in table: "
                options={pageSizeOptions}
                value={pageSizeSelectVal}
              />
              <InputSelect
                onChangeMulti={setHiddenColumns}
                isMulti={true}
                name="hideColumns"
                label="Hide columns: "
                options={tableColumns}
              />
            </div>
            <div className="table__header-group">
              <InputSelect
                onChangeMulti={setSortBy}
                isMulti={true}
                name="sortColumns"
                label="Search by: "
                options={sortColumnsOptions}
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
            tableRef={tableRef}
          />
          <div className="table__footer">
            <div className="table__footer-group">
              <DownloadTableBtns
                onTableDownloadExcelHandler={onTableDownloadExcelHandler}
                onTableDownloadPDFHandler={onTableDownloadPDFHandler}
              />
            </div>
            <div className="table__footer-group">
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
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
