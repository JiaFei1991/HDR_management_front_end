import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder'
// ];

function getStyles(name, participants, theme) {
  return {
    fontWeight:
      participants.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export const ParticipantPicker = ({
  id,
  names,
  participants,
  setParticipants
}) => {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setParticipants(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <FormControl>
      <InputLabel id="multiple-chip-label">Participants</InputLabel>
      <Select
        labelId="multiple-chip-label"
        id={id}
        multiple
        value={participants}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Participants" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {names.length !== 0
          ? names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, participants, theme)}
              >
                {name}
              </MenuItem>
            ))
          : []}
      </Select>
    </FormControl>
  );
};
