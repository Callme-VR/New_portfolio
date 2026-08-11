
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Clock3,
  MapPin,
  Thermometer,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "../ui/button";
import Widget from "./widget";
import type { DayNightMode } from "./widget";

import {
  FALLBACK_GEO_LOCATION,
  getCurrentTime,
  getTemperature,
  getUserGeoLocation,
  type GeoLocation,
} from "@/lib/StaticContent/location";

/* -------------------------------------------------------------------------- */
/*                              HERO MEDIA                                    */
/* -------------------------------------------------------------------------- */

/**
 * Background media for each day/night mode.
 *
 * Keeping all media configuration here makes it easy
 * to replace videos or posters later.
 */
const MEDIA: Record<
  DayNightMode,
  {
    poster: string;
    video: string;
  }
> = {
  day: {
    poster: "/mainAssets/hero-day-poster.webp",
    video: "/mainAssets/hero-background-video.mp4",
  },

  night: {
    poster: "/mainAssets/hero-night-poster.webp",
    video: "/mainAssets/hero-night-video.mp4",
  },
};

/* -------------------------------------------------------------------------- */
/*                                  HERO                                      */
/* -------------------------------------------------------------------------- */

export default function Hero() {
  /* ------------------------------------------------------------------------ */
  /*                                STATE                                     */
  /* ------------------------------------------------------------------------ */

  // Current day/night mode.
  const [mode, setMode] = useState<DayNightMode>("day");

  // Controls poster → video transition.
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // User's approximate location.
  const [location, setLocation] = useState<GeoLocation>(
    FALLBACK_GEO_LOCATION,
  );

  // Current temperature.
  const [temperature, setTemperature] = useState<number | null>(null);

  // Current local time for the detected timezone.
  const [time, setTime] = useState(() =>
    getCurrentTime(FALLBACK_GEO_LOCATION.timezone),
  );

  // Background video reference.
  const videoRef = useRef<HTMLVideoElement>(null);

  // Active background media.
  const { poster: posterSrc, video: videoSrc } = MEDIA[mode];

  /* ------------------------------------------------------------------------ */
  /*                         GEO LOCATION + WEATHER                            */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    let cancelled = false;

    async function loadLocationData() {
      try {
        /*
         * Step 1:
         * Detect the visitor's approximate location.
         */
        const userLocation = await getUserGeoLocation();

        if (cancelled) return;

        setLocation(userLocation);

        /*
         * Step 2:
         * Use latitude and longitude to fetch
         * the current temperature.
         */
        const weather = await getTemperature(
          userLocation.latitude,
          userLocation.longitude,
        );

        if (cancelled) return;

        setTemperature(weather?.temperature ?? null);
      } catch {
        /*
         * External services should never break
         * the Hero component.
         */
        if (cancelled) return;

        setLocation(FALLBACK_GEO_LOCATION);
        setTemperature(null);
      }
    }

    loadLocationData();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /*                              LIVE CLOCK                                  */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    /*
     * Update immediately when the timezone changes.
     */
    setTime(getCurrentTime(location.timezone));

    /*
     * Keep the clock live.
     */
    const interval = window.setInterval(() => {
      setTime(getCurrentTime(location.timezone));
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [location.timezone]);

  /* ------------------------------------------------------------------------ */
  /*                            VIDEO HANDLING                                */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    // Show poster while the new video loads.
    setIsVideoPlaying(false);

    const handlePlaying = () => {
      setIsVideoPlaying(true);
    };

    /*
     * "playing" confirms that the browser
     * has actually started playback.
     */
    video.addEventListener("playing", handlePlaying);

    // Required for reliable autoplay.
    video.muted = true;

    // Reload the selected video.
    video.load();

    /*
     * Try to start playback programmatically.
     */
    video
      .play()
      .then(() => {
        setIsVideoPlaying(true);
      })
      .catch(() => {
        /*
         * If autoplay is blocked, the poster
         * remains visible as a fallback.
         */
        setIsVideoPlaying(false);
      });

    // Cleanup when video changes/unmounts.
    return () => {
      video.removeEventListener("playing", handlePlaying);
      video.pause();
    };
  }, [videoSrc]);

  /* ------------------------------------------------------------------------ */
  /*                                RENDER                                    */
  /* ------------------------------------------------------------------------ */

  return (
    <section className="relative min-h-screen overflow-hidden bg-overlay-ink text-overlay-cream">
      {/* ================================================================== */}
      {/*                         BACKGROUND MEDIA                           */}
      {/* ================================================================== */}

      <div className="absolute inset-0">
        {/* Background video */}
        <video
          ref={videoRef}
          key={videoSrc}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterSrc}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          onPlaying={() => setIsVideoPlaying(true)}
        />

        {/*
         * Poster fallback.
         *
         * Visible while:
         * - video is loading
         * - autoplay is blocked
         * - switching between day/night
         *
         * Fades out once the video starts playing.
         */}
        <Image
          src={posterSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ease-in-out ${isVideoPlaying
            ? "pointer-events-none opacity-0"
            : "opacity-100"
            }`}
        />
      </div>

      {/* ================================================================== */}
      {/*                              OVERLAYS                               */}
      {/* ================================================================== */}

      {/* Main readability gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-[linear-gradient(108deg,rgba(15,15,17,0.78)_0%,rgba(15,15,17,0.58)_27%,rgba(15,15,17,0.37)_46%,rgba(15,15,17,0.37)_68%,rgba(15,15,17,0.37)_84%)]"
      />

      {/* Subtle top gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-32 bg-[linear-gradient(to_bottom,rgba(15,15,17,0.55)_0%,rgba(15,15,17,0.18)_55%,rgba(15,15,17,0)_100%)]"
      />

      {/* ================================================================== */}
      {/*                         FOREGROUND CONTENT                          */}
      {/* ================================================================== */}

      <div className="relative z-20 flex min-h-screen flex-col justify-between">
        {/* ---------------------------------------------------------------- */}
        {/*                         MAIN CONTENT                             */}
        {/* ---------------------------------------------------------------- */}

        <div className="relative flex flex-1 items-center">
          <div className="mx-auto w-full max-w-[1460px] px-6 md:px-10 lg:px-20">
            <div className="max-w-[500px]">
              {/* Role / tagline */}
              <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300/90 sm:text-sm">
                FULL-STACK · AI ENGINEER
              </span>

              {/* Main heading */}
              <h1 className="mt-4 text-4xl font-normal leading-[1.1] tracking-tight text-white lg:text-5xl">
                Modern software,
                <br />
                built to think,
                <br />
                shipped end-to-end.
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-[600px] text-base font-normal leading-relaxed text-zinc-300/90 sm:text-lg">
                I am a full-stack engineer designing and shipping AI-native
                products from the inference layer to the last interaction.
              </p>

              {/* ---------------------------------------------------------- */}
              {/*                            CTA                             */}
              {/* ---------------------------------------------------------- */}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                {/* Primary CTA */}
                <Button
                  render={<Link href="/#work" />}
                  className="group h-auto gap-2 rounded-lg! bg-[#FF4D00] px-6 py-3.5 text-base font-medium text-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#FF4D00]/90 hover:shadow-xl"
                >
                  View work

                  <ArrowUpRight className="size-5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>

                {/* Secondary CTA */}
                <Button
                  render={<Link href="/#contact" />}
                  variant="outline"
                  className="h-auto rounded-lg! border-white/20 bg-white/10 px-6 py-3.5 text-base font-medium text-white backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Get in touch
                </Button>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/*                       DAY / NIGHT TOGGLE                       */}
          {/* -------------------------------------------------------------- */}

          <div className="absolute right-5 top-1/3 z-30 -translate-y-1/2 transition-transform duration-500 ease-out sm:right-10 lg:right-16">
            <Widget value={mode} onChange={setMode} />
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*                            BOTTOM BAR                             */}
        {/* ---------------------------------------------------------------- */}

        <div className="shrink-0 pb-7 sm:pb-9">
          <div className="mx-auto flex w-full max-w-370 flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center sm:px-10 lg:px-14">
            {/* ------------------------------------------------------------ */}
            {/*                     AVAILABILITY                             */}
            {/* ------------------------------------------------------------ */}

            <p className="inline-flex items-center gap-2 rounded border border-overlay-cream/20 bg-overlay-ink/40 px-3 py-1.5 font-mono text-[12px] tracking-[0.35em] text-overlay-cream/90 backdrop-blur-sm">
              {/* Animated online indicator */}
              <span className="relative inline-flex size-3 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/70" />
                <span className="relative inline-flex size-3 rounded-full bg-success" />
              </span>

              Available for work
            </p>

            {/* ------------------------------------------------------------ */}
            {/*                  LOCATION / WEATHER / CLOCK                  */}
            {/* ------------------------------------------------------------ */}

            <div className="flex items-center gap-4 text-sm font-medium text-overlay-cream/70">
              {/* Scroll indicator */}
              <div className="flex items-center gap-3">
                <ArrowDown
                  aria-hidden="true"
                  className="size-4 text-overlay-cream/60"
                />

                <span className="uppercase tracking-[0.15em]">
                  Scroll
                </span>

                <span className="h-px w-10 bg-overlay-cream/25" />
              </div>

              {/* Live location information */}
              <div className="hidden items-center gap-4 text-overlay-cream/60 sm:flex">
                {/* City */}
                <div className="flex items-center gap-1.5">
                  <MapPin
                    aria-hidden="true"
                    className="size-3.5 text-overlay-cream/50"
                    strokeWidth={1.8}
                  />

                  <span className="tracking-wide">
                    {location.city}
                  </span>
                </div>

                {/* Separator */}
                <span
                  aria-hidden="true"
                  className="text-overlay-cream/20"
                >
                  ·
                </span>

                {/* Temperature */}
                <div className="flex items-center gap-1.5">
                  <Thermometer
                    aria-hidden="true"
                    className="size-3.5 text-overlay-cream/50"
                    strokeWidth={1.8}
                  />

                  <span className="tabular-nums">
                    {temperature !== null
                      ? `${temperature}°C`
                      : "--°C"}
                  </span>
                </div>

                {/* Separator */}
                <span
                  aria-hidden="true"
                  className="text-overlay-cream/20"
                >
                  ·
                </span>

                {/* Live clock */}
                <div className="flex items-center gap-1.5">
                  <Clock3
                    aria-hidden="true"
                    className="size-3.5 text-overlay-cream/50"
                    strokeWidth={1.8}
                  />

                  <span className="tabular-nums">
                    {time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

