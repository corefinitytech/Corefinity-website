"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * The FuelSec film, hosted on YouTube. Until someone presses play, the page
 * carries only a local poster image: no YouTube script, iframe or cookie.
 * Pressing play swaps in the privacy enhanced embed, already playing.
 */
export default function FilmPlayer({
  videoId,
  poster,
  posterAlt,
  title,
  duration,
}: {
  videoId: string;
  poster: string;
  /** Describes the still shown before the film plays. */
  posterAlt: string;
  title: string;
  duration: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-[24px] border border-white/15 bg-black">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&cc_load_policy=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0"
        >
          <Image
            src={poster}
            alt={posterAlt}
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
          <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 shadow-2xl transition duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              className="ml-1 size-7 text-ink"
              fill="currentColor"
              aria-hidden
            >
              <path d="M7 4.5v15l12.5-7.5z" />
            </svg>
          </span>
          <span className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1 text-[11px] text-white/90 backdrop-blur-sm">
            Watch the story · {duration}
          </span>
        </button>
      )}
    </div>
  );
}
