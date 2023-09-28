import { Player } from '../App';

export const unselected = (allPlayers: Player[], names: Player[]) => {
  let onlyNames: string[] = [];
  for (let player of allPlayers) {
    onlyNames.push(player.name);
  }
  const unselectedNames = names.filter(
    (name: Player) => !onlyNames.includes(name.name)
  );
  return unselectedNames;
};
