import { FC } from 'react';
import { ColumnInstance, HeaderGroup, Row } from 'react-table';
import { ITableRow } from 'types';
import s from './Table.module.scss';
import { TableBody } from './TableBody/TableBody';
import { TableHead } from './TableHead/TableHead';

interface ITableProps {
  headerGroups: Array<HeaderGroup<ITableRow>>;
  page: Array<Row<ITableRow>>;
  visibleColumns: Array<ColumnInstance<ITableRow>>;
  getTableProps: () => void;
  getTableBodyProps: () => void;
  prepareRow: (row: Row<ITableRow>) => void;
}

export const Table: FC<ITableProps> = ({
  headerGroups,
  page,
  visibleColumns,
  getTableProps,
  getTableBodyProps,
  prepareRow,
}) => {
  return (
    <div className={s.table}>
      <table {...getTableProps}>
        <TableHead headerGroups={headerGroups} />

        <TableBody
          getTableBodyProps={getTableBodyProps}
          prepareRow={prepareRow}
          page={page}
          visibleColumns={visibleColumns}
        />
      </table>
    </div>
  );
};
