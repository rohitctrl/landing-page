"use client"
import React from "react"
import { motion } from "motion/react"
import { ReactNode, useRef } from "react"

interface TimelineContentProps {
  children: ReactNode
  animationNum: number
  timelineRef: React.RefObject<HTMLDivElement>
  customVariants?: any
  as?: React.ElementType
  className?: string
}

export function TimelineContent({
  children,
  animationNum,
  timelineRef,
  customVariants,
  as: Component = "div",
  className = "",
}: TimelineContentProps) {
  return (
    <Component className={className}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
          root: timelineRef,
        }}
        custom={animationNum}
        variants={customVariants}
      >
        {children}
      </motion.div>
    </Component>
  )
}