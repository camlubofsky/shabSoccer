import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Player } from './App';

type TSearch = {
  names: Array<Player>;
  setChosenArray: any;
  allPlayers: Array<Player>;
};

export const Search: React.FC<TSearch> = ({ names, setChosenArray }) => {
  const [selectedOption, setSelectedOption] = useState<Player | null>(null);

  const handleOptionChange = (event: any, value: Player | null) => {
    setSelectedOption(null);
    if (value) {
      setChosenArray(value);
    }
  };

  return (
    <div>
      <Autocomplete
        sx={{ width: '200px' }}
        options={names}
        value={selectedOption}
        blurOnSelect
        autoHighlight
        filterSelectedOptions
        onChange={handleOptionChange}
        renderInput={(params) => (
          <TextField {...params} label="Select an option" variant="outlined" />
        )}
        getOptionLabel={(option) => option.label}
      />
    </div>
  );
};
