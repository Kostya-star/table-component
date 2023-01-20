import { FC } from 'react';
import s from './DownloadTableBtns.module.scss';
import { ReactComponent as DownloadSVG } from 'assets/file-arrow-down-solid.svg';

interface IDownloadTableBtnsProps {
  onTableDownloadPDFHandler: () => void;
  onTableDownloadExcelHandler: () => void;
}

export const DownloadTableBtns: FC<IDownloadTableBtnsProps> = ({
  onTableDownloadPDFHandler,
  onTableDownloadExcelHandler,
}) => {
  return (
    <div className={s.downloadBtns}>
      <button onClick={() => onTableDownloadPDFHandler()}>
        Download PDF <DownloadSVG />
      </button>
      <button onClick={() => onTableDownloadExcelHandler()}>
        Download Excel <DownloadSVG />
      </button>
    </div>
  );
};
