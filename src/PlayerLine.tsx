import { Delete } from '@mui/icons-material';
import { useState } from 'react';
import { TeamButton } from './TeamButton';
import { Player } from './App';
import { dark } from '@mui/material/styles/createPalette';

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
  const [team, setTeam] = useState<'light' | 'dark' | null>(null);

  const lightHandler = (name: Player) => {
    onTeamSelect(name, 'light');
    setTeam('light');
  };

  const darkHandler = (name: Player) => {
    onTeamSelect(name, 'dark');
    setTeam('dark');
  };

  return (
    <>
      <Delete sx={{ cursor: 'pointer' }} onClick={() => onDelete(name)} />
      <div>{name.label}</div>
      <TeamButton
        selected={name.team === 'light'}
        team="light"
        onButtonClick={() => lightHandler(name)}
      />
      <TeamButton
        selected={name.team === 'dark'}
        team="dark"
        onButtonClick={() => darkHandler(name)}
      />
    </>
  );
};
