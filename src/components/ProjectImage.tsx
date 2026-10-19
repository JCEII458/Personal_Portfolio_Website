import Image from "next/image";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/utils";

type Props = {
  image: ImageAsset;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Renders a project image with an "Illustrative" label where applicable. */
export function ProjectImage({ image, sizes, priority, className }: Props) {
  return (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        unoptimized={image.src.endsWith(".svg")}
        className={cn("h-full w-full", image.src.endsWith(".svg") ? "object-contain" : "object-cover")}
      />
      {image.illustrative && (
        <span className="absolute top-3 left-3 rounded bg-navy-deep/85 px-2 py-1 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-sm">
          Illustrative
        </span>
      )}
    </div>
  );
}
