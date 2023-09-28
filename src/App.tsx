import './App.css';
import { useState } from 'react';
import { Stack } from '@mui/system';
import { PlayerList } from './PlayerList';
import { Search } from './Search';
import { TeamList } from './TeamList';
import { teamCalculator } from './utils/teamCalc';
import { names as people } from './utils/names';
import { NewPlayer } from './NewPlayer';
import { makeTeams } from './utils/makeTeams';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Copy } from './Copy';
import { convertArrayToObject } from './utils/convertTeams';

export interface Player {
  playerId: string;
  name: string;
  tier: number | null;
  team?: Team;
}

export type Team = 'light' | 'dark' | null;

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [openForm, setOpenForm] = useState(false);

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const buttonProps = {
    fontSize: smallScreen ? '0.7rem' : '1rem',
    p: smallScreen ? '0.3rem' : '1rem',
  };

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
    <Stack
      sx={{
        padding: '.5rem',
        gap: smallScreen ? 1 : 3,
        width: smallScreen ? '350px' : '1440px',
        margin: 'auto',
      }}
      id="totalStack"
    >
      <div className="soccer"></div>
      <Typography
        sx={{
          textAlign: 'center',
          textTransform: 'uppercase',
          color: 'red',
          fontWeight: 'bold',
        }}
        variant="h2"
      >
        Shabbas Soccer
      </Typography>
      <Stack
        sx={{
          marginTop: smallScreen ? '1rem' : '3rem',
          display: 'flex',
          flexDirection: 'column',
        }}
        gap={smallScreen ? 1.5 : 3}
        id="belowBall"
      >
        <Search names={notSelected} setChosenArray={selectPlayer} />
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: smallScreen ? 1 : 3,
            minWidth: smallScreen ? '350px' : '600px',
          }}
          id="this"
        >
          <Button variant="outlined" onClick={setAllPlaying} sx={buttonProps}>
            All Playing
          </Button>
          {!openForm && (
            <Button
              variant="outlined"
              onClick={() => setOpenForm(true)}
              sx={buttonProps}
            >
              New Player
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={teamsHandler}
            disabled={players.length < 6}
            sx={buttonProps}
          >
            Make teams
          </Button>
          <Button variant="outlined" onClick={resetHandler} sx={buttonProps}>
            Reset Teams
          </Button>
        </Stack>
        {openForm && (
          <NewPlayer
            closeForm={() => setOpenForm(false)}
            addPlayer={selectPlayer}
          />
        )}
      </Stack>

      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: smallScreen ? 'column' : 'row',
          width: smallScreen ? '350px' : '80%',
          alignItems: smallScreen ? 'center' : 'flex-start',
          gap: smallScreen ? '1rem' : '3rem',
        }}
        id="playersAndTeams"
      >
        <Box
          sx={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          id="box"
        >
          <PlayerList
            names={players}
            onTeamSelect={selectTeam}
            onDelete={selectPlayer}
          />
          <Typography style={{ marginTop: smallScreen ? '.5rem' : '1.5rem' }}>
            Total Players: {players.length}
          </Typography>
          {players.length > 9 && teamsAreEqual && bothTeamsHavePlayers && (
            <div style={{ marginTop: '1rem' }}>
              <div>
                These teams are{' '}
                <span style={{ color: compare.color }}>{compare.fairness}</span>
                .{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {compare.betterTeamName}
                </span>{' '}
                is on average {compare.betterTeamLead}% better than{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {compare.worseTeamName}
                </span>
              </div>
              <Copy players={convertArrayToObject(players)} />
            </div>
          )}
          {players.length > 9 &&
            !teamsAreEqual &&
            bothTeamsHavePlayers &&
            'Teams dont have an even number of players'}
        </Box>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: smallScreen ? 'column' : 'row',
            justifyContent: 'space-evenly',
            gap: smallScreen ? '3rem' : '5rem',
            width: 'auto',
          }}
          id="teams"
        >
          <TeamList
            color="light"
            players={lightPlayers}
            onDelete={selectTeam}
          />
          <TeamList color="dark" players={darkPlayers} onDelete={selectTeam} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
