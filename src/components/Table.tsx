import mock_data from 'api/Mock_data.json';
import 'components/table.scss';
import { memo, useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';
import { COLUMNS } from './columns';

export const Table = () => {

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => mock_data, []);
  
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
      {
        columns,
        data,
      },
      useSortBy
    );
  
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, ind) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={ind}>
              {headerGroup.headers.map((column, ind) => (
                <th {...column.getHeaderProps(column?.getSortByToggleProps())} key={ind}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ' 🔃'}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, ind) => {
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
    );
  }

