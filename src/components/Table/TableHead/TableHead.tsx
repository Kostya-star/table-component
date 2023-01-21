import { FC } from 'react';
import { ITableRow } from 'types';
import { HeaderGroup } from 'react-table';
import s from './TableHead.module.scss';

interface ITableHeadProps {
  headerGroups: Array<HeaderGroup<ITableRow>>;
}

export const TableHead: FC<ITableHeadProps> = ({ headerGroups }) => {
  return (
    <thead>
      {headerGroups.map((headerGroup, ind) => (
        <tr {...headerGroup.getHeaderGroupProps()} key={ind}>
          {headerGroup.headers.map((column, ind) => {
            return (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} title="" key={ind}>
                <p>
                  {column.render('Header')}
                  {column.id === 'item_extend' ? null : (
                    <span className={s.header__emoji}>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ' 🔃'}
                    </span>
                  )}
                  <span>{column.render('Header')}</span>
                </p>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};
