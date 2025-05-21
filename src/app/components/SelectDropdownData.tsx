import React from 'react';

interface OptionType {
  [key: string]: any;
}

interface SelectDropdownProps {
  options: OptionType[];
  valueKey: string;
  labelKey: string;
  secondKey?: string; // optional in case not needed
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  value?: string;
  placeholder?: string;
}

const SelectDropdownData: React.FC<SelectDropdownProps> = ({
  options,
  valueKey,
  labelKey,
  secondKey,
  onChange,
  name,
  value,
  placeholder,
}) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="bg-gray-200 text-gray-800 pl-12 py-2 md:py-4 focus:outline-none w-full rounded"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((item) => (
        <option key={item[valueKey]} value={item[valueKey]}>
          {secondKey
            ? `${item[labelKey]} - ${item[secondKey]}`
            : item[labelKey]}
        </option>
      ))}
    </select>
  );
};

export default SelectDropdownData;
