import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a5f',
    },
    secondary: {
      main: '#a3bbd3',
    },
    error: {
      main: '#ff0000',
    },
    background: {
      default: '#f0f4f8',
    },
  },
});

interface GeneratedLetterProps {
  resume: string;
  description: string;
  activePrompt: string;
  activeKey: string | null;
  editInputs: () => void;
  refresh: () => void;
  step: number;
  goBack: () => void;
  goNext: () => void;
}

const initialResponse: string | null = null;

const downloadDocument = (letter: string) => {
  const doc = new jsPDF();
  doc.setFontSize(12);
  const lines = doc.splitTextToSize(letter, 180);
  doc.text(lines, 10, 10);
  doc.save("cover_letter.pdf");
};

export default function GeneratedLetter({
  resume,
  description,
  activePrompt,
  activeKey,
  editInputs,
  refresh,
  step,
  goBack,
  goNext
}: GeneratedLetterProps) {
  const [letter, setLetter] = useState(initialResponse);
  const [isError, setIsError] = useState(false);

  const getGeneratedData = async () => {
    try {
      if (!API_BASE_URL) {
        throw new Error('API_BASE_URL is not defined');
      }
      const { data } = await axios.post(API_BASE_URL, { 
        resume, 
        description, 
        prompt: activePrompt, 
        api_key: activeKey 
      });
      if (data.error) {
        setIsError(true);
        setLetter(`Error: ${data.error}`);
      } else {
        setLetter(data.letter);
      }
    } catch (error) {
      setIsError(true);
      setLetter(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
      console.error('Error in getGeneratedData:', error);
    }
  };

  useEffect(() => {
    getGeneratedData();
  }, [resume, description, activePrompt, activeKey]);

  if (!letter) return <LinearProgress color="secondary" variant="indeterminate" />;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.default,
        padding: 2,
        borderRadius: 2,
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[1, 2, 3, 4, 5].map((num) => (
              <Box
                key={num}
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  border: '2px solid #1e3a5f',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: num <= step ? 'white' : '#1e3a5f',
                  fontWeight: 'bold',
                  backgroundColor: num <= step ? '#1e3a5f' : 'transparent',
                }}
              >
                {num < 5 ? num : '✓'}
              </Box>
            ))}
          </Box>
          <Box>
            <IconButton
              aria-label="delete"
              onClick={refresh}
              sx={{ 
                color: theme.palette.error.main,
                backgroundColor: theme.palette.secondary.main,
                borderRadius: '50%',
                padding: '8px',
                marginRight: '8px',
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="save"
              onClick={() => downloadDocument(letter)}
              sx={{ 
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.secondary.main,
                borderRadius: '50%',
                padding: '8px',
              }}
            >
              <SaveIcon />
            </IconButton>
          </Box>
        </Box>

        <Paper
          elevation={3}
          sx={{
            padding: 2,
            whiteSpace: 'pre-wrap',
            color: isError ? 'red' : '',
            backgroundColor: 'white',
            minHeight: '200px',
            borderRadius: 2,
          }}
        >
          {letter}
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button 
            variant="outlined" 
            onClick={goBack}
            sx={{ 
              color: theme.palette.primary.main, 
              borderColor: theme.palette.primary.main,
              borderRadius: 20,
              paddingX: 4,
            }}
          >
            BACK
          </Button>
          <Button 
            variant="contained" 
            onClick={goNext}
            sx={{ 
              backgroundColor: theme.palette.primary.main, 
              color: 'white',
              borderRadius: 20,
              paddingX: 4,
            }}
          >
            NEXT
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}