'use client'

// theme/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFFFFF', // White color for buttons
    },
    background: {
      default: '#202124',
      paper: '#303134',
    },
    text: {
      primary: '#e8eaed',
      secondary: '#9aa0a6',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            color: '#e8eaed',
            '& fieldset': {
              borderColor: '#5f6368',
            },
            '&:hover fieldset': {
              borderColor: '#e8eaed',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1a73e8',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: '#202124', // Dark color text on white button
          backgroundColor: '#FFFFFF', // White color for button
          '&:hover': {
            backgroundColor: '#f1f3f4', // Slightly darker white for hover
          },
        },
      },
    },
  },
});

export default theme;
