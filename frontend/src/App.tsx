import './App.css';
import { useState, useEffect } from 'react';
import { Stack } from '@mui/system';
import { PlayerList } from './PlayerList';
import { Search } from './Search';
import { TeamList } from './TeamList';
import { teamCalculator } from './utils/teamCalc';
import { getAllPlayers } from './utils/handlers';
import { NewPlayer } from './NewPlayer';
import { makeTeams } from './utils/makeTeams';
import { Box, Button } from '@mui/material';

export interface Player {
  playerId: string;
  name: string;
  tier: number | null;
  team?: Team;
}

export type Team = 'light' | 'dark' | null;

function App() {
  const [people, setPeople] = useState<Player[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPlayers();
        setPeople(
          data.sort((a: Player, b: Player) => (a.name > b.name ? 1 : -1))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const selectPlayer = (player: Player) => {
    if (players.includes(player)) {
      const updatedPlayers: Player[] = players.filter(
        (p) => p.playerId !== player.playerId
      );
      setPlayers(updatedPlayers);
    } else {
      setPlayers((prevPlayers) => [...prevPlayers, player]);
    }
  };

  const selectTeam = (player: Player, team: Team) => {
    const updatedPlayerNames = players.map((p) => {
      if (p.playerId === player.playerId) {
        return { ...player, team: team };
      } else {
        return p;
      }
    });
    setPlayers(updatedPlayerNames);
  };

  const teamsHandler = () => {
    const teams = makeTeams(players);
    setPlayers(teams);
  };

  const lightPlayers = players.filter((player) => player.team === 'light');
  const darkPlayers = players.filter((player) => player.team === 'dark');
  const totalSelectedPlayers = players.length;
  const bothTeamsHavePlayers =
    lightPlayers.length > 0 && darkPlayers.length > 0;
  const teamsAreEqual = lightPlayers.length === darkPlayers.length;

  const compare = teamCalculator(players);

  const resetHandler = async () => {
    const updatedPlayerNames = players.map((p) => {
      return { ...p, team: null };
    });
    setPlayers(updatedPlayerNames);
  };

  const notSelected = [];
  for (let p of people) {
    if (
      players.find((player) => player.playerId === p.playerId) === undefined
    ) {
      notSelected.push(p);
    }
  }

  const setAllPlaying = () => {
    const updatedPlayerNames = people.map((p) => {
      return { ...p, playing: true };
    });
    setPlayers(updatedPlayerNames);
  };

  return (
    <Stack gap="20px" sx={{ background: 'white' }}>
      <div className="soccer"></div>
      <Stack
        sx={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
        }}
        gap={3}
      >
        <Search names={notSelected} setChosenArray={selectPlayer} />
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
          gap={3}
        >
          <Button
            variant="outlined"
            onClick={resetHandler}
            sx={{ minWidth: '150px' }}
          >
            Reset Teams
          </Button>
          <Button
            variant="outlined"
            onClick={setAllPlaying}
            sx={{ minWidth: '150px' }}
          >
            All Playing
          </Button>
          {!openForm && (
            <Button
              variant="outlined"
              onClick={() => setOpenForm(true)}
              sx={{ minWidth: '150px' }}
            >
              New Player
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={teamsHandler}
            disabled={players.length < 6}
            sx={{ minWidth: '150px' }}
          >
            Make teams
          </Button>
        </Stack>
        {openForm && (
          <NewPlayer
            closeForm={() => setOpenForm(false)}
            addPlayer={selectPlayer}
          />
        )}
        <div style={{ marginTop: '10px' }}>Total Players: {players.length}</div>
      </Stack>
      <Stack display="flex" flexDirection="row" gap="100px">
        <PlayerList
          names={players}
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
          is on average {compare.betterTeamLead}% better than{' '}
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
