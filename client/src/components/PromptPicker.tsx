import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PromptObj from './PromptTypes';

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

interface PromptPickerProps {
  setActivePrompt: (d: string) => void;
  activePrompt: string;
}

export default function PromptPicker({ activePrompt, setActivePrompt }: PromptPickerProps) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        backgroundColor: theme.palette.background.default,
        padding: 2,
        borderRadius: 2,
      }}>
        <Grid container spacing={3} sx={{ pt: 2 }}>
          {Object.keys(PromptObj).map(prompt => (
            <Grid item xs={12} sm={6} key={prompt}>
              <Card sx={{
                background: prompt === activePrompt ? theme.palette.primary.main : 'white',
                color: prompt === activePrompt ? 'white' : theme.palette.primary.main,
                height: 180,
                borderRadius: 2,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}>
                <CardActionArea 
                  onClick={() => setActivePrompt(prompt)}
                  sx={{ height: '100%' }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {PromptObj[prompt].name}
                    </Typography>
                    <Typography variant="body2">
                      {PromptObj[prompt].description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}