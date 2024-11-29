import React from 'react';
import { Person as PersonIcon, People as PeopleIcon } from '@mui/icons-material';
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material';

interface GoalsToggleProps {
  activeView: 'individual' | 'family';
  onToggle: (view: 'individual' | 'family') => void;
}

export const GoalsToggle: React.FC<GoalsToggleProps> = ({ activeView, onToggle }) => {
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: 'individual' | 'family' | null
  ) => {
    if (newValue !== null) {
      onToggle(newValue);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <ToggleButtonGroup
        value={activeView}
        exclusive
        onChange={handleChange}
        aria-label="goal view"
        fullWidth
      >
        <ToggleButton value="individual" aria-label="individual goals">
          <PersonIcon sx={{ mr: 1 }} />
          Individual Goals
        </ToggleButton>
        <ToggleButton value="family" aria-label="family goals">
          <PeopleIcon sx={{ mr: 1 }} />
          Family Goals
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};