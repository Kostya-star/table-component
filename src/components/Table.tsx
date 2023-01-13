import mock_data from 'api/Mock_data.json';
import 'components/table.scss';
import { useMemo, useState } from 'react';
import { useGlobalFilter, useSortBy, usePagination, useTable } from 'react-table';
import { ISelectOption } from 'types';
import { InputFilter } from './InputFilter/InputSearch';
import { InputSelect } from './InputSelect/InputSelect';
import { Paginations } from './Pagination/Paginations';


const optionsMulti = [
  { value: 'date', label: 'Date' },
  { value: 'number', label: 'Number' },
  { value: 'string', label: 'String' },
];


export const Table = () => {
  const [sortBy, setSortBy] = useState<ISelectOption[]>();
    
  const data = useMemo(() => mock_data, []);
  const columns = useMemo(() => [
    {
      Header: 'Date',
      accessor: 'item_date' as const,
      disableGlobalFilter: sortBy?.length && !sortBy?.find(val => val.value === 'date'),
    },
    {
      Header: 'Number',
      accessor: 'item_number' as const,
      disableGlobalFilter: sortBy?.length && !sortBy?.find(val => val.value === 'number'),
    },
    {
      Header: 'String',
      accessor: 'item_string' as const,
      disableGlobalFilter: sortBy?.length && !sortBy?.find(val => val.value === 'string'),
    },
  ], [sortBy]);

  const {
    headerGroups,
    rows,
    state,
    page,
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
          // value={sortBy?.find(val => val.value ===)}
          onChangeMulti={setSortBy}
          isMulti={true}
          name="multiSelect"
          label="Сортировать по: "
          options={optionsMulti}
        />
        <InputFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, ind) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={ind}>
              {headerGroup.headers.map((column, ind) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={ind}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ' 🔃'}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, ind) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={ind}>
                {row.cells.map((cell, ind) => {
                  return (
                    <td {...cell.getCellProps()} key={ind}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Paginations goBack={previousPage} goNext={nextPage}/>
    </div>
  );
};
