import { ChangeEvent, FC, useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import s from './InputSearch.module.scss';

interface InputFilterProps {
  filter: string;
  setFilter: (val: string) => void;
}

export const InputSearch: FC<InputFilterProps> = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value: string) => {
      setFilter(value || '');
  }, 1000);

  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={s.container}>
      <span>
        <input value={value || ''} onChange={onChangeHandle} placeholder="Поиск" />
      </span>
    </div>
  );
};
