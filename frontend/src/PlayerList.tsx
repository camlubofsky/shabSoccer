import { Stack } from '@mui/system';
import { Player } from './App';
import { PlayerLine } from './PlayerLine';

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
  // console.log(names);
  return (
    <Stack gap="16px" sx={{ marginTop: '30px', minWidth: '300px' }}>
      {names.map((name) => (
        <Stack gap="8px" flexDirection="row" key={name.playerId}>
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
