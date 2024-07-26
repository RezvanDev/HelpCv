import React, { useState, useEffect } from 'react';
import FormDialog from './Dialogs/FormDialog';
import WarningDialog from './Dialogs/WarningDialog';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from '../utils/localstorage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

interface ResumeFormProps {
  updateResume: (r: string) => void;
  resume: string;
}

type localResume = {
  name: string;
  resume: string;
  id: number;
}

const warningDialogInitial: localResume | null = null;
const localStorageResumesInitial: localResume[] = [];

export default function ResumeForm({ updateResume, resume }: ResumeFormProps) {
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [localStorageResumes, setLocalStorageResumes] = useState(localStorageResumesInitial);
  const [activeResumeId, setActiveResumeId] = useState(0);
  const [warningDialogContents, setWarningDialogContents] = useState(warningDialogInitial);

  useEffect(() => {
    setLocalStorageResumes(getFromLocalStorage('resumes'));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        backgroundColor: theme.palette.background.default,
        padding: 2,
        borderRadius: 2,
      }}>
        <FormDialog
          open={openFormDialog}
          handleClose={() => setOpenFormDialog(false)}
          saveResume={(resumeName) => {
            saveToLocalStorage('resumes', {
              name: resumeName,
              resume,
              id: Date.now()
            });
            setOpenFormDialog(false);
            setLocalStorageResumes(getFromLocalStorage('resumes'));
          }}
        />
        <WarningDialog
          open={Boolean(warningDialogContents)}
          handleClose={() => setWarningDialogContents(null)}
          deleteResume={() => {
            if (warningDialogContents) {
              removeFromLocalStorage('resumes', warningDialogContents);
            }
            setLocalStorageResumes(getFromLocalStorage('resumes'));
            setWarningDialogContents(null);
          }}
          localResume={warningDialogContents}
        />
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
          >
            {localStorageResumes.map((r: localResume) => (
              <Chip
                key={r.id}
                label={r.name}
                onDelete={() => setWarningDialogContents(r)}
                onClick={() => {
                  updateResume(r.resume);
                  setActiveResumeId(r.id);
                }}
                color='primary'
                variant={activeResumeId === r.id ? 'filled' : 'outlined'}
                sx={{ borderRadius: '16px' }}
              />
            ))}
          </Stack>
          <Box>
            <IconButton
              aria-label="clear"
              onClick={() => { updateResume(''); setActiveResumeId(0); }}
              disabled={!resume.length}
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
              onClick={() => setOpenFormDialog(true)}
              disabled={!resume.length}
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
        <TextField
          required
          id="resume"
          name="resume"
          placeholder="Paste your resume here"
          fullWidth
          variant="outlined"
          multiline
          rows={10}
          onChange={(e) => { updateResume(e.target.value); setActiveResumeId(0); }}
          value={resume}
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