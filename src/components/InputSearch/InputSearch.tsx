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

  const onChangeHandle = (val: string) => {
    setValue(val);
    onChange(val);
  };

  return (
    <div className={s.container}>
      <span>
        <input value={value || ''} onChange={(e) => onChangeHandle(e.target.value)} placeholder="Поиск" />
        {
          value && <span onClick={() => onChangeHandle('')}>❌</span>
        }
      </span>
    </div>
  );
};
