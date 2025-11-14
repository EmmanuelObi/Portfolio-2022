"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Section({ className, ...props }: BadgeProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("flex min-h-0 flex-col gap-y-3", className)}
      {...props}
    />
  );
}
