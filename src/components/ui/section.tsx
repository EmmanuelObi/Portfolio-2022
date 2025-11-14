"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface SectionProps extends Omit<HTMLMotionProps<"section">, "initial" | "whileInView" | "viewport" | "transition"> {}

export function Section({ className, ...props }: SectionProps) {
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
