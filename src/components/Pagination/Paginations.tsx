import { FC } from 'react';
import s from './Pagination.module.scss';

interface IPaginationsProps {
  canPreviousPage: boolean
  canNextPage: boolean
  goBack: () => void;
  goNext: () => void;
}

export const Paginations: FC<IPaginationsProps> = ({canPreviousPage, canNextPage, goBack, goNext }) => {
  return (
    <div className={s.pagination}>
      <button onClick={() => goBack()} disabled={!canPreviousPage}>◀️</button>
      <button onClick={() => goNext()} disabled={!canNextPage}>▶️</button>
    </div>
  );
};
