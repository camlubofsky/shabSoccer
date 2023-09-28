import { Delete } from '@mui/icons-material';
import { ListItem, ListItemText } from '@mui/material';
import { Player } from './App';

type TTeamLine = {
  player: Player;
  onDelete: any;
};
export const TeamLine: React.FC<TTeamLine> = ({ player, onDelete }) => {
  const boxStyle = {
    width: '290px',
    height: '50px',
    border: '1px solid lightgrey',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
    background: 'white',
  };

  return (
    <>
      <ListItem
        key={player.name + player.tier}
        secondaryAction={
          <Delete
            sx={{ cursor: 'pointer' }}
            onClick={() => onDelete(player, null)}
          />
        }
        sx={boxStyle}
      >
        <ListItemText id={player.name} primary={player.name} />
      </ListItem>
    </>
  );
};
