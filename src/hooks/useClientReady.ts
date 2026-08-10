"use client";

import { useLayoutEffect, useState } from "react";

/** True after hydration — avoids server/client animation path mismatch on iOS. */
export function useClientReady() {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    setReady(true);
  }, []);

  return ready;
}
