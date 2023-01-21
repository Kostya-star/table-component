import { InputSearch } from 'components/InputSearch/InputSearch';
import { InputSelect } from 'components/InputSelect/InputSelect';
import { pageSizeOptions, sortColumnsOptions, tableColumns } from 'helpers';
import { FC } from 'react';
import { ISelectOption } from 'types';
import s from './Header.module.scss';

interface IHeaderProps {
  pageSize: number;
  globalFilter: string;
  setPageSize: (val: number) => void;
  setHiddenColumns: (val: ISelectOption[]) => void;
  setSortBy: (val: ISelectOption[]) => void;
  setGlobalFilter: (val: string) => void;
}

export const Header: FC<IHeaderProps> = ({
  pageSize,
  globalFilter,
  setPageSize,
  setHiddenColumns,
  setSortBy,
  setGlobalFilter,
}) => {
  const pageSizeSelectVal = pageSizeOptions.find((obj) => obj.value === pageSize);

  return (
    <div className={s.header}>
      <div className={s.header_group}>
        <InputSelect
          onChangeSingle={(e) => setPageSize(e.value as number)}
          name="pageSize"
          label="Rows in table: "
          options={pageSizeOptions}
          value={pageSizeSelectVal}
        />
        <InputSelect
          onChangeMulti={setHiddenColumns}
          isMulti
          name="hideColumns"
          label="Hide columns: "
          options={tableColumns}
        />
      </div>
      <div className={s.header_group}>
        <InputSelect
          onChangeMulti={setSortBy}
          isMulti
          name="sortColumns"
          label="Search by: "
          options={sortColumnsOptions}
        />
        <InputSearch filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
    </div>
  );
};
