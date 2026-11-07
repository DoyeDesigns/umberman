"use client";

import Image from "next/image";
import { AltFadeUpReveal } from "@/components/animations/AltFadeUpReveal";

const OUT_NOW_IMAGE = "/out-now.png";

const PLATFORMS: { src: string; alt: string; href: string; className?: string }[] = [
  {
    src: "/patners/Vector.svg",
    alt: "Spotify",
    href: "https://open.spotify.com/album/7kWTNHPPr94Oj8uIjZAVj8",
  },
  {
    src: "/patners/youtube-music.svg",
    alt: "YouTube Music",
    href: "https://music.youtube.com/playlist?list=OLAK5uy_kZz2BwNUIRKksBqQHVD6GXG0kWmarKsSs",
  },
  {
    src: "/patners/boomplay.svg",
    alt: "Boomplay",
    href: "https://www.boomplay.com/albums/EQUi17BcA1OvgfycyTJPm0zA?srModel=openapi_featurefm&ffm=FFM_30a23041a747645c16ed790cc6873c93",
  },
  {
    src: "/patners/apple-music.svg",
    alt: "Apple Music",
    href: "https://music.apple.com/ng/album/umberman/6813490150",
  },
  {
    src: "/patners/amazon-music.svg",
    alt: "Amazon Music",
    href: "https://music.amazon.com/albums/B0HK8Y3WP3?ref=dm_ff_amazonmusic_3p",
  },
  {
    src: "/patners/deezer.svg",
    alt: "Deezer",
    href: "https://www.deezer.com/us/album/1081754522",
  },
  {
    src: "/patners/youtube.svg",
    alt: "YouTube",
    href: "https://www.youtube.com/playlist?list=OLAK5uy_kZz2BwNUIRKksBqQHVD6GXG0kWmarKsSs",
  },
  {
    src: "/patners/tidal.svg",
    alt: "Tidal",
    href: "https://tidal.com/album/562244174",
  },
  {
    src: "/patners/itunes.svg",
    alt: "iTunes Store",
    href: "https://music.apple.com/ng/album/umberman/6813490150",
    className: "col-start-2",
  },
  {
    src: "/patners/anghami.svg",
    alt: "Anghami",
    href: "https://play.anghami.com/album/1100346961?refer=featurefm&ffm=FFM_c0fb6c7a5b2930bfa4bb33548618393e",
    className: "col-start-3",
  },
];

export function OutNowSection() {
  return (
    <section
      id="out-now"
      className="w-full max-w-full scroll-mt-[100px] bg-[#18225E] pt-[33px] md:pt-[50px] pb-[60px] border-y-8 md:border-y-14 lg:border-y-20 border-[#F1F1F1]/60"
    >
      <div className="section-px mx-auto flex w-full max-w-[min(100%,80rem)] flex-col items-center">
        <AltFadeUpReveal>
          <h2 className="text-out-now text-center md:mt-10 mt-5 font-heading font-normal text-[#F1F1F1]">
            OUT NOW...
          </h2>
        </AltFadeUpReveal>

        <AltFadeUpReveal delay={0.08} className="mt-[clamp(1.25rem,3vw,2rem)] w-full max-w-[min(100%,42rem)]">
          <Image
            src={OUT_NOW_IMAGE}
            alt="Umberman by Babájídé Ọlátúnjí — album artwork"
            width={1233}
            height={850}
            sizes="(max-width: 768px) 90vw, 42rem"
            quality={80}
            priority
            className="pointer-events-none block h-auto w-full rounded-[15px] object-contain md:rounded-[50px]"
          />
        </AltFadeUpReveal>

        <AltFadeUpReveal delay={0.14} className="mt-[clamp(1.5rem,4vw,2.5rem)]">
          <p className="text-out-platforms text-center font-prose text-[#F1F1F1]">
            Available on all platforms
          </p>
        </AltFadeUpReveal>

        <AltFadeUpReveal delay={0.2} className="w-full max-w-[min(100%,52rem)] mt-[50px] sm:mt-[70px] sm:mt-[70px]">
          <ul className="mx-auto grid w-full grid-cols-4 items-center justify-items-center gap-x-[clamp(0.5rem,3vw,2.5rem)] gap-y-[clamp(1rem,3vw,2rem)]">
            {PLATFORMS.map((platform) => (
              <li key={platform.alt} className={platform.className}>
                <a
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Listen on ${platform.alt}`}
                  className="inline-flex transition-opacity hover:opacity-70"
                >
                  <img
                    src={platform.src}
                    alt=""
                    width={200}
                    height={48}
                    className="h-[clamp(0.875rem,2.2vw,1.75rem)] text-[#F1F1F1] w-auto max-w-full object-contain opacity-90"
                  />
                </a>
              </li>
            ))}
          </ul>
        </AltFadeUpReveal>
      </div>
    </section>
  );
}
