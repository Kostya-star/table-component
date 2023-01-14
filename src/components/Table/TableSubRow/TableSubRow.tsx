import { FC } from 'react';
import { Row } from 'react-table';
import { ITableRow } from 'types';
import s from './TableSubRow.module.scss';

interface ITableSubRowProps {
  rowData: Row<ITableRow>;
}

export const TableSubRow: FC<ITableSubRowProps> = ({ rowData }) => {
  const {
    id,
    item_avatar: avatar,
    item_date: birthDate,
    item_number: numberInTable,
    item_string: name,
    item_email: email,
  } = rowData.original;

  return (
    <table className={s.subTable}>
      <tbody>
        <tr>
          <td>
            <span>Id:</span>
            {id}
          </td>
          <td>
            <span>Photo:</span>
            <img src={avatar} alt="avatar" />
          </td>
          <td>
            <span>Date of birth:</span>
            {birthDate}
          </td>
          <td>
            <span>Number in table:</span>
            {numberInTable}
          </td>
          <td>
            <span>Name:</span>
            {name}
          </td>
          <td>
            <span>Email:</span>
            {email}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
