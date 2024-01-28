import React, { useState,useEffect } from 'react';

const CustomInputNumber = ({ min, max, step, name, value, onChange, onBlur, disabled, incrementDisabled, decrementDisabled, border }) => {
  const [inputValue, setInputValue] = useState(value);
  const [intervalId, setIntervalId] = useState(null);

  

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    // console.log('handleInputChange:',newValue)

    if (newValue >= min && newValue <= max) {
      setInputValue(newValue);
      onChange(e);
    }
  };

  const createEvent = (name, value) => {
    return { target: { name, value } };
  };


  const handleIncrement = () => {
    if (inputValue < max) {
      const newValue = Math.min(max, Number(inputValue) + step);
      setInputValue(newValue);
      // 為了讓onChange事件能夠觸發，我們需要手動創建一個事件對象
      onChange(createEvent(name, newValue.toString()));
      const id = setInterval(() => {
        setInputValue(prevValue => {
          const updatedValue = Math.min(max, Number(prevValue) + step);
          if (Number(prevValue) < max) {
            onChange(createEvent(name, updatedValue.toString()));
            return updatedValue;
          } else {
            clearInterval(id);
            setIntervalId(null);
            return prevValue;
          }
        });
      }, 300); 
      setIntervalId(id);
    }
  };
  
  const handleDecrement = () => {
    if (inputValue > min) {
      const newValue = Math.max(min, Number(inputValue) - step);
      setInputValue(newValue);
      // 為了讓onChange事件能夠觸發，我們需要手動創建一個事件對象
      onChange(createEvent(name, newValue.toString()));
      const id = setInterval(() => {
        setInputValue(prevValue => {
          const updatedValue = Math.max(min, Number(prevValue) - step);
          if (Number(prevValue) > min) {
            onChange(createEvent(name, updatedValue.toString()));
            return updatedValue;
          } else {
            clearInterval(id);
            setIntervalId(null);
            return prevValue;
          }
        });
      }, 300);
      setIntervalId(id);
    }
  };

  useEffect(()=>{
    console.log('inputValue:',inputValue,max)
    // setInputValue(value)
  },[
    inputValue
  ])


  const handleIncrementRelease = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleDecrementRelease = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleBlur = (e) => {
    // console.log('handleBlur:',e.target)
    if(e&&e.target&&e.target.value){
      onBlur(e);
    }
  };

  return (
    <div className={`inline-flex ${border?'border-2 border-dashed border-gray-300':''} rounded p-[8px]`} onBlur={handleBlur}>
      <button
        onMouseDown={handleDecrement}
        onMouseUp={handleDecrementRelease}
        onTouchStart={handleDecrement}
        onTouchEnd={handleDecrementRelease}     
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
        onMouseDown={handleIncrement}
        onMouseUp={handleIncrementRelease}
        onTouchStart={handleIncrement} 
        onTouchEnd={handleIncrementRelease} 
        disabled={incrementDisabled || disabled || inputValue >= max} 
        className="w-12 h-12 text-lg bg-white border border-[#14a0d2] text-[#14a0d2] disabled:opacity-50 rounded-md select-none"
      >
        +
      </button>
    </div>
  );
};

export default CustomInputNumber;
