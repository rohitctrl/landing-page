"use client";

import React, { useState } from "react";
import Image from "next/image";
import PricingPopover from "./pricing-popover";
import VideoPopover from "./video-popover";
import { FeaturesPopover } from "./features-popover";
import { DownloadConfirmationDialog } from "./download-confirmation-dialog";

// Inline Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "gradient";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "default",
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "bg-white text-black hover:bg-gray-100",
      secondary: "bg-gray-800 text-white hover:bg-gray-700",
      ghost: "hover:bg-gray-800/50 text-white",
      gradient:
        "bg-gradient-to-b from-white via-white/95 to-white/60 text-black hover:scale-105 active:scale-95",
    };

    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-10 px-5 text-sm",
      lg: "h-12 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

// Icons
const ArrowRight = ({
  className = "",
  size = 16,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const Apple = ({
  className = "",
  size = 16,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const Menu = ({
  className = "",
  size = 24,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const X = ({
  className = "",
  size = 24,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// Navigation Component
const Navigation = React.memo(({ onPricingClick, onVideoClick, onDownload }: {
  onPricingClick: () => void;
  onVideoClick: () => void;
  onDownload: () => void;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-gray-800/50 bg-black/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/mindmic-logo.png"
              alt="MindMic Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-medium text-white">MindMic</span>
          </div>

          <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <FeaturesPopover onDownload={onDownload} onVideoClick={onVideoClick} />
            <button
              onClick={onVideoClick}
              className="text-sm text-white/60 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 active:shadow-md active:shadow-blue-500/10 transition-all duration-200 outline-none focus:outline-none"
            >
              How to Install
            </button>
            <button
              onClick={onPricingClick}
              className="text-sm text-white/60 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 active:shadow-md active:shadow-blue-500/10 transition-all duration-200 outline-none focus:outline-none"
            >
              Pricing
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onDownload}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black hover:bg-gray-100 h-10 px-5 text-sm"
            >
              7-day free
            </button>
          </div>

          <button
            type="button"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800/50 animate-[slideDown_0.3s_ease-out]">
          <div className="px-6 py-4 flex flex-col gap-4">
            <div onClick={() => setMobileMenuOpen(false)}>
              <FeaturesPopover onDownload={onDownload} onVideoClick={onVideoClick} />
            </div>
            <button
              className="text-sm text-white/60 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 active:shadow-md active:shadow-blue-500/10 transition-all duration-200 py-2 text-left w-full outline-none focus:outline-none"
              onClick={() => {
                setMobileMenuOpen(false);
                onVideoClick();
              }}
            >
              How to Install
            </button>
            <button
              className="text-sm text-white/60 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 active:shadow-md active:shadow-blue-500/10 transition-all duration-200 py-2 text-left w-full outline-none focus:outline-none"
              onClick={() => {
                setMobileMenuOpen(false);
                onPricingClick();
              }}
            >
              Pricing
            </button>
            <div className="flex flex-col gap-2 pt-4 border-gray-800/50">
              <button
                onClick={onDownload}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black hover:bg-gray-100 h-10 px-5 text-sm"
              >
                7-day free
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

Navigation.displayName = "Navigation";

// Hero Component
const Hero = React.memo(({ onDownload }: { onDownload: () => void }) => {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-start px-6 py-20 md:py-24"
      style={{
        animation: "fadeIn 0.6s ease-out",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <a
        href="https://www.producthunt.com/products/mindmic?launch=mindmic"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-8 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm max-w-full hover:bg-gray-700/70 transition-colors group"
        aria-label="Visit MindMic on Product Hunt"
      >
        <span
          className="text-xs text-center whitespace-nowrap group-hover:text-white transition-colors"
          style={{ color: "#9ca3af" }}
        >
          Product Hunt Launch
        </span>
        <span className="text-xs whitespace-nowrap group-hover:scale-110 transition-transform">
          🎉
        </span>
      </a>

      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-medium text-center max-w-3xl px-6 leading-tight mb-6"
        style={{
          background:
            "linear-gradient(to bottom, #ffffff, #ffffff, rgba(255, 255, 255, 0.6))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.05em",
        }}
      >
        Think out loud. <br />
        <span className="italic lowercase">mindmic </span> writes it down
      </h1>

      <p
        className="text-sm md:text-base text-center max-w-2xl px-6 mb-10"
        style={{ color: "#9ca3af" }}
      >
        Built for makers, thinkers, and creators who move fast.<br />
        MindMic helps you capture thoughts before they fade.
      </p>

      <div className="flex items-center gap-4 relative z-10 mb-16">
        <button
          onClick={onDownload}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-b from-white via-white/95 to-white/60 text-black hover:scale-105 active:scale-95 rounded-lg h-12 px-8 text-base"
          aria-label="Download MindMic AI Voice Transcription"
        >
          <Apple size={20} />
          Download now
        </button>
      </div>

      <div className="w-full max-w-5xl relative pb-20">
        <div
          className="absolute left-1/2 w-[90%] pointer-events-none z-0"
          style={{
            top: "-23%",
            transform: "translateX(-50%)",
            height: "500px",
            background: "radial-gradient(circle at center, rgba(2, 123, 255, 0.4) 0%, rgba(2, 123, 255, 0.2) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-auto rounded-lg shadow-2xl"
          >
            <source src="/videos/new.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <button
            onClick={onDownload}
            className="absolute bottom-16 left-1/2 transform -translate-x-2 px-8 py-3 md:px-10 md:py-4 rounded-lg font-medium transition-all duration-200 z-20"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translate(calc(-50% - 8px)) scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(calc(-50% - 8px)) scale(1)";
            }}
            aria-label="Download MindMic from video"
          />
          
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

// Main Component
export default function Component() {
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [showDownloadConfirm, setShowDownloadConfirm] = useState(false);

  const handleDownloadClick = () => {
    setShowDownloadConfirm(true);
  };

  const handleConfirmDownload = () => {
    window.open('/mindmic.zip', '_blank');
    
    setTimeout(() => {
      setIsVideoOpen(true);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation
        onPricingClick={() => setIsPricingOpen(true)}
        onVideoClick={() => setIsVideoOpen(true)}
        onDownload={handleDownloadClick}
      />
      <Hero onDownload={handleDownloadClick} />
      <PricingPopover
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onDownload={handleDownloadClick}
      />
      <VideoPopover isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      <DownloadConfirmationDialog
        isOpen={showDownloadConfirm}
        onClose={() => setShowDownloadConfirm(false)}
        onConfirm={handleConfirmDownload}
      />
    </main>
  );
}
