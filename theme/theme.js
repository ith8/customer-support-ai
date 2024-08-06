'use client'
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1a73e8',
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
        },
      },
    },
  },
});

export default theme;
