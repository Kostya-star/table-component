import { FC, Fragment } from 'react';
import { ColumnInstance, Row } from 'react-table';
import { ITableRow } from 'types';
import { TableRowDetails } from './TableRowDetails/TableRowDetails';
import './TableBody.module.scss';

interface ITableBodyProps {
  page: Array<Row<ITableRow>>;
  getTableBodyProps: () => void;
  prepareRow: (row: Row<ITableRow>) => void;
  visibleColumns: Array<ColumnInstance<ITableRow>>;
}

export const TableBody: FC<ITableBodyProps> = ({
  page,
  visibleColumns,
  getTableBodyProps,
  prepareRow,
}) => {
  return (
    <tbody {...getTableBodyProps}>
      {page.map((row, ind) => {
        prepareRow(row);
        return (
          <Fragment {...row.getRowProps} key={ind}>
            <tr style={{ border: '1px solid red' }}>
              {row.cells.map((cell, ind) => {
                return (
                  <td {...cell.getCellProps()} key={ind}>
                    <p>
                      {cell.render('Cell')}
                      {cell.column.id === 'item_extend' ? (
                        <i {...row.getToggleRowExpandedProps()}>{row.isExpanded ? '👇' : '👉'}</i>
                      ) : null}
                      
                      {cell.column.id !== 'item_extend' ? <span>{cell.render('Cell')}</span> : null}
                    </p>
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
  );
};
