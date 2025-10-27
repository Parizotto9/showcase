import React, { useState } from 'react';

interface CheckboxProps {
  id: string;
  checked?: boolean;
  onChange?: (id: string, checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked = false,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-center h-full">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          onChange(id, e.target.checked);
        }}
        className="w-4 h-4 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
    </div>
  );
};
export default Checkbox;