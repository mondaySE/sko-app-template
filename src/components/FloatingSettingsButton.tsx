import { useState } from 'react';
import { Fab } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { SettingsModal } from './SettingsModal';

export function FloatingSettingsButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Fab
        color="primary"
        aria-label="settings"
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          zIndex: 50,
        }}
      >
        <Settings />
      </Fab>
      <SettingsModal open={open} onOpenChange={setOpen} />
    </>
  );
}
