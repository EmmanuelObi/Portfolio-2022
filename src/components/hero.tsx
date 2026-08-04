"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { GlobeIcon, MailIcon } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.5, ease: "easeOut" },
  }),
};

export function Hero() {
  const supporting = RESUME_DATA.summary.split(". ").slice(0, 2).join(". ") + ".";

  return (
    <header className="flex flex-col gap-10 border-b border-border pb-14 md:flex-row md:items-end md:justify-between md:gap-12 md:pb-16">
      <div className="flex-1 space-y-6">
        <motion.h1
          className="text-display-1 text-foreground"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {RESUME_DATA.name}
        </motion.h1>

        <motion.p
          className="text-subheading text-foreground/80"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {RESUME_DATA.about}
        </motion.p>

        <motion.p
          className="max-w-xl text-body text-muted-foreground"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {supporting}
        </motion.p>

        <motion.p
          className="flex items-center gap-1.5 text-body-sm text-muted-foreground"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <GlobeIcon className="h-3.5 w-3.5" />
          <a
            className="hover:text-primary hover:underline"
            href={RESUME_DATA.locationLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {RESUME_DATA.location}
          </a>
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-2 pt-1 print:hidden"
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {RESUME_DATA.contact.email && (
            <Button size="sm" asChild>
              <a href={`mailto:${RESUME_DATA.contact.email}`}>
                <MailIcon className="mr-1.5 h-3.5 w-3.5" />
                Email
              </a>
            </Button>
          )}
          {RESUME_DATA.contact.social.map((social) => (
            <Button key={social.name} variant="outline" size="sm" asChild>
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                <social.icon className="mr-1.5 h-3.5 w-3.5" />
                {social.name}
              </a>
            </Button>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="shrink-0 self-start md:self-end"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <Avatar className="h-28 w-28 rounded-full border border-border md:h-36 md:w-36">
          <AvatarImage
            alt={RESUME_DATA.name}
            src={RESUME_DATA.avatarUrl}
            className="object-cover"
          />
          <AvatarFallback className="rounded-full font-display text-2xl">
            {RESUME_DATA.initials}
          </AvatarFallback>
        </Avatar>
      </motion.div>
    </header>
  );
}
