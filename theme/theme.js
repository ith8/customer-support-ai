'use client';

import { createTheme } from '@mui/material/styles';

// Keepin' the vibes consistent with these colors
const colors = {
  primary: '#6bb8b8', // Greenish-teal for both the message box and input
  background: '#202124', // Dark mode all the way
  paper: '#303134', // Smooth dark background for the chat bubbles
  textPrimary: '#e8eaed', // Light text so it pops
  textSecondary: '#9aa0a6', // For that secondary chill text
  buttonText: '#202124', // Dark text on those white buttons
  buttonBackground: '#FFFFFF', // Classic white button background
  hoverBackground: '#f1f3f4', // Slightly darker white on hover, just subtle
  hoverBorder: '#6bb8b8', // Same teal for that hover outline
  activeBorderColor: '#FFFFFF', // White outline when you're typing, looking fresh
  activeTextColor: '#FFFFFF', // Keep the text white when the input is active
  placeholderText: '#e8eaed', // Set placeholder text to white
  userBubble: '#6bb8b8', // Change the message box color to match the teal
  assistantBubble: '#e5e5ea', // Gray bubble for the assistant, nice and clean
  bubbleTextColor: '#ffffff', // White text in your bubbles
  assistantTextColor: '#000000', // Black text in the assistant's bubble
};

const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Keeping it modern and simple
  fontSize: 14, // Just the right size
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary, // Greenish-teal for primary
    },
    background: {
      default: colors.background,
      paper: colors.paper,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
  },
  typography: {
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            color: colors.textPrimary,
            '& fieldset': {
              borderColor: colors.textSecondary,
            },
            '&:hover fieldset': {
              borderColor: colors.hoverBorder,
            },
            '&.Mui-focused': {
              '& fieldset': {
                borderColor: `${colors.activeBorderColor} !important`, // Keepin' that outline white when active
              },
              '& input': {
                color: `${colors.activeTextColor} !important`, // Text stays white when you’re typing
              },
              '& input::placeholder': {
                color: `${colors.placeholderText} !important`, // Placeholder text turns white when active
              },
            },
          },
          '& .MuiInputBase-input::placeholder': {
            color: colors.textSecondary, // Placeholder gray when inactive
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: colors.buttonText,
          backgroundColor: colors.buttonBackground,
          '&:hover': {
            backgroundColor: colors.hoverBackground,
            borderColor: colors.hoverBorder,
            boxShadow: `0 0 5px ${colors.hoverBorder}`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '12px',
          borderRadius: '20px', // Rounded corners, just like iMessage
          marginBottom: '10px',
          maxWidth: '80%', // Keep it compact, no one likes full-width bubbles
          boxShadow: `0 2px 5px rgba(0, 0, 0, 0.2)`,
          backgroundColor: colors.userBubble, // Change to greenish-teal for user messages
          color: colors.bubbleTextColor, // Ensure text is white in bubbles
        },
      },
    },
  },
});

export default theme;
