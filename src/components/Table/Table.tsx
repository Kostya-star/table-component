import { FC } from 'react';
import { HeaderGroup, Row } from 'react-table';
import { ITableRow } from 'types';
import s from './Table.module.scss';

interface ITableProps {
  getTableProps: () => void;
  headerGroups: Array<HeaderGroup<ITableRow>>;
  getTableBodyProps: () => void;
  page: Array<Row<ITableRow>>;
  prepareRow: (row: Row<ITableRow>) => void;
}

export const Table: FC<ITableProps> = ({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  page,
  prepareRow,
}) => {
  return (
    <table {...getTableProps} className={s}>
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
      <tbody {...getTableBodyProps}>
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
  );
};
