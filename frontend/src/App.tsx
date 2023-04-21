import './App.css';
import { useState, useEffect } from 'react';
import { Stack } from '@mui/system';
import { PlayerList } from './PlayerList';
import { Search } from './Search';
import { TeamList } from './TeamList';
import { teamCalculator } from './utils/teamCalc';
import { unselected } from './utils/unselected';
import {
  changePlayStatus,
  changeTeam,
  getAllPlayers,
  resetEveryone,
} from './utils/handlers';

export interface Player {
  playerId: string;
  name: string;
  tier: number;
  team?: Team;
  playing: boolean;
}

export type Team = 'light' | 'dark' | null;

function App() {
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPlayers();
        setPlayers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const selectPlayer = async (player: Player) => {
    try {
      await changePlayStatus(player);
      setPlayers(await getAllPlayers());
    } catch (e) {
      console.log(e);
    }
  };

  const selectTeam = async (player: Player, team: Team) => {
    try {
      await changeTeam(player, team);
      setPlayers(await getAllPlayers());
    } catch (error) {
      console.log(error);
    }
  };

  const lightPlayers = players.filter((player) => player.team === 'light');
  const darkPlayers = players.filter((player) => player.team === 'dark');
  const totalSelectedPlayers = players.filter(
    (player) => player.playing
  ).length;
  const bothTeamsHavePlayers =
    lightPlayers.length > 0 && darkPlayers.length > 0;
  const teamsAreEqual = lightPlayers.length === darkPlayers.length;

  const compare = teamCalculator(players);

  const resetHandler = async () => {
    await resetEveryone();
    console.log(players);
    setPlayers(await getAllPlayers());
    console.log(players);
  };

  const playerSelected = players.filter((p) => !p.playing);

  // console.log(players);

  return (
    <Stack gap="20px">
      <div>
        <Search names={playerSelected} setChosenArray={selectPlayer} />
        <div style={{ marginTop: '10px' }}>
          Total Players: {allPlayers.length}
        </div>
        <button onClick={resetHandler}>Reset</button>
      </div>
      <Stack display="flex" flexDirection="row" gap="100px">
        <PlayerList
          names={players.filter((p) => p.playing)}
          onTeamSelect={selectTeam}
          onDelete={selectPlayer}
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
            onDelete={selectTeam}
          />
          <TeamList color="dark" players={darkPlayers} onDelete={selectTeam} />
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
