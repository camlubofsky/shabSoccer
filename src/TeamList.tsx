import { Stack, Typography, List } from '@mui/material';
import { Player } from './App';
import { TeamLine } from './TeamLine';

type TTeamList = {
  players: Array<Player>;
  color: 'light' | 'dark';
  onDelete: any;
};

export const TeamList: React.FC<TTeamList> = ({ players, color, onDelete }) => {
  const listStyle = {
    border: '1px solid lightgrey',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    width: '300px',
    maxHeight: 540,
    background: 'lightGrey',
  };

  const title = color.charAt(0).toUpperCase() + color.slice(1);
  return (
    <Stack gap="16px" sx={listStyle}>
      <Typography sx={{ textAlign: 'center' }} variant="h5">
        {title}
      </Typography>
      <List
        sx={{
          width: '100%',
          maxWidth: 500,
          maxHeight: 418,
          overflow: 'auto',
          padding: 0,
        }}
      >
        {players.map((player) => (
          <Stack
            gap="8px"
            flexDirection="column"
            alignItems="center"
            key={player.playerId}
          >
            <TeamLine player={player} onDelete={onDelete} />
          </Stack>
        ))}
      </List>
    </Stack>
  );
};
