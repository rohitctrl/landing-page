"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DownloadConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DownloadConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
}: DownloadConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-b from-[#0a0f1c] to-[#030712] border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Download MindMic</DialogTitle>
          <DialogDescription className="text-gray-400">
            Ready to download MindMic? The zip file contains everything you need to get started with voice transcription.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-white/5 border-white/10 text-gray-200 hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-white text-black hover:bg-gray-100"
          >
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
