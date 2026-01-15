import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { useSystemStore, type SystemConfig } from '@/stores/system-store';
import settingsConfig from '../../settings-config.json';

interface SettingField {
  type: string;
  label: string;
  name: string;
  section: string;
}

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { config, setConfig } = useSystemStore();
  const [formData, setFormData] = useState<SystemConfig>({ ...config });

  useEffect(() => {
    if (open) {
      setFormData({ ...config });
    }
  }, [open, config]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setConfig(formData);
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  const apiFields = (settingsConfig.settings as SettingField[]).filter(
    (f) => f.section === 'API'
  );
  const boardFields = (settingsConfig.settings as SettingField[]).filter(
    (f) => f.section === 'Boards'
  );

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
          {apiFields.length > 0 && (
            <Box>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ fontWeight: 600, letterSpacing: 1 }}
              >
                API Configuration
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                {apiFields.map((field) => (
                  <TextField
                    key={field.name}
                    type={field.type}
                    id={field.name}
                    label={field.label}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    fullWidth
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}

          {boardFields.length > 0 && (
            <Box>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ fontWeight: 600, letterSpacing: 1 }}
              >
                Board Configuration
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                {boardFields.map((field) => (
                  <TextField
                    key={field.name}
                    type={field.type}
                    id={field.name}
                    label={field.label}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    fullWidth
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
