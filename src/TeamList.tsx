import { Stack, Button, Typography } from '@mui/material';
import { Player } from './App';
import { TeamButton } from './TeamButton';
import { Delete } from '@mui/icons-material';
import { TeamLine } from './TeamLine';

type TTeamList = {
  players: Array<Player>;
  color: 'light' | 'dark';
  onDelete: any;
};

export const TeamList: React.FC<TTeamList> = ({ players, color, onDelete }) => {
  const listStyle = {
    marginTop: '30px',
    width: '260px',
    border: '1px solid lightgrey',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',

    // alignItems: 'center',
  };

  const title = color.charAt(0).toUpperCase() + color.slice(1);
  return (
    <Stack gap="16px" sx={listStyle}>
      <Typography sx={{ textAlign: 'center' }} variant="h5">
        {title}
      </Typography>
      {players.map((player) => (
        <Stack gap="8px" flexDirection="row" key={player.value}>
          <TeamLine player={player} onDelete={onDelete} />
        </Stack>
      ))}
    </Stack>
  );
};
