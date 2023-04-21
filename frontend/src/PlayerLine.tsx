import { Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { TeamButton } from './TeamButton';
import { Player, Team } from './App';
import { changeTeam } from './utils/handlers';

type TPlayer = {
  name: Player;
  onTeamSelect?: any;
  onDelete: any;
};

export const PlayerLine: React.FC<TPlayer> = ({
  name,
  onDelete,
  onTeamSelect,
}) => {
  return (
    <>
      <Delete sx={{ cursor: 'pointer' }} onClick={() => onDelete(name)} />
      <div>{name.name}</div>
      <TeamButton
        selected={name.team === 'light'}
        team="light"
        onButtonClick={() => onTeamSelect(name, 'light')}
      />
      <TeamButton
        selected={name.team === 'dark'}
        team="dark"
        onButtonClick={() => onTeamSelect(name, 'dark')}
      />
    </>
  );
};
