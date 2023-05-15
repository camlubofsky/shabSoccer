import { Player } from '../App';

export const makeTeams: any = (players: Player[]) => {
  const sorted = players.sort((a, b) => a.tier! - b.tier!);
  const newTeams = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i % 2 === 0) {
      newTeams.push({ ...sorted[i], team: 'light' });
    } else {
      newTeams.push({ ...sorted[i], team: 'dark' });
    }
  }
  return newTeams.sort((a, b) => (a.name > b.name ? 1 : -1));
};
