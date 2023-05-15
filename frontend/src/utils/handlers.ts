import axios from 'axios';
import { Player, Team } from '../App';

const baseUrl =
  'https://dzyretn8gd.execute-api.ap-southeast-2.amazonaws.com/dev/players/';

export const getAllPlayers = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data.Items;
  } catch (error) {
    console.log(error);
  }
};

export const changePlayStatus = async (player: Player) => {
  const url = baseUrl + player.playerId;
  try {
    const data = {
      team: player.team,
      tier: player.tier,
      name: player.name,
    };
    const response = await axios.put(url, data);
    return { ...response.data, playerId: player.playerId };
  } catch (error) {
    console.log(error);
  }
};

export const changeTeam = async (player: Player, team: Team) => {
  // console.log(player);
  const url = baseUrl + player.playerId;
  console.log(url);
  try {
    const data = {
      team,
      tier: player.tier,
      name: player.name,
    };

    console.log(data);
    const response = await axios.put(url, data);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const resetEveryone = async () => {
  const players = await getAllPlayers();
  console.log(players);
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const url = baseUrl + player.playerId;
    try {
      const data = {
        team: null,
        tier: player.tier,
        name: player.name,
        playing: false,
      };
      const response = await axios.put(url, data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return;
};
