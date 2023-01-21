import { ReactComponent as DownloadSVG } from 'assets/file-arrow-down-solid.svg';
import Jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FC } from 'react';
import { downloadExcel } from 'react-export-table-to-excel';
import { Column } from 'react-table';
import { ITableRow } from 'types';
import s from './DownloadBtns.module.scss';

const downloadPDF = (data: ITableRow[], columns: Array<Column<ITableRow>>) => {
  const doc = new Jspdf('portrait', 'pt', 'A4');

  const head = [columns.slice(1).map((col) => col.Header as string)];
  const body = data.map((col) => [col.item_date, col.item_number, col.item_string]);

  const content = {
    startY: 50,
    head,
    body,
  };

  doc.setFontSize(15);
  doc.text('Table', 40, 40);
  autoTable(doc, content);
  doc.save('table.pdf');
};

const downloadXLS = (data: ITableRow[], columns: Array<Column<ITableRow>>) => {
  downloadExcel({
    fileName: 'table',
    sheet: 'table',
    tablePayload: {
      header: columns.slice(1).map((col) => col.Header as string),
      body: data.map((col) => [col.item_date, col.item_number, col.item_string]),
    },
  });
};

interface IDownloadBtnsProps {
  data: ITableRow[];
  columns: Array<Column<ITableRow>>;
}

export const DownloadBtns: FC<IDownloadBtnsProps> = ({ data, columns }) => {
  const onDownloadPDF = () => {
    downloadPDF(data, columns);
  };

  const onDownloadXLS = () => {
    downloadXLS(data, columns);
  };

  return (
    <div className={s.downloadBtns}>
      <button onClick={() => onDownloadPDF()}>
        Download PDF <DownloadSVG />
      </button>
      <button onClick={() => onDownloadXLS()}>
        Download Excel <DownloadSVG />
      </button>
    </div>
  );
};
