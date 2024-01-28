import React, { useState } from 'react';

const CustomInputNumber = ({ min, max, step, name, value, onChange, onBlur, disabled }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    console.log(newValue)
    if (newValue >= min && newValue <= max) {
      setInputValue(newValue);
      onChange(e);
    }
  };

  const handleIncrement = () => {
    if (inputValue < max) {
      setInputValue(prevValue => Math.min(max, prevValue + step));
    }
  };

  const handleDecrement = () => {
    if (inputValue > min) {
      setInputValue(prevValue => Math.max(min, prevValue - step));
    }
  };

  const handleBlur = (e) => {
    onBlur(e);
  };

  return (
    <div className="inline-flex border-2 border-dashed border-gray-300 rounded p-[8px]">
      <button
        onClick={handleDecrement}
        disabled={disabled || inputValue <= min}
        className="w-12 h-12 mr-[8px] text-lg bg-white border border-[#14a0d2] text-[#14a0d2] disabled:opacity-50 rounded-md"
      >
        -
      </button>
      <input
        type="number"
        className="w-12 h-12 mr-[8px]  text-lg text-center border border-gray-400 flex items-center justify-center rounded-md"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        name={name}
        disabled={disabled}
      />
      <button
        onClick={handleIncrement}
        disabled={disabled || inputValue >= max}
        className="w-12 h-12 text-lg bg-white border border-[#14a0d2] text-[#14a0d2] disabled:opacity-50 rounded-md"
      >
        +
      </button>
    </div>
  );
};

export default CustomInputNumber;
