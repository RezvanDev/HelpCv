import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a5f',
    },
    secondary: {
      main: '#a3bbd3',
    },
  },
});

interface FormDialogProps {
  handleClose: () => void;
  open: boolean;
  saveResume: (r: string) => void;
}

export default function FormDialog({open, handleClose, saveResume}: FormDialogProps) {
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries() as IterableIterator<[string, FormDataEntryValue]>);
            const resumeName = formJson.resumeName as string;
            saveResume(resumeName);
          },
          sx: {
            backgroundColor: theme.palette.background.default,
            borderRadius: 2,
          }
        }}
      >
        <DialogTitle sx={{ color: theme.palette.primary.main }}>Save to local storage</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="resumeName"
            label="Resume Name"
            type="text"
            fullWidth
            variant="outlined"
            sx={{
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: theme.palette.primary.main }}>Cancel</Button>
          <Button type="submit" variant="contained" sx={{ backgroundColor: theme.palette.primary.main }}>Save</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}