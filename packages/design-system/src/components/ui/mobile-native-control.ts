"use client";

import * as React from "react";

function shouldUseNativeMobileControls() {
  if (typeof window === "undefined") return false;

  const isNarrowViewport = window.matchMedia("(max-width: 767px)").matches;
  const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const hasTouchPoints = typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;

  return isNarrowViewport && (hasCoarsePointer || hasTouchPoints);
}

export function useMobileNativeControl() {
  const [shouldUseNativeControl, setShouldUseNativeControl] = React.useState(false);

  React.useEffect(() => {
    const viewportQuery = window.matchMedia("(max-width: 767px)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    const update = () => setShouldUseNativeControl(shouldUseNativeMobileControls());

    update();
    viewportQuery.addEventListener("change", update);
    pointerQuery.addEventListener("change", update);

    return () => {
      viewportQuery.removeEventListener("change", update);
      pointerQuery.removeEventListener("change", update);
    };
  }, []);

  return shouldUseNativeControl;
}
