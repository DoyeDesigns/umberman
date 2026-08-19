import type { AltTheme } from "@/lib/design";

type AltLogoProps = {
  theme: AltTheme;
};

export function AltLogo({ theme }: AltLogoProps) {
  const { width, widthMobile, height, radius, gap } = theme.logoBar;
  const desktopBarStyle = {
    width,
    height,
    borderRadius: radius,
  };
  const mobileBarStyle = {
    width: widthMobile,
    height,
    borderRadius: radius,
  };

  return (
    <>
      <div className="flex flex-col md:hidden" style={{ gap }} aria-hidden>
        <span className="block shrink-0 bg-current" style={mobileBarStyle} />
        <span className="block shrink-0 bg-current" style={mobileBarStyle} />
      </div>
      <div className="hidden flex-col md:flex" style={{ gap }} aria-hidden>
        <span className="block shrink-0 bg-current" style={desktopBarStyle} />
        <span className="block shrink-0 bg-current" style={desktopBarStyle} />
      </div>
    </>
  );
}
