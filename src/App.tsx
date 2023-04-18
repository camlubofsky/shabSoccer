import './App.css';
import { useState } from 'react';
import { Stack } from '@mui/system';
import { PlayerList } from './PlayerList';
import { Search } from './Search';
import { TeamList } from './TeamList';
import { teamCalculator } from './utils/teamCalc';
import { names } from './utils/names';
import { unselected } from './utils/unselected';

export interface Player {
  value: string;
  label: string;
  tier: number;
  team?: Team;
}

export type Team = 'light' | 'dark' | null;

function App() {
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);

  const handleSelectArray = (player: Player) => {
    setAllPlayers([...allPlayers, player]);
  };

  const updateState = (value: Player, team: Team) => {
    const updatedState = allPlayers.map((player) => {
      if (player === value) {
        return { ...player, team: team };
      }
      return player;
    });
    setAllPlayers(updatedState);
  };

  const removePlayerFromTeam = (player: Player) => {
    updateState(player, null);
  };

  const removePlayer = (player: Player) => {
    setAllPlayers(allPlayers.filter((p) => p.value !== player.value));
  };

  const lightPlayers = allPlayers.filter((player) => player.team === 'light');
  const darkPlayers = allPlayers.filter((player) => player.team === 'dark');
  const totalSelectedPlayers = lightPlayers.length + darkPlayers.length;

  const bothTeamsHavePlayers =
    lightPlayers.length > 0 && darkPlayers.length > 0;
  const teamsAreEqual = lightPlayers.length === darkPlayers.length;

  const unselectedNames = unselected(allPlayers, names);
  const compare = teamCalculator(allPlayers);
  return (
    <Stack gap="20px">
      <div>
        <Search
          names={unselectedNames}
          allPlayers={allPlayers}
          setChosenArray={handleSelectArray}
        />
        <div style={{ marginTop: '10px' }}>
          Total Players: {allPlayers.length}
        </div>
      </div>
      <Stack display="flex" flexDirection="row" gap="100px">
        <PlayerList
          names={allPlayers}
          onTeamSelect={updateState}
          onDelete={removePlayer}
        />
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="space-evenly"
          gap="50px"
        >
          <TeamList
            color="light"
            players={lightPlayers}
            onDelete={removePlayerFromTeam}
          />
          <TeamList
            color="dark"
            players={darkPlayers}
            onDelete={removePlayerFromTeam}
          />
        </Stack>
      </Stack>
      {totalSelectedPlayers > 5 && teamsAreEqual && bothTeamsHavePlayers && (
        <div>
          These teams are{' '}
          <span style={{ color: compare.color }}>{compare.fairness}</span>.{' '}
          <span style={{ fontWeight: 'bold' }}>{compare.betterTeamName}</span>{' '}
          is on average {compare.betterTeamLead} tiers better than{' '}
          <span style={{ fontWeight: 'bold' }}>{compare.worseTeamName}</span>
        </div>
      )}
      {totalSelectedPlayers > 5 &&
        !teamsAreEqual &&
        bothTeamsHavePlayers &&
        'Teams dont have an even number of players'}
    </Stack>
  );
}

export default App;
