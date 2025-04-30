'use client';

import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFormInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
}

function SelectFormInput({
  value,
  onChange,
  options,
  placeholder = '--ជ្រើសរើស--',
}: SelectFormInputProps) {
  return (
    <div>
      <select
        value={value}
        onChange={onChange}
        className="bg-gray-200 text-gray-800 pl-12 py-2 md:py-4 focus:outline-none w-full rounded"
        required
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectFormInput;
