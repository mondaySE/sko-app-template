import { useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SettingsModal } from './SettingsModal';

export function FloatingSettingsButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
        onClick={() => setOpen(true)}
      >
        <Settings className="h-5 w-5" />
      </Button>
      <SettingsModal open={open} onOpenChange={setOpen} />
    </>
  );
}
