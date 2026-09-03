import { Fragment, type ReactNode } from "react";

const KEEP_TOGETHER = [
  "Royal Academy Summer Exhibition",
  "John Randle Centre for Yorùbá Culture & History",
  "Ọbáfẹ́mi Awólọ́wọ̀ University",
  "Bank of England Museum",
  "Mott-Warsh Collection",
  "History of the Yorùbás",
  "The Book of Proverbs",
  "The Cowrie Project",
  "South Western Nigeria",
  "Babájídé Ọlátúnjí",
  "Ọlátúnjí's",
  "Ọlátúnjí",
  "Tribal Marks",
  "The Umberman",
  "United Kingdom",
  "United States",
  "30-somethings",
  "40-watt bulb",
  "77 times 7",
  "Ilé-Ifẹ̀",
  "Ìbàdàn",
  "Àrokò",
] as const;

function glueWords(text: string) {
  let next = text;
  for (const phrase of KEEP_TOGETHER) {
    next = next.split(phrase).join(phrase.replaceAll(" ", "\u00a0"));
  }
  return next.replace(/ (\S+)$/, "\u00a0$1");
}

type ProseParagraphProps = {
  text: string;
  className?: string;
};

export function ProseParagraph({ text, className }: ProseParagraphProps) {
  const lines = text.split("\n").filter((line) => line.length > 0);
  const nodes: ReactNode[] = lines.flatMap((line, index) => [
    index > 0 ? <br key={`br-${index}`} /> : null,
    <Fragment key={`line-${index}`}>{glueWords(line)}</Fragment>,
  ]);

  return <p className={className}>{nodes}</p>;
}
