import React from "react";

interface Props {
  isDisabled: boolean;
  isChecked: boolean;
  onClick: () => void;
}

const Toggle = ({ isDisabled, isChecked, onClick }: Props) => {
  return (
    <label className="inline-flex relative items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        id="checked-toggle"
        className="sr-only peer"
        onChange={onClick}
        checked={isChecked}
        disabled={isDisabled}
      />
      {/* Change the color of the toggle component by updating the color classes of peer-focus and peer-checked. */}

      <div
        className="w-11 h-6 bg-gray-200 rounded-full peer 
        peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 
        dark:bg-gray-700 
       peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-green after:content-['']
        after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border 
        after:rounded-full after:h-5 after:w-5 after:transition-all
        dark:border-gray-600 "
      ></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        Transparent background
      </span>
    </label>
  );
};
export default Toggle;
