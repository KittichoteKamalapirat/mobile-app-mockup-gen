import React, { ReactNode } from "react";

interface Props {
  label: string | ReactNode;
  value: number;
  min: number;
  max: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Range = ({ value = 0, label, min, max, onChange, onInput }: Props) => {
  return (
    <div className="flex items-center w-full">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>

      <div className="grid grid-cols-6 items-center gap-1">
        <input
          id="default-range"
          type="range"
          min={min}
          step={0.1}
          max={max}
          value={value}
          onChange={onChange}
          onInput={onInput}
          className="col-span-5 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <p className="cold-span-1 text-primary">
          {Math.round(value * 10) / 10}
        </p>
      </div>
    </div>
  );
};
export default Range;
