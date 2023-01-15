import { FC, Fragment } from 'react';
import { ColumnInstance, HeaderGroup, Row } from 'react-table';
import { ITableRow } from 'types';
import s from './TableBlock.module.scss';
import { TableRowDetails } from './TableRowDetails/TableRowDetails';

interface ITableBlockProps {
  headerGroups: Array<HeaderGroup<ITableRow>>;
  page: Array<Row<ITableRow>>;
  visibleColumns: Array<ColumnInstance<ITableRow>>;
  getTableProps: () => void;
  getTableBodyProps: () => void;
  prepareRow: (row: Row<ITableRow>) => void;
}

export const TableBlock: FC<ITableBlockProps> = ({
  headerGroups,
  page,
  visibleColumns,
  getTableProps,
  getTableBodyProps,
  prepareRow,
}) => {
  return (
    <table {...getTableProps} className={s.table}>
      <thead>
        {headerGroups.map((headerGroup, ind) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={ind}>
            {headerGroup.headers.map((column, ind) => {
              return (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={ind}>
                  {column.render('Header')}
                  {column.id === 'item_extend' ? null : (
                    <span className={s.table__header__emoji}>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ' 🔃'}
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps}>
        {page.map((row, ind) => {
          prepareRow(row);
          return (
            <Fragment {...row.getRowProps} key={ind}>
              <tr>
                {row.cells.map((cell, ind) => {
                  return (
                    <td {...cell.getCellProps()} key={ind}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
              {row.isExpanded ? (
                <tr>
                  <td colSpan={visibleColumns.length} style={{ backgroundColor: '#ddd' }}>
                    <TableRowDetails rowData={row} />
                  </td>
                </tr>
              ) : null}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};
