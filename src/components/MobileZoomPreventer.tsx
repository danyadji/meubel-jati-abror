"use client";

import { useEffect } from "react";

export default function MobileZoomPreventer() {
  useEffect(() => {
    // 1. Prevent multi-touch pinch zoom (2+ fingers on mobile screen)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        const target = e.target as HTMLElement | null;
        if (target && target.closest("[data-allow-zoom]")) {
          return;
        }
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        const target = e.target as HTMLElement | null;
        if (target && target.closest("[data-allow-zoom]")) {
          return;
        }
        e.preventDefault();
      }
    };

    // 2. Prevent Safari iOS gesture zoom (pinch gesture on iOS)
    const handleGestureStart = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest("[data-allow-zoom]")) {
        return;
      }
      e.preventDefault();
    };

    const handleGestureChange = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest("[data-allow-zoom]")) {
        return;
      }
      e.preventDefault();
    };

    // 3. Prevent trackpad / mouse pinch-to-zoom (Ctrl + wheel)
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        const target = e.target as HTMLElement | null;
        if (target && target.closest("[data-allow-zoom]")) {
          return;
        }
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("gesturestart", handleGestureStart);
    document.addEventListener("gesturechange", handleGestureChange);
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("gesturestart", handleGestureStart);
      document.removeEventListener("gesturechange", handleGestureChange);
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return null;
}
