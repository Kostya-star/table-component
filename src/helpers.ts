export const tableColumns = [
  { value: 'item_extend', label: 'Details' },
  { value: 'item_date', label: 'Date of birth' },
  { value: 'item_number', label: 'Number in table' },
  { value: 'item_string', label: 'Name' },
];

export const sortColumnsOptions = tableColumns.filter((col) => col.value !== 'item_extend');

export const pageSizeOptions = [
  { value: 10, label: 10 },
  { value: 25, label: 25 },
  { value: 50, label: 50 },
];
