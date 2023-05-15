import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Player } from './App';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
} from '@mui/material';
import { CheckBox } from '@mui/icons-material';

type NewPlayer = {
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
  const [newPlayer, setNewPlayer] = useState<NewPlayer>(newPlayerBase);
  const [errors, setFormErrors] = useState<any>(formErrors);
  const [isChecked, setIsChecked] = useState(true);

  function handleChange(event: any, input: string) {
    setNewPlayer((prevFormData) => ({
      ...prevFormData,
      [input]: event.target.value,
    }));
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors: any = {};
    const tier = parseInt(newPlayer.tier);
    const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;

    if (newPlayer.name.trim() === '') {
      errors.name = 'Name is required';
    }
    if (isChecked && !regName.test(newPlayer.name)) {
      errors.name = 'A permanent player must have a First and Last name';
      console.log(isChecked && !regName.test(newPlayer.name), 'into the if');
      console.log(Boolean(errors.name));
    }
    if (newPlayer.tier.trim() === '') {
      errors.tier = 'Tier is required';
    }
    if (tier < 1 || tier > 4) {
      errors.tier = 'Tier must be between 1 and 4';
    }
    setFormErrors(errors);
    if (!isChecked) {
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

    if (isChecked) {
      if (newPlayer.password !== 'CamsTheBoss') {
        setFormErrors((prevErrors: any) => ({
          ...prevErrors,
          password: 'Incorrect password - Speak to Cam',
        }));
      }
      console.log('allPassed');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <FormControl
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <FormControl margin="normal">
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
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
              <FormControl>
                <FormControlLabel
                  label="Permanent Player"
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                  }
                />
                {isChecked && (
                  <TextField
                    id="password"
                    label="Password"
                    value={newPlayer.password}
                    type="password"
                    size="small"
                    onChange={(event) => handleChange(event, 'password')}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    sx={{ width: '25.25rem' }}
                  />
                )}
              </FormControl>
            </FormControl>
            <Button type="submit" variant="contained" sx={{ height: '2rem' }}>
              Submit
            </Button>
          </FormControl>
        </FormGroup>
      </form>
    </>
  );
};
