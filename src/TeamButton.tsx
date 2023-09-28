import { Button } from '@mui/material';
import React from 'react';

type TTeamButton = {
  team: 'light' | 'dark';
  onButtonClick: any;
  selected: boolean;
};
export const TeamButton: React.FC<TTeamButton> = ({
  team,
  onButtonClick,
  selected,
}) => {
  const buttonStyle = {
    maxWidth: '20px',
    minWidth: '20px',
    height: '20px',
    borderWidth: '1px',
    borderColor: selected ? 'red' : 'black',
    borderStyle: 'solid',
    borderRadius: '4px',
    background: team === 'dark' ? 'black' : 'white',
    '&:hover': {
      background: 'grey',
    },
  };

  return <Button sx={buttonStyle} onClick={onButtonClick}></Button>;
};
