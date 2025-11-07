"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { Sparkles } from "@/components/ui/sparkles";

interface EmailPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailPopover({ isOpen, onClose }: EmailPopoverProps) {
  const emailRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

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

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    setIsSubmitted(false);
    onClose();
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
            onClick={handleClose}
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            onClick={handleClose}
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
              className="w-full max-w-md bg-black rounded-2xl border border-gray-800 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative bg-black rounded-2xl"
                ref={emailRef}
              >
                {/* Background Effects */}
                <TimelineContent
                  as="div"
                  animationNum={1}
                  timelineRef={emailRef}
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
                  animationNum={3}
                  timelineRef={emailRef}
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

                {/* Content */}
                <div className="relative z-50 p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-medium text-white mb-4">
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
                        Wanna know more?
                      </VerticalCutReveal>
                    </h2>

                    <TimelineContent
                      as="div"
                      animationNum={0}
                      timelineRef={emailRef}
                      customVariants={revealVariants}
                      className="text-gray-300"
                    >
                      Express your interest by signing up for our product updates newsletter
                    </TimelineContent>
                  </div>

                  {/* Form */}
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-gray-900/70 transition-all"
                          required
                        />
                        {error && (
                          <p className="mt-2 text-sm text-red-400">{error}</p>
                        )}
                      </div>

                      <TimelineContent
                        as="div"
                        animationNum={1}
                        timelineRef={emailRef}
                        customVariants={revealVariants}
                      >
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-b from-white via-white/95 to-white/60 text-black hover:scale-105 active:scale-95 rounded-lg font-medium transition-all py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Signing up..." : "Sign up for updates"}
                        </button>
                      </TimelineContent>
                    </form>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium text-white mb-2">
                        Welcome to MindMic!
                      </h3>
                      <p className="text-gray-300 mb-6">
                        Check your email for a welcome message and exclusive updates about MindMic's features.
                      </p>
                      <TimelineContent
                        as="button"
                        animationNum={2}
                        timelineRef={emailRef}
                        customVariants={revealVariants}
                        onClick={handleClose}
                        className="bg-gradient-to-b from-white via-white/95 to-white/60 text-black hover:scale-105 active:scale-95 rounded-lg font-medium transition-all py-2 px-6"
                      >
                        Got it!
                      </TimelineContent>
                    </div>
                  )}

                  {/* Privacy Note */}
                  {!isSubmitted && (
                    <TimelineContent
                      as="div"
                      animationNum={2}
                      timelineRef={emailRef}
                      customVariants={revealVariants}
                      className="text-xs text-gray-400 text-center mt-6"
                    >
                      We respect your privacy. Unsubscribe at any time.
                    </TimelineContent>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}