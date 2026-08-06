import generatedVideo from "./generated-video.json";
import { OptimizedImage } from "./optimized-image";
import { OptimizedVideo } from "./optimized-video";

type GeneratedVideo = {
  ready: boolean;
  slotId: string;
  poster?: string;
  sources?: Array<{ src: string; type: string; media?: string }>;
};

export function HeroMedia() {
  const video = generatedVideo as GeneratedVideo;
  if (video.ready && video.poster && video.sources?.length) {
    return <OptimizedVideo
      className="hero-image"
      slotId={video.slotId}
      label="Entraînements et moments de communauté chez Strongbear à Marines"
      poster={video.poster}
      sources={video.sources}
    />;
  }
  return <OptimizedImage className="hero-image" source="/bjj-hero.jpg" alt="Entraînement technique au sol chez Strongbear à Marines" loading="eager" fetchPriority="high" sizes="100vw" />;
}
