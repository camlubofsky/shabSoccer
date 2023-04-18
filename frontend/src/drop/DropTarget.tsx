import React from 'react';
import { useDrop } from 'react-dnd';

export const DropTarget: React.FC = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'chip',
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        border: '1px solid black',
        background: backgroundColor,
      }}
      ref={drop}
    >
      Drop here
    </div>
  );
};
