import { VARIANT_2, VARIANT_3 } from "@/lib/animations/config";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function pct(value: number) {
  return `${(value * 100).toFixed(2)}%`;
}

/** Inverse of delayV2Exit / delayV3Exit — scroll progress when delayed exit reaches t. */
function exitProgressAt(delay: number, delayedT: number) {
  return clamp(delay + delayedT * (1 - delay));
}

function mapExitScrollToView(progress: number) {
  return clamp(progress * 0.62 + 0.06, 0.06, 0.98);
}

/** Map Framer V2 word stagger math to CSS view-timeline animation-range. */
export function v2WordAnimationRanges(wordIndex: number, wordCount: number) {
  const n = Math.max(wordCount, 1);
  const stagger = VARIANT_2.lineTextStaggerSpan / n;
  const duration = VARIANT_2.lineTextWordDuration / n;

  const enterStart = wordIndex * stagger;
  const enterEnd = clamp(enterStart + duration, 0, 1);

  const enterStartView = enterStart * 0.58;
  const enterEndView = clamp(enterEnd * 0.58 + 0.42, 0.05, 1);

  const exitStagger = stagger * 1.35;
  const exitDuration = duration * 2.6;
  const exitDelay = VARIANT_2.exitDelay;
  const exitOffset = wordIndex * exitStagger * 0.75;

  const exitScrollStart = exitProgressAt(exitDelay, exitOffset);
  const exitScrollEnd = exitProgressAt(exitDelay, exitOffset + exitDuration);

  const exitStart = mapExitScrollToView(exitScrollStart);
  const exitEnd = mapExitScrollToView(exitScrollEnd);

  return {
    enterRange: `entry ${pct(enterStartView)} cover ${pct(enterEndView)}`,
    exitRange: `exit ${pct(exitStart)} exit ${pct(exitEnd)}`,
  };
}

/** Map Framer V3 transmission sentence math to CSS view-timeline ranges. */
export function v3SentenceAnimationRanges(sentenceIndex: number, sentenceCount: number) {
  const n = Math.max(sentenceCount, 1);
  const stagger = VARIANT_3.transmissionSentenceSpan / n;
  const duration = VARIANT_3.transmissionSentenceDuration / n;

  const enterStart = sentenceIndex * stagger;
  const enterEnd = clamp(enterStart + duration, 0, 1);

  const enterStartView = enterStart * 0.52;
  const enterEndView = clamp(enterEnd * 0.52 + 0.48, 0.06, 1);

  const exitStagger = stagger * 0.9;
  const exitDuration = duration * 2.2;
  const exitDelay = VARIANT_3.exitDelay;
  const exitOffset = sentenceIndex * exitStagger;

  const exitScrollStart = exitProgressAt(exitDelay, exitOffset);
  const exitScrollEnd = exitProgressAt(exitDelay, exitOffset + exitDuration);

  const exitStart = mapExitScrollToView(exitScrollStart);
  const exitEnd = mapExitScrollToView(exitScrollEnd);

  return {
    enterRange: `entry ${pct(enterStartView)} cover ${pct(enterEndView)}`,
    exitRange: `exit ${pct(exitStart)} exit ${pct(exitEnd)}`,
    scanRange: `entry ${pct(enterStartView + 0.04)} cover ${pct(enterEndView - 0.04)}`,
  };
}
