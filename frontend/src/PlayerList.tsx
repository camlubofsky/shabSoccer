import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useState } from 'react';
import { Player } from './App';
import { PlayerLine } from './PlayerLine';
import { TeamButton } from './TeamButton';

type TList = {
  names: Array<Player>;
  onTeamSelect: any;
  onDelete: any;
};

export const PlayerList: React.FC<TList> = ({
  names,
  onTeamSelect,
  onDelete,
}) => {
  return (
    <Stack gap="16px" sx={{ marginTop: '30px', minWidth: '300px' }}>
      {names.map((name) => (
        <Stack gap="8px" flexDirection="row" key={name.value}>
          <PlayerLine
            name={name}
            onTeamSelect={onTeamSelect}
            onDelete={onDelete}
          />
        </Stack>
      ))}
    </Stack>
  );
};
