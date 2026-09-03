const KEEP_TOGETHER = [
  "Babájídé Ọlátúnjí",
  "The Umberman",
  "30-somethings",
  "40-watt bulb",
  "77 times 7",
] as const;

function glueWords(text: string) {
  let next = text.replace(/\s*\n\s*/g, " ").replace(/\s+/g, " ").trim();
  for (const phrase of KEEP_TOGETHER) {
    next = next.split(phrase).join(phrase.replaceAll(" ", "\u00a0"));
  }
  return next.replace(/ (\S{1,3})$/, "\u00a0$1");
}

type ProseParagraphProps = {
  text: string;
  className?: string;
};

export function ProseParagraph({ text, className }: ProseParagraphProps) {
  return <p className={className}>{glueWords(text)}</p>;
}
