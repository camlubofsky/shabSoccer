import { Delete } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import { Player } from './App';

type TTeamLine = {
  player: Player;
  onDelete: any;
};
export const TeamLine: React.FC<TTeamLine> = ({ player, onDelete }) => {
  const boxStyle = {
    width: '240px',
    height: '50px',
    border: '1px solid lightgrey',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingX: '10px',
    justifyContent: 'space-between',
  };

  return (
    <Stack sx={boxStyle}>
      <div>{player.name + player.tier}</div>
      <Delete
        sx={{ cursor: 'pointer' }}
        onClick={() => onDelete(player, null)}
      />
    </Stack>
  );
};
