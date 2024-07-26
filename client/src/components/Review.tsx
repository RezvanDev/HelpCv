import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
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

interface ReviewProps {
  resume: string;
  description: string;
}

export default function Review({ resume, description }: ReviewProps) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'row' },
        backgroundColor: theme.palette.background.default,
        padding: 2,
        borderRadius: 2,
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100%', sm: '48%' },
        }}>
          <Typography
            gutterBottom
            sx={{
              fontSize: { xs: 15, sm: 20 },
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            Resume
          </Typography>
          <TextField
            id="resume-review"
            name="resume-review"
            fullWidth
            variant="outlined"
            multiline
            rows={10}
            value={resume}
            InputProps={{
              readOnly: true,
              sx: { backgroundColor: 'white', borderRadius: 2 }
            }}
          />
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100%', sm: '48%' },
          mt: { xs: 2, sm: 0 }
        }}>
          <Typography
            gutterBottom
            sx={{
              fontSize: { xs: 15, sm: 20 },
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            Description
          </Typography>
          <TextField
            id="description-review"
            name="description-review"
            fullWidth
            variant="outlined"
            multiline
            rows={10}
            value={description}
            InputProps={{
              readOnly: true,
              sx: { backgroundColor: 'white', borderRadius: 2 }
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}