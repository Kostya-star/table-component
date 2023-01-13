import { FC } from 'react';
import s from './Pagination.module.scss';

interface IPaginationsProps {
  goBack: () => void;
  goNext: () => void;
}

export const Paginations: FC<IPaginationsProps> = ({ goBack, goNext }) => {
  return (
    <div className={s.pagination}>
      <button onClick={() => goBack()}>◀️</button>
      <button onClick={() => goNext()}>▶️</button>
    </div>
  );
};
