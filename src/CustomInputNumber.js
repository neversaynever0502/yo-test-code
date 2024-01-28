import React, { useState, useEffect } from 'react';

const CustomInputNumber = ({ min, max, step, name, value, onChange, onBlur, disabled, incrementDisabled, decrementDisabled, border }) => {
  const [inputValue, setInputValue] = useState(value);
  const [intervalId, setIntervalId] = useState(null);
  const [isTouch, setIsTouch] = useState(false); // 新增状态以区分触摸事件

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (newValue >= min && newValue <= max) {
      setInputValue(newValue);
      onChange(e);
    }
  };

  const createEvent = (name, value) => {
    return { target: { name, value } };
  };

  const handleStart = (increment, isTouchEvent) => {
    if (isTouchEvent) {
      setIsTouch(true);
    } else if (isTouch) {
      return;
    }

    const action = increment ? 1 : -1;
    const updateValue = (prevValue) => {
      const updatedValue = Math.min(max, Math.max(min, Number(prevValue) + step * action));
      onChange(createEvent(name, updatedValue.toString()));
      return updatedValue;
    };

    setInputValue(updateValue);

    const id = setInterval(() => {
      setInputValue(updateValue);
    }, 300);
    setIntervalId(id);
  };

  const handleEnd = (isTouchEvent) => {
    if (isTouchEvent) {
      setIsTouch(false);
    } else if (isTouch) {
      return;
    }

    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    // 可以在这里添加一些 useEffect 的逻辑，如果需要的话
  }, [inputValue]);

  return (
    <div className={`inline-flex ${border ? 'border-2 border-dashed border-gray-300' : ''} rounded p-[8px]`}>
      <button
        onMouseDown={() => handleStart(false, false)}
        onMouseUp={() => handleEnd(false)}
        onTouchStart={() => handleStart(false, true)}
        onTouchEnd={() => handleEnd(true)}
        disabled={decrementDisabled || disabled || inputValue <= min}
        className="w-12 h-12 mr-[8px] text-lg bg-white border border-[#14a0d2] text-[#14a0d2] disabled:opacity-50 rounded-md select-none"
      >
        -
      </button>
      <input
        type="number"
        className="w-12 h-12 mr-[8px] text-lg text-center border border-gray-400 flex items-center justify-center rounded-md"
        value={inputValue}
        onChange={handleInputChange}
        name={name}
        disabled={disabled}
      />
      <button
        onMouseDown={() => handleStart(true, false)}
        onMouseUp={() => handleEnd(false)}
        onTouchStart={() => handleStart(true, true)}
        onTouchEnd={() => handleEnd(true)}
        disabled={incrementDisabled || disabled || inputValue >= max}
        className="w-12 h-12 text-lg bg-white border border-[#14a0d2] text-[#14a0d2] disabled:opacity-50 rounded-md select-none"
      >
        +
      </button>
    </div>
  );
};

export default CustomInputNumber;
