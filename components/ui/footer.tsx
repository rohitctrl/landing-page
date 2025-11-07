"use client";

import React from "react";

const Footer = React.memo(() => {
  return (
    <footer className="w-full border-t border-gray-800/50 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Empty left section for future content */}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.producthunt.com/products/mindmic?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-mindmic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
              aria-label="View MindMic on Product Hunt"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1035136&theme=dark&t=1762503914208"
                alt="Mindmic - Context-Aware Voice Transcription for Mac | Product Hunt"
                style={{ width: "250px", height: "54px" }}
                width="250"
                height="54"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;