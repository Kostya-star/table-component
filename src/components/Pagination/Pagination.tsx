import { ChangeEvent, FC } from 'react';
import { HeaderGroup, Row } from 'react-table';
import { ITableRow } from 'types';
import s from './Pagination.module.scss';
import { ReactComponent as GoBack } from 'assets/goback.svg';
import { ReactComponent as GoStart } from 'assets/gostart.svg';
import { ReactComponent as GoNext } from 'assets/gonext.svg';
import { ReactComponent as GoEnd } from 'assets/goend.svg';

interface IPaginationProps {
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageIndex: number;
  pageOptions: number[];
  pageCount: number;
  rows: Array<Row<ITableRow>>;
  headerGroups: Array<HeaderGroup<ITableRow>>;
  goBack: () => void;
  goNext: () => void;
  gotoPage: (p: number) => void;
}

export const Pagination: FC<IPaginationProps> = ({
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageOptions,
  pageCount,
  rows,
  headerGroups,
  gotoPage,
  goBack,
  goNext,
}) => {
  return (
    <div
      className={`${s.pagination} ${(!rows.length || !headerGroups.length) && s.pagination_hidden}`}
    >
      <div>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>
      </div>
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        <GoStart />
      </button>
      <button onClick={() => goBack()} disabled={!canPreviousPage}>
        <GoBack />
      </button>
      <button onClick={() => goNext()} disabled={!canNextPage}>
        <GoNext />
      </button>
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        <GoEnd />
      </button>
    </div>
  );
};
