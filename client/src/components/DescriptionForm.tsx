import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a5f',
    },
    secondary: {
      main: '#a3bbd3',
    },
    background: {
      default: '#f0f4f8',
    },
  },
});

interface DescriptionFormProps {
  updateDescription: (d: string) => void;
  description: string;
}

export default function DescriptionForm({ updateDescription, description }: DescriptionFormProps) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        backgroundColor: theme.palette.background.default,
        padding: 2,
        borderRadius: 2,
        mt: 3,
      }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          Job Description
        </Typography>
        <TextField
          required
          id="description"
          name="description"
          placeholder="Paste the job description here"
          fullWidth
          variant="outlined"
          multiline
          rows={10}
          onChange={(e) => updateDescription(e.target.value)}
          value={description}
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.secondary.main,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        />
      </Box>
    </ThemeProvider>
  );
}