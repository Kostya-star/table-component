import { FC } from 'react';
import { Row } from 'react-table';
import { ITableRow } from 'types';
import s from './TableRowDetails.module.scss';

interface ITableRowDetailsProps {
  rowData: Row<ITableRow>;
}

export const TableRowDetails: FC<ITableRowDetailsProps> = ({ rowData }) => {
  const {
    id,
    item_avatar: avatar,
    item_date: birthDate,
    item_number: numberInTable,
    item_string: name,
    item_email: email,
  } = rowData.original;

  return (
    <table className={s.tableRow_details}>
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
