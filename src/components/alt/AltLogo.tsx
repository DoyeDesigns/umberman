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

  const { width, height, radius, gap } = theme.logoBar;
  const barStyle = {
    width,
    height,
    borderRadius: radius,
    backgroundColor: theme.orange,
  };

  return (
    <div className="flex flex-col" style={{ gap }} aria-hidden>
      <span className="block shrink-0" style={barStyle} />
      <span className="block shrink-0" style={barStyle} />
    </div>
  );
}
