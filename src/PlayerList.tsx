import { Stack } from '@mui/system';
import { Player } from './App';
import { PlayerLine } from './PlayerLine';
import { List, Typography } from '@mui/material';

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
    <Stack
      sx={{
        marginTop: '0px',
        width: '350px',
        border: '1px solid black',
        borderRadius: '5px',
      }}
    >
      <Typography sx={{ textAlign: 'center' }} variant="h6">
        Players
      </Typography>
      <List
        sx={{
          width: 350,
          maxHeight: 500,
          overflow: 'auto',
          '@media (max-width:600px)': {
            maxHeight: 300,
          },
        }}
      >
        {names.map((name) => (
          <Stack flexDirection="row" key={name.playerId}>
            <PlayerLine
              name={name}
              onTeamSelect={onTeamSelect}
              onDelete={onDelete}
            />
          </Stack>
        ))}
      </List>
    </Stack>
  );
};
