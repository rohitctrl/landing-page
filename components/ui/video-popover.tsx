"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "./sparkles";
import { TimelineContent } from "./timeline-animation";
import { VerticalCutReveal } from "./vertical-cut-reveal";

interface VideoPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoPopover({ isOpen, onClose }: VideoPopoverProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  useEffect(() => {
    if (isOpen) {
      setIsVideoReady(true);
    } else {
      setIsVideoReady(false);
      setIsPlaying(false);
    }
  }, [isOpen]);

  const togglePlayPause = () => {
    if (videoPlayerRef.current) {
      if (isPlaying) {
        videoPlayerRef.current.pause();
      } else {
        videoPlayerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoPlayerRef.current) {
      setCurrentTime(videoPlayerRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoPlayerRef.current) {
      setDuration(videoPlayerRef.current.duration);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.3,
              }}
              className="w-full max-w-4xl h-[90vh] bg-black rounded-2xl border border-gray-800 shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="min-h-full mx-auto relative bg-black rounded-2xl"
                ref={videoRef}
              >
                {/* Background Effects */}
                <TimelineContent
                  as="div"
                  animationNum={1}
                  timelineRef={videoRef as React.RefObject<HTMLDivElement>}
                  customVariants={revealVariants}
                  className="absolute top-0 h-96 w-screen overflow-hidden mask-[radial-gradient(50%_50%,white,transparent)]"
                >
                  <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-size-[70px_80px]"></div>
                  <Sparkles
                    density={1800}
                    speed={1}
                    color="#FFFFFF"
                    className="absolute inset-x-0 bottom-0 h-full w-full mask-[radial-gradient(50%_50%,white,transparent_85%)]"
                  />
                </TimelineContent>

                <TimelineContent
                  animationNum={5}
                  timelineRef={videoRef as React.RefObject<HTMLDivElement>}
                  customVariants={revealVariants}
                  className="absolute left-0 top-[-114px] w-full h-[113.625vh] flex flex-col items-start justify-start content-start flex-none flex-nowrap gap-2.5 overflow-hidden p-0 z-0"
                >
                  <div className="framer-1i5axl2">
                    <div
                      className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full"
                      style={{
                        border: "200px solid #3131f5",
                        filter: "blur(92px)",
                        WebkitFilter: "blur(92px)",
                      }}
                      data-border="true"
                      data-framer-name="Ellipse 1"
                    ></div>
                    <div
                      className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full"
                      style={{
                        border: "200px solid #3131f5",
                        filter: "blur(92px)",
                        WebkitFilter: "blur(92px)",
                      }}
                      data-border="true"
                      data-framer-name="Ellipse 2"
                    ></div>
                  </div>
                </TimelineContent>

                {/* Header */}
                <div className="text-center mb-8 pt-32 max-w-3xl mx-auto space-y-4 relative z-50">
                  <h2 className="text-4xl font-medium text-white">
                    <VerticalCutReveal
                      splitBy="words"
                      staggerDuration={0.15}
                      staggerFrom="first"
                      reverse={true}
                      containerClassName="justify-center"
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 40,
                        delay: 0,
                      }}
                    >
                      How to Install MindMic
                    </VerticalCutReveal>
                  </h2>

                  <TimelineContent
                    as="div"
                    animationNum={0}
                    timelineRef={videoRef as React.RefObject<HTMLDivElement>}
                    customVariants={revealVariants}
                    className="text-gray-300 max-w-2xl mx-auto"
                  >
                    Follow this step-by-step guide to get MindMic up and running
                    on your device
                  </TimelineContent>
                </div>

                {/* Background Gradient */}
                <div
                  className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0"
                  style={{
                    backgroundImage: `
                    radial-gradient(circle at center, #206ce8 0%, transparent 70%)
                  `,
                    opacity: 0.6,
                    mixBlendMode: "multiply",
                  }}
                />

                {/* Video Container */}
                <div className="flex items-center justify-center px-8 py-8 relative z-50">
                  <TimelineContent
                    as="div"
                    animationNum={1}
                    timelineRef={videoRef as React.RefObject<HTMLDivElement>}
                    customVariants={revealVariants}
                    className="w-full max-w-4xl"
                  >
                    <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                      {/* Video Frame Border */}
                      <div className="absolute inset-0 border-2 border-gray-700 rounded-xl pointer-events-none z-10"></div>

                      {/* Video Player */}
                      {isVideoReady && (
                        <>
                          <video
                            ref={videoPlayerRef}
                            autoPlay
                            muted
                            playsInline
                            preload="auto"
                            className="w-full aspect-video object-cover bg-gray-900"
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                          >
                            <source
                              src="/videos/how-to-install.mp4"
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>
                        </>
                      )}

                      {/* Play/Pause Overlay - Center of video */}
                      <button
                        onClick={togglePlayPause}
                        className="absolute inset-0 flex items-center justify-center bg-transparent hover:bg-black/10 transition-colors duration-200 group"
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                      >
                        <div className="w-16 h-16 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/35 transition-all duration-200 border-2 border-white/40 group-hover:scale-110 transform group-hover:border-white/60">
                          {isPlaying ? (
                            <svg
                              className="w-8 h-8 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <rect x="6" y="4" width="4" height="16" />
                              <rect x="14" y="4" width="4" height="16" />
                            </svg>
                          ) : (
                            <svg
                              className="w-8 h-8 text-white ml-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </div>
                      </button>
                    </div>
                  </TimelineContent>
                </div>

                {/* Installation Instructions Section */}
                <div className="px-8 pb-16 relative z-50">
                  <TimelineContent
                    as="div"
                    animationNum={2}
                    timelineRef={videoRef as React.RefObject<HTMLDivElement>}
                    customVariants={revealVariants}
                    className="max-w-4xl mx-auto"
                  >
                    <div className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-gray-700/50 p-8 space-y-8">
                      <h3 className="text-2xl font-semibold text-white mb-6">Step-by-Step Installation Instructions</h3>

                      {/* Step 1 */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/50 rounded-full flex items-center justify-center">
                            <span className="text-blue-400 font-medium text-sm">1</span>
                          </div>
                          <h4 className="text-lg font-medium text-white">Extract mindmic.zip</h4>
                        </div>
                        <p className="text-gray-300 ml-11">
                          Locate the downloaded file and double-click to extract it. This will directly create the Mindmic application file.
                        </p>
                      </div>

                      {/* Step 2 */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/50 rounded-full flex items-center justify-center">
                            <span className="text-blue-400 font-medium text-sm">2</span>
                          </div>
                          <h4 className="text-lg font-medium text-white">Open the app</h4>
                        </div>
                        <p className="text-gray-300 ml-11">
                          Locate the extracted Mindmic application file and double-click to launch it.
                        </p>
                      </div>

                      {/* Step 3 */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/50 rounded-full flex items-center justify-center">
                            <span className="text-blue-400 font-medium text-sm">3</span>
                          </div>
                          <h4 className="text-lg font-medium text-white">See the security warning</h4>
                        </div>
                        <p className="text-gray-300 ml-11">
                          macOS will show a security warning saying the app can't be opened because it's from an unidentified developer. This is normal and expected.
                        </p>
                        <div className="ml-11 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                          <p className="text-yellow-400 text-sm font-medium">• Expected Security Warning</p>
                        </div>
                      </div>

                      {/* Step 4 */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/50 rounded-full flex items-center justify-center">
                            <span className="text-blue-400 font-medium text-sm">4</span>
                          </div>
                          <h4 className="text-lg font-medium text-white">Go to System Settings</h4>
                        </div>
                        <p className="text-gray-300 ml-11">
                          Open System Settings, then navigate to Privacy & Security.
                        </p>
                        <div className="ml-11 p-3 bg-gray-800/50 border border-gray-600/50 rounded-lg">
                          <p className="text-gray-300 text-sm font-mono">System Settings → Privacy & Security</p>
                        </div>
                      </div>

                      {/* Step 5 */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/50 rounded-full flex items-center justify-center">
                            <span className="text-blue-400 font-medium text-sm">5</span>
                          </div>
                          <h4 className="text-lg font-medium text-white">Click "Open Anyway"</h4>
                        </div>
                        <p className="text-gray-300 ml-11">
                          Scroll down to the bottom of the Privacy & Security section. You'll see a message about Mindmic being blocked with an "Open Anyway" button. Click this button.
                        </p>
                      </div>

                      {/* Step 6 */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/50 rounded-full flex items-center justify-center">
                            <span className="text-blue-400 font-medium text-sm">6</span>
                          </div>
                          <h4 className="text-lg font-medium text-white">Confirm and launch</h4>
                        </div>
                        <p className="text-gray-300 ml-11">
                          A final confirmation dialog will appear. Click "Open" to complete the installation and launch Mindmic.
                        </p>
                      </div>

                      {/* Success Message */}
                      <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-green-400 font-medium text-center">✓ Installation Complete</p>
                      </div>

                      {/* Pro Tip Section */}
                      <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <h5 className="text-blue-400 font-semibold mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          Pro Tip
                        </h5>
                        <p className="text-gray-300">
                          You only need to complete these security steps once. After the initial installation, Mindmic will launch normally without any additional approvals.
                        </p>
                      </div>

                      {/* Why This Happens Section */}
                      <div className="mt-6 p-6 bg-gray-800/50 border border-gray-600/50 rounded-lg">
                        <h5 className="text-gray-200 font-semibold mb-2">Why This Happens</h5>
                        <p className="text-gray-300">
                          This security process protects you from potentially harmful software. Mindmic is safe to use, but since we're not (yet) in the Mac App Store, macOS requires this manual approval for your protection.
                        </p>
                      </div>
                    </div>
                  </TimelineContent>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
