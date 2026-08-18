import type { AltTheme } from "@/lib/design";

type AltLogoProps = {
  theme: AltTheme;
};

export function AltLogo({ theme }: AltLogoProps) {
  if (theme.logo === "circle-u") {
    const { borderWidth, letterSizeMobile, letterSizeDesktop, sizeMobile, sizeDesktop } =
      theme.logoCircle;

    return (
      <>
        <div
          className="flex shrink-0 items-center justify-center rounded-full md:hidden"
          style={{
            width: sizeMobile,
            height: sizeMobile,
            border: `${borderWidth}px solid ${theme.orange}`,
          }}
          aria-hidden
        >
          <span
            className="font-body font-normal leading-none"
            style={{ fontSize: letterSizeMobile, color: theme.orange }}
          >
            U
          </span>
        </div>
        <div
          className="hidden shrink-0 items-center justify-center rounded-full md:flex"
          style={{
            width: sizeDesktop,
            height: sizeDesktop,
            border: `${borderWidth}px solid ${theme.orange}`,
          }}
          aria-hidden
        >
          <span
            className="font-body font-normal leading-none"
            style={{ fontSize: letterSizeDesktop, color: theme.orange }}
          >
            U
          </span>
        </div>
      </>
    );
  }

  const { width, widthMobile, height, radius, gap } = theme.logoBar;
  const desktopBarStyle = {
    width,
    height,
    borderRadius: radius,
    backgroundColor: theme.orange,
  };
  const mobileBarStyle = {
    width: widthMobile,
    height,
    borderRadius: radius,
    backgroundColor: theme.orange,
  };

  return (
    <>
      <div className="flex flex-col md:hidden" style={{ gap }} aria-hidden>
        <span className="block shrink-0" style={mobileBarStyle} />
        <span className="block shrink-0" style={mobileBarStyle} />
      </div>
      <div className="hidden flex-col md:flex" style={{ gap }} aria-hidden>
        <span className="block shrink-0" style={desktopBarStyle} />
        <span className="block shrink-0" style={desktopBarStyle} />
      </div>
    </>
  );
}
