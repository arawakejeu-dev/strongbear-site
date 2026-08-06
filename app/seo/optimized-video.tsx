"use client";

import { useEffect, useRef, useState } from "react";

type OptimizedVideoProps = {
  label: string;
  poster: string;
  slotId: string;
  sources: Array<{ src: string; type: string; media?: string }>;
  className?: string;
  autoplay?: boolean;
};

export function OptimizedVideo({ label, poster, slotId, sources, className, autoplay = true }: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(!autoplay);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) await video.play();
    else video.pause();
    setPaused(video.paused);
  };

  return <div className="hero-video-shell" data-media-slot={slotId} data-media-status="verified-academy">
    <video
      ref={videoRef}
      className={className}
      aria-label={label}
      poster={poster}
      autoPlay={autoplay}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      onPlay={() => setPaused(false)}
      onPause={() => setPaused(true)}
    >
      {sources.map((source) => <source key={source.src} src={source.src} type={source.type} media={source.media} />)}
    </video>
    <button className="hero-video-toggle" type="button" aria-pressed={paused} onClick={togglePlayback}>
      {paused ? "Lire la vidéo" : "Mettre en pause"}
    </button>
  </div>;
}
