import { Player } from '../App';

export const teamCalculator = (players: Player[]) => {
  function sumByTeam(players: Player[]) {
    const result = {
      lightSum: 0,
      darkSum: 0,
    };

    players.forEach((player) => {
      if (player.team === 'light') {
        result.lightSum += player.tier!;
      } else if (player.team === 'dark') {
        result.darkSum += player.tier!;
      }
    });

    return result;
  }

  const { lightSum, darkSum } = sumByTeam(players);

  let betterTeam = Math.min(lightSum, darkSum);
  let worseTeam = Math.max(lightSum, darkSum);

  const betterTeamLead = (worseTeam - betterTeam) / worseTeam;
  const betterTeamName = lightSum < darkSum ? 'Light' : 'Dark';
  const worseTeamName = lightSum < darkSum ? 'Dark' : 'Light';

  const checkFairness = (betterTeamLead: number) => {
    let fairness = '';
    let color = '';
    switch (true) {
      case betterTeamLead === 0:
        fairness = 'perfectly even';
        color = 'green';
        break;
      case betterTeamLead < 0.05:
        fairness = 'very fair';
        color = 'orange';
        break;
      case betterTeamLead < 0.15:
        fairness = 'pretty fair';
        color = 'orange';
        break;
      default:
        fairness = 'not fair';
        color = 'red';
        break;
    }
    return { fairness, color };
  };

  const { fairness, color } = checkFairness(betterTeamLead);

  return {
    lightSum,
    darkSum,
    betterTeamLead: (betterTeamLead * 100).toFixed(0),
    betterTeamName,
    worseTeamName,
    fairness,
    color,
  };
};
