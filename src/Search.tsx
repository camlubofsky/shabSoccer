import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Player } from './App';

type TSearch = {
  names: Array<Player>;
  setChosenArray: any;
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
        sx={{
          width: '400px',
          '@media (max-width:600px)': {
            maxWidth: '350px',
          },
        }}
        options={names}
        value={selectedOption}
        blurOnSelect
        autoHighlight
        filterSelectedOptions
        onChange={handleOptionChange}
        renderInput={(params) => (
          <TextField {...params} label="Select a player" variant="outlined" />
        )}
        getOptionLabel={(option) => option.name}
      />
    </div>
  );
};
