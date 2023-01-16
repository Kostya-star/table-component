import { FC } from 'react';
import Select, { StylesConfig } from 'react-select';
import { ISelectOption } from 'types';
import s from './InputSelect.module.scss';

interface InputSelectProps {
  isMulti: boolean;
  name: string;
  label: string;
  options: ISelectOption[];
  value?: ISelectOption;
  onChangeSingle?: (val: ISelectOption) => void;
  onChangeMulti?: (val: ISelectOption[]) => void;
}

export const InputSelect: FC<InputSelectProps> = ({
  isMulti,
  name,
  label,
  options,
  value,
  onChangeSingle,
  onChangeMulti,
}) => {
  const IsMulti = isMulti;

  const classNames: StylesConfig<ISelectOption | ISelectOption[], typeof IsMulti> = {
    control: (baseStyles) => ({
      ...baseStyles,
      color: '#707070',
      height: '40px',
      backgroundColor: '#F6F6F6',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: 'none',
      transition: '0.2s',
      '&:hover': {
        backgroundColor: '#D1D1D1',
        border: 'none',
      },
      '&:focus': {
        background: '#F6F6F6',
        boxShadow: '0px 0px 5px #D9D9D9',
        border: 'none',
      },
      cursor: 'pointer',
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '#C60E2E' : 'white',
      fontWeight: '500',
      color: state.isSelected ? 'white' : '#9C9C9C',
      transition: '0.2s',
      '&:hover': {
        backgroundColor: '#FF768E',
        color: 'white',
      },
    }),
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      color: 'inherit',
    }),
    loadingIndicator: (baseStyles) => ({
      ...baseStyles,
      color: 'inherit',
    }),
    clearIndicator: (baseStyles) => ({
      ...baseStyles,
      color: 'inherit',
    }),
    valueContainer: (baseStyles, state) => ({
      ...baseStyles,
      flexWrap: 'nowrap',
    }),
    multiValue: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: '#E4163A',
      borderRadius: '4px',
      color: 'white',
      minWidth: '25%',
      display: 'flex',
      justifyContent: 'space-between',
    }),
    multiValueLabel: (baseStyles) => ({
      ...baseStyles,
      color: 'white',
      fontSize: '15px',
      lineHeight: '19px',
      fontFamily: 'Avenir, sans-serif',
    }),
    multiValueRemove: (baseStyles) => ({
      ...baseStyles,
    }),
  };

  const setOnChange = (option: any) => {
    if (option) {
      if (IsMulti && onChangeMulti) {
        onChangeMulti(option);
      } else if (onChangeSingle) {
        onChangeSingle(option);
      }
    }
  };

  return (
    <div className={s.select}>
      <label>{label}</label>
      <Select
        options={options}
        styles={classNames}
        name={name}
        value={value}
        isMulti={IsMulti}
        isSearchable={false}
        hideSelectedOptions={false}
        closeMenuOnSelect={!IsMulti}
        onChange={setOnChange}
      />
    </div>
  );
};
