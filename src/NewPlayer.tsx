import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Player } from './App';
import {
  Button,
  FormControl,
  FormGroup,
  Stack,
  TextField,
} from '@mui/material';

type NewPlayerType = {
  name: string;
  tier: string;
  password: string;
};

type TNewPlayer = {
  addPlayer: (player: Player) => void;
  closeForm: () => void;
};

const newPlayerBase = {
  name: '',
  tier: '',
  password: '',
};

const formErrors = {
  name: '',
  tier: '',
  password: '',
};

export const NewPlayer: React.FC<TNewPlayer> = ({ addPlayer, closeForm }) => {
  const [newPlayer, setNewPlayer] = useState<NewPlayerType>(newPlayerBase);
  const [errors, setFormErrors] = useState<any>(formErrors);

  function handleChange(event: any, input: string) {
    setNewPlayer((prevFormData) => ({
      ...prevFormData,
      [input]: event.target.value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors: any = {};
    const tier = parseInt(newPlayer.tier);

    if (newPlayer.name.trim() === '') {
      errors.name = 'Name is required';
    }

    if (newPlayer.tier.trim() === '') {
      errors.tier = 'Tier is required';
    }
    if (tier < 1 || tier > 4) {
      errors.tier = 'Tier must be between 1 and 4';
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      addPlayer({
        name: newPlayer.name,
        tier: tier,
        team: null,
        playerId: uuidv4(),
      });
      setNewPlayer(newPlayerBase);
      closeForm();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          id="test"
        >
          <FormControl margin="normal" sx={{ flexDirection: 'row', margin: 0 }}>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TextField
                id="name"
                placeholder="Name"
                label="Name"
                value={newPlayer.name}
                onChange={(event) => handleChange(event, 'name')}
                size="small"
                error={Boolean(errors.name)}
                helperText={errors.name}
                sx={{ marginRight: '1rem' }}
              />
              <TextField
                type="number"
                id="tier"
                label="Tier"
                size="small"
                value={newPlayer.tier}
                onChange={(event) => handleChange(event, 'tier')}
                error={Boolean(errors.tier)}
                helperText={errors.tier}
                sx={{ marginRight: '1rem' }}
              />
            </Stack>
            <Stack display="flex" flexDirection="row" alignItems="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ height: '2rem', width: '2rem', margin: '0.5rem' }}
              >
                &#10003;
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={() => closeForm()}
                sx={{ height: '2rem', width: '.5rem', margin: 0, padding: 0 }}
              >
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>X</span>
              </Button>
            </Stack>
          </FormControl>
        </FormGroup>
      </form>
    </>
  );
};
