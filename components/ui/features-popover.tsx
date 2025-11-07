"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Mic, Brain, Zap, Settings, FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface FeaturesPopoverProps {
  onDownload?: () => void;
  onVideoClick?: () => void;
}

export function FeaturesPopover({
  onDownload,
  onVideoClick,
}: FeaturesPopoverProps) {
  const features = [
    {
      icon: <Mic className="w-5 h-5 text-[#2596be]" />,
      title: "Real-Time Transcription",
      desc: "Instantly turn your voice into accurate text with AI precision.",
    },
    {
      icon: <Brain className="w-5 h-5 text-[#5eead4]" />,
      title: "Smart Context",
      desc: "Understands tone, pauses, and phrasing for clean transcripts.",
    },
    {
      icon: <Zap className="w-5 h-5 text-[#818cf8]" />,
      title: "Power Mode",
      desc: "Offline transcription powered by local Whisper for privacy.",
    },
    {
      icon: <Settings className="w-5 h-5 text-[#38bdf8]" />,
      title: "Custom Shortcuts",
      desc: "Personalize your workflow with shortcuts and preferences.",
    },
    {
      icon: <FileText className="w-5 h-5 text-[#fbbf24]" />,
      title: "AI Summaries",
      desc: "Get structured summaries from long recordings in seconds.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#f472b6]" />,
      title: "Smart Modes",
      desc: "Switch between modes for meetings, focus, or brainstorming.",
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-gray-300 hover:text-white transition font-medium">
          Features
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="center"
        sideOffset={12}
        className="w-[500px] p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0a0f1c]/90 to-[#030712]/90 backdrop-blur-xl shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="grid grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-3 rounded-xl hover:bg-white/5 transition cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-1">
                  {f.icon}
                  <h4 className="text-sm font-semibold text-white">
                    {f.title}
                  </h4>
                </div>
                <p className="text-xs text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <Button
              variant="outline"
              className="bg-white/5 border-white/10 text-gray-200 hover:bg-white/10"
              onClick={() => onDownload?.()}
            >
              And so much more →
            </Button>
          </div>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}
