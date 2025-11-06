"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";

interface Plan {
  name: string;
  description: string;
  price: number;
  buttonText: string;
  buttonVariant: "outline" | "default";
  popular?: boolean;
  checkoutUrl?: string;
  includes: string[];
}

const plans = [
  {
    name: "Trial",
    description: "Perfect for getting started with MindMic",
    price: 0,
    buttonText: "Start Free Trial",
    buttonVariant: "outline" as const,
    includes: [
      "Use every feature. No restrictions.",
    ],
  },
  {
    name: "Personal",
    description: "Best for individuals and solo creators",
    price: 49,
    buttonText: "Get Personal",
    buttonVariant: "default" as const,
    popular: true,
    checkoutUrl: "https://buy.polar.sh/polar_cl_CmoK6NNocTGFYLi2gXmRDBOo3fXj9hcvaUtde473Vsp",
    includes: [
      "Everything in Trial, plus:",
      "Lifetime license",
      "Unlimited transcription",
      "All AI providers",
      "Power Mode intelligence",
      "Local Whisper processing",
      "Priority support & updates",
      "Multi-device use (3 Macs)",
      "Export to all formats",
    ],
  },
  {
    name: "Team",
    description: "Ideal for teams and growing businesses",
    price: 199,
    buttonText: "Get Team License",
    buttonVariant: "outline" as const,
    checkoutUrl: "https://buy.polar.sh/polar_cl_ItaP3oIts3fFtuwQvWduRT7tjYs4piSi7GHwz23Qfk0",
    includes: [
      "Everything in Personal, plus:",
      "Volume licensing (5+ seats)",
      "Centralized deployment",
      "Priority enterprise support",
      "Custom AI configurations",
      "Advanced administrative controls",
      "SLA guarantee",
      "Training and onboarding",
    ],
  },
];


interface PricingPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export default function PricingPopover({ isOpen, onClose, onDownload }: PricingPopoverProps) {
  const pricingRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

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
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.3
              }}
              className="w-full max-w-6xl h-[90vh] bg-black rounded-2xl border border-gray-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="h-full mx-auto relative bg-black overflow-hidden rounded-2xl"
                ref={pricingRef}
              >
                {/* Background Effects */}
                <TimelineContent
                  animationNum={4}
                  timelineRef={pricingRef}
                  customVariants={revealVariants}
                  className="absolute top-0 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]"
                >
                  <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]"></div>
                  <Sparkles
                    density={1800}
                    speed={1}
                    color="#FFFFFF"
                    className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
                  />
                </TimelineContent>

                <TimelineContent
                  animationNum={5}
                  timelineRef={pricingRef}
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
                <div className="text-center mb-4 pt-20 max-w-3xl mx-auto space-y-1 relative z-50">
                  <h2 className="text-[38px] font-medium text-white">
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
                      Buy once, Own forever
                    </VerticalCutReveal>
                  </h2>

                  <TimelineContent
                    as="div"
                    animationNum={0}
                    timelineRef={pricingRef}
                    customVariants={revealVariants}
                    className="text-gray-300 text-base"
                  >
                    No subscriptions. No hidden fees — just lifetime access and powerful AI transcription.
                  </TimelineContent>
                </div>

                {/* Pricing Cards */}
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

                <div className="grid md:grid-cols-3 max-w-5xl gap-4 py-4 px-4 mx-auto">
                  {plans.map((plan, index) => (
                    <TimelineContent
                      key={plan.name}
                      as="div"
                      animationNum={2 + index}
                      timelineRef={pricingRef}
                      customVariants={revealVariants}
                    >
                      <Card
                        className={`relative text-white border-neutral-800 ${
                          plan.popular
                            ? "bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 shadow-[0px_-13px_300px_0px_#0900ff] z-20"
                            : "bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 z-10"
                        }`}
                      >
                        <CardHeader className="text-left pb-3">
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="text-[26px] mb-1">{plan.name}</h3>
                            {plan.popular && (
                              <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-sm whitespace-nowrap">
                                Popular
                              </span>
                            )}
                          </div>
                          <div className="flex items-baseline">
                            {plan.price > 0 ? (
                              <>
                                <span className="text-[32px] font-semibold">${plan.price}</span>
                                <span className="text-gray-300 ml-1 text-base">/month</span>
                              </>
                            ) : (
                              <span className="text-[32px] font-semibold">Free</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-300 mb-2">{plan.description}</p>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <button
                            className={`w-full mb-3 p-3 text-lg rounded-lg transition-all ${
                              plan.popular
                                ? "bg-gradient-to-t from-blue-500 to-blue-600 shadow-lg shadow-blue-800 border border-blue-500 text-white hover:from-blue-600 hover:to-blue-700"
                                : plan.buttonVariant === "outline"
                                  ? "bg-gradient-to-t from-neutral-950 to-neutral-600 shadow-lg shadow-neutral-900 border border-neutral-800 text-white hover:from-neutral-900 hover:to-neutral-700"
                                  : ""
                            }`}
                            onClick={() => {
                              if (plan.price === 0) {
                                onDownload();
                              } else if (plan.checkoutUrl) {
                                window.open(plan.checkoutUrl, '_blank');
                              }
                              onClose();
                            }}
                          >
                            {plan.buttonText}
                          </button>

                          <div className="space-y-2 pt-3 border-t border-neutral-700">
                            <h4 className="font-medium text-base mb-2">
                              {plan.includes[0]}
                            </h4>
                            <ul className="space-y-1.5">
                              {plan.includes.slice(1).map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center gap-2">
                                  <span className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                  <span className="text-sm text-gray-300">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </TimelineContent>
                  ))}
                </div>

                </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}