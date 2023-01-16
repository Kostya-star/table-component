import { ChangeEvent, FC } from 'react';
import { HeaderGroup, Row } from 'react-table';
import { ITableRow } from 'types';
import s from './Pagination.module.scss';

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
  const onChangePageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
    gotoPage(pageNumber);
  };

  return (
    <div
      className={`${s.pagination} ${(!rows.length || !headerGroups.length) && s.pagination_hidden}`}
    >
      <div>
        Page{' '}
        <strong>
          <input type="number" value={pageIndex + 1} onChange={onChangePageHandler} /> of{' '}
          {pageOptions.length}
        </strong>
      </div>
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        ⏪
      </button>
      <button onClick={() => goBack()} disabled={!canPreviousPage}>
        ◀️
      </button>
      <button onClick={() => goNext()} disabled={!canNextPage}>
        ▶️
      </button>
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        ⏩
      </button>
    </div>
  );
};
