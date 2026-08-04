import { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type LogoSource = string | StaticImageData;

function resolveSrc(logo: LogoSource): string {
  return typeof logo === "string" ? logo : logo.src;
}

export function LogoMark({
  logo,
  alt = "",
  className,
}: {
  logo: LogoSource;
  alt?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-secondary/50 p-1.5",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolveSrc(logo)}
        alt={alt}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
