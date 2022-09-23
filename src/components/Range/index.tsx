import React, { ReactNode } from "react";

interface Props {
  label: string | ReactNode;
  value: number;
  min: number;
  max: number;
  onChange: (e) => void;
  onInput: (e) => void;
}

const Range = ({ value, label, min, max, onChange, onInput }: Props) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
      <input
        id="default-range"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        onInput={onInput}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
};
export default Range;
