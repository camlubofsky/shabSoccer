import { Delete } from '@mui/icons-material';
import { TeamButton } from './TeamButton';
import { Player } from './App';
import { ListItem, ListItemButton, ListItemText, Stack } from '@mui/material';

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
      <ListItem
        key={name.name}
        secondaryAction={
          <Stack gap={1} flexDirection="row">
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
          </Stack>
        }
        disablePadding
      >
        <ListItemButton>
          <Delete sx={{ cursor: 'pointer' }} onClick={() => onDelete(name)} />
          <ListItemText id={name.name} primary={name.name} />
        </ListItemButton>
      </ListItem>
    </>
  );
};
