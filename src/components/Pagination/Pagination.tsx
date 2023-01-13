import { ChangeEvent, FC } from 'react';
import { Row } from 'react-table';
import { ITableRow } from 'types';
import s from './Pagination.module.scss';

interface IPaginationProps {
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageIndex: number;
  pageOptions: number[];
  pageCount: number;
  rows: Array<Row<ITableRow>>;
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
  gotoPage,
  goBack,
  goNext,
}) => {
  const onChangePageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
    gotoPage(pageNumber);
  };

  return (
    <div className={`${s.pagination} ${!rows.length && s.pagination_hidden}`}>
      <span>
        Page{' '}
        <strong>
          {/* {pageIndex + 1} of {pageOptions.length} */}
          <input
            type="number"
            // defaultValue={pageIndex + 1}
            value={pageIndex + 1}
            onChange={onChangePageHandler}
          />{' '}
          of {pageOptions.length}
        </strong>
      </span>
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
