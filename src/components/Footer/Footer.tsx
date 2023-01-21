import { DownloadBtns } from 'components/DownloadBtns/DownloadBtns';
import { Pagination } from 'components/Pagination/Pagination';
import { FC } from 'react';
import { Column, HeaderGroup, Row } from 'react-table';
import { ITableRow } from 'types';
import s from './Footer.module.scss';

interface IFooterProps {
  pageCount: number;
  pageIndex: number;
  canNextPage: boolean;
  canPreviousPage: boolean;
  pageOptions: number[];
  headerGroups: Array<HeaderGroup<ITableRow>>;
  rows: Array<Row<ITableRow>>;
  data: ITableRow[];
  columns: Array<Column<ITableRow>>;
  goBack: () => void;
  goNext: () => void;
  gotoPage: (p: number) => void;
}

export const Footer: FC<IFooterProps> = ({
  canNextPage,
  canPreviousPage,
  pageIndex,
  pageOptions,
  pageCount,
  headerGroups,
  rows,
  data,
  columns,
  gotoPage,
  goNext,
  goBack,
}) => {
  return (
    <div className={s.footer}>
      <div className={s.footer_group}>
        <DownloadBtns data={data} columns={columns} />
      </div>
      <div className={s.footer_group}>
        <Pagination
          goBack={goBack}
          goNext={goNext}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          gotoPage={gotoPage}
          pageCount={pageCount}
          headerGroups={headerGroups}
          rows={rows}
        />
      </div>
    </div>
  );
};
