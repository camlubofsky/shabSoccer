import axios from 'axios';

export const getAllPlayers = async () => {
  const url =
    'https://dzyretn8gd.execute-api.ap-southeast-2.amazonaws.com/dev/players';
  try {
    const response = await axios.get(url);
    return response.data.Items;
  } catch (error) {
    console.log(error);
  }
};
