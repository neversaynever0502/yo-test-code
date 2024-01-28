import React from 'react';
import CustomInputNumber from './CustomInputNumber';
import RoomAllocation from './RoomAllocation'; // 引入RoomAllocation组件

const App = () => {
  const handleRoomAllocationChange = (result) => {
    console.log(result);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">CustomInputNumber：</h2>
        <CustomInputNumber
          min={0}
          max={10}
          step={1}
          name="custom-input"
          value={0}
          onChange={(e) => console.log('onChange:',e.target.name, e.target.value)}
          onBlur={(e) => console.log('onBlur:',e.target.name, e.target.value)}
          disabled={false}
          border={true}
        />
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Room Allocation:</h2>
        <RoomAllocation 
          guest={10}
          room={3}
          onChange={handleRoomAllocationChange}
        />
      </div>
    </div>
  );
};

export default App;
