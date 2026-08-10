"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MEDIA = {
  day: {
    poster: "/mainAssets/hero-day-poster.webp",
    video: "/mainAssets/hero-background-video.mp4",
  },
  night: {
    poster: "/mainAssets/hero-night-poster.webp",
    video: "/mainAssets/hero-night-video.mp4",
  },
} as const;

export default function Hero() {
  const { poster: posterSrc, video: videoSrc } = MEDIA.day;
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlayState = () => setIsVideoPlaying(true);

    video.addEventListener("playing", handlePlayState);
    video.addEventListener("play", handlePlayState);
    video.addEventListener("canplay", handlePlayState);

    // If browser already started playing video from cache before React mount
    if (!video.paused || video.currentTime > 0 || video.readyState >= 3) {
      setIsVideoPlaying(true);
    }

    // Programmatically trigger play on mount to ensure autoplay works after refresh
    video.muted = true;
    video.play().then(() => {
      setIsVideoPlaying(true);
    }).catch(() => {
      // Autoplay fallback handled by poster
    });

    return () => {
      video.removeEventListener("playing", handlePlayState);
      video.removeEventListener("play", handlePlayState);
      video.removeEventListener("canplay", handlePlayState);
    };
  }, [videoSrc]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-overlay-ink text-overlay-cream">
      {/* Background image & video container */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterSrc}
          onPlay={() => setIsVideoPlaying(true)}
          onPlaying={() => setIsVideoPlaying(true)}
          className="absolute inset-0 h-full w-full object-cover sm:object-center"
        />

        <Image
          src={posterSrc}
          alt="Hero background poster"
          fill
          priority
          className={`object-cover transition-opacity duration-1000 ease-out ${isVideoPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(108deg,rgba(15,15,17,0.78)_0%,rgba(15,15,17,0.58)_27%,rgba(15,15,17,0.37)_46%,rgba(15,15,17,0.37)_68%,rgba(15,15,17,0.37)_84%)]" />

      {/* Foreground Content */}
      <div className="relative z-20 flex min-h-screen flex-col justify-between">
        <div className="h-16 shrink-0 sm:h-5" />

        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-[1460px] px-6 md:px-10 lg:px-20">
            <div className="max-w-[500px]">
              {/* Tagline */}
              <span className="block text-xs sm:text-sm font-semibold uppercase tracking-widest text-zinc-300/90">
                FULL-STACK · AI ENGINEER
              </span>

              {/* Main Headline */}
              <h1 className="mt-4 text-4xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.1]">
                Modern software,<br />
                built to think,<br />
                shipped end-to-end.
              </h1>

              {/* Subtitle description */}
              <p className="mt-6 text-base sm:text-lg text-zinc-300/90 leading-relaxed font-normal max-w-[600px]">
                I am a full-stack engineer designing and shipping AI-native products from the inference layer to the last interaction.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  render={<Link href="/#work" />}
                  className="!rounded-lg bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white px-6 py-3.5 h-auto text-base font-medium shadow-lg transition-all gap-2"
                >
                  View work <ArrowUpRight className="size-5" />
                </Button>

                <Button
                  render={<Link href="/#contact" />}
                  variant="outline"
                  className="!rounded-lg bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md px-6 py-3.5 h-auto text-base font-medium transition-all"
                >
                  Get in touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




