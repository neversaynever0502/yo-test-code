import React, { useState, useEffect } from 'react';
import CustomInputNumber from './CustomInputNumber';

const RoomAllocation = ({ guest, room, onChange }) => {
  const initialAllocation = () => {
    let allocation = [];
    for (let i = 0; i < room; i++) {
        allocation.push({ adult: 1, child: 0 });
    }
    return allocation;
  };

  const [allocations, setAllocations] = useState(initialAllocation());
  const [remainingGuests, setRemainingGuests] = useState(guest - room);

  const updateAllocation = (index, type, value) => {
    setAllocations(current => {
      const newAllocations = [...current];
      newAllocations[index][type] = value;
      onChange(newAllocations);
      return newAllocations;
    });
  };

  useEffect(() => {
    let totalAssigned = 0;
    for (const allocation of allocations) {
      totalAssigned += allocation.adult + allocation.child;
    }
    setRemainingGuests(guest - totalAssigned);
  }, [allocations, guest]);

  

  return (
    <div className="space-y-4 border-2 border-dashed border-gray-300 p-4 w-[500px]">
      <div className="text-lg">住客人數：{guest}人 / {room}房</div>
      <div className="bg-[#eefdff] border border-solid border-[#cbeef8] h-[60px] pl-4 p-2 rounded-md flex items-center text-gray-600">
        尚未分配人數：{remainingGuests}人
      </div>
      {allocations.map((allocation, index) => (
        <div key={index} className={`${index!=allocations.length-1?'border-b':''} p-2 rounded-md`}>
          <div className="text-lg mb-2">房間：{allocation.adult + allocation.child}人</div>
          <div className="flex justify-between items-center">
            {/* 大人 */}
            <div className="flex flex-col">
                <label className="text-sm font-medium">大人</label>
                <label className="text-sm font-medium text-gray-300">年齡20+</label>
            </div>
            <CustomInputNumber
              min={1}
              max={4 - allocation.child}
              step={1}
              name={`adult-${index}`}
              value={allocation.adult}
              onChange={(e) => {
                console.log('onChange:',e.target.name, e.target.value)
                updateAllocation(index, 'adult', Number(e.target.value))
              }}
              onBlur={(e) => console.log('onblur:',e.target.name, e.target.value)}
              incrementDisabled={remainingGuests <= 0 || allocation.adult + allocation.child >= 4}
              decrementDisabled={allocation.adult === 1}
              disabled={false}
              border={false}
            />
          </div>
          <div className="flex justify-between items-center">
            {/* 小孩 */}
            <label className="text-sm font-medium">小孩</label>
            <CustomInputNumber
              min={0}
              max={4 - allocation.adult}
              step={1}
              name={`child-${index}`}
              value={allocation.child}
              onChange={(e) => {
                console.log('onChange:',e.target.name, e.target.value)
                updateAllocation(index, 'child', Number(e.target.value))
              }}
              onBlur={(e) => console.log('onblur:',e.target.name, e.target.value)}
              incrementDisabled={remainingGuests <= 0 || allocation.adult + allocation.child >= 4}
              decrementDisabled={allocation.child === 0}
              disabled={false}  
              border={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomAllocation;
