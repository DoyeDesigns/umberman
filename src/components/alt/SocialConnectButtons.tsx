"use client";

/** Mobile base → fluid mid → hard cap at 419×117. */
const btnClassName =
  "group flex h-[52.5px] w-[188px] shrink-0 items-center justify-center gap-[0.55em] rounded-[22.43px] bg-white transition-colors " +
  "sm:h-[clamp(52.5px,7.5vw,117px)] sm:w-[clamp(188px,29vw,419px)] sm:rounded-[clamp(22.43px,3.5vw,50px)] sm:gap-[clamp(0.55em,1.2vw,1rem)]";

const iconMask =
  "shrink-0 bg-[#1C1C1C]/85 transition-colors [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain] group-hover:bg-[#F1F1F1]";

function MaskIcon({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`${iconMask} ${className ?? ""}`.trim()}
      style={{
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
      }}
    />
  );
}

type SocialConnectButtonsProps = {
  className?: string;
  gapClassName?: string;
  linkClassName?: string;
  onLinkClick?: () => void;
  tabIndex?: number;
};

export function SocialConnectButtons({
  className,
  gapClassName = "flex-col gap-[23px] sm:flex-row sm:gap-[100px] md:gap-[126px] lg:gap-[186px]",
  linkClassName,
  onLinkClick,
  tabIndex,
}: SocialConnectButtonsProps) {
  return (
    <div
      className={`mx-auto flex w-fit max-w-full items-center justify-center ${gapClassName} ${className ?? ""}`.trim()}
    >
      <a
        href="https://www.tiktok.com/@umberman"
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnClassName} hover:bg-[#CC587A] active:bg-[#CC587A] ${linkClassName ?? ""}`.trim()}
        aria-label="TikTok"
        tabIndex={tabIndex}
        onClick={onLinkClick}
      >
        <MaskIcon
          src="/tiktok.svg"
          className="h-[23px] w-[20px] sm:h-[clamp(23px,3.5vw,51px)] sm:w-[clamp(20px,3.1vw,45px)]"
        />
        <span className="text-connect-tiktok font-prose text-[#1C1C1C]/85 transition-colors group-hover:text-[#F1F1F1]">
          TikTok
        </span>
      </a>

      <a
        href="https://www.instagram.com/umbermanbybabajideolatunji"
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnClassName} hover:bg-[#AD7911] active:bg-[#AD7911] ${linkClassName ?? ""}`.trim()}
        aria-label="Instagram"
        tabIndex={tabIndex}
        onClick={onLinkClick}
      >
        <MaskIcon
          src="/instagram.svg"
          className="h-[26px] w-[25px] sm:h-[clamp(26px,4vw,58px)] sm:w-[clamp(25px,3.95vw,57px)]"
        />
        <MaskIcon
          src="/instagram-text.svg"
          className="mt-1.5! h-[25px] w-[82px] sm:mt-0 sm:h-[clamp(25px,4vw,57px)] sm:w-[clamp(82px,12.8vw,184px)]"
        />
      </a>
    </div>
  );
}
