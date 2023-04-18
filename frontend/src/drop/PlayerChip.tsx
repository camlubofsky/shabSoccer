import React from 'react';
import { Chip } from '@mui/material';
import { useDrag } from 'react-dnd';

type TPlayerChip = {
  name: string;
  id: string;
};

const styleProps = {
  background: 'grey',
  color: 'white',
  borderRadius: '4px',
};

const itemTypes = {
  CHIP: 'chip',
};

interface DropResult {
  name: string;
  id: string;
}

export const PlayerChip: React.FC<TPlayerChip> = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: itemTypes.CHIP,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return <Chip ref={drag} label={name} sx={styleProps} />;
};
