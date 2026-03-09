"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "link" | "view";

const LERP_FACTOR = 0.14;

function lerp(start: number, end: number, alpha: number) {
  return start + (end - start) * alpha;
}

export default function Cursor() {
  const ringRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const magneticRef = useRef({ x: 0, y: 0 });
  const magneticTargetRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [isEnabled, setIsEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [isPressed, setIsPressed] = useState(false);
  const [dotVisible, setDotVisible] = useState(true);
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const supportsHover =
        window.matchMedia("(hover: hover)").matches &&
        window.matchMedia("(pointer: fine)").matches;
      setIsEnabled(supportsHover);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const handlePointerMove = (event: MouseEvent) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
      if (magneticTargetRef.current) {
        const rect = magneticTargetRef.current.getBoundingClientRect();
        magneticRef.current = {
          x: (rect.left + rect.width / 2 - event.clientX) * 0.18,
          y: (rect.top + rect.height / 2 - event.clientY) * 0.18,
        };
      }
      setDotPosition({ x: event.clientX, y: event.clientY });
    };

    const updateModeFromTarget = (target: EventTarget | null) => {
      const element = target as HTMLElement | null;
      if (!element) return;
      const cardTarget = element.closest("[data-cursor='view']");
      const linkTarget = element.closest("a, button, [data-cursor='link']");

      if (cardTarget) {
        setMode("view");
        setDotVisible(false);
        return;
      }

      if (linkTarget) {
        setMode("link");
        setDotVisible(false);
        return;
      }

      setMode("default");
      setDotVisible(true);
    };

    const handlePointerOver = (event: MouseEvent) => {
      updateModeFromTarget(event.target);
      const magneticTarget = (event.target as HTMLElement | null)?.closest(
        "[data-magnetic='true']",
      );
      if (magneticTarget instanceof HTMLElement) {
        magneticTargetRef.current = magneticTarget;
      } else {
        magneticTargetRef.current = null;
        magneticRef.current = { x: 0, y: 0 };
      }
    };

    const handlePointerOut = () => {
      magneticTargetRef.current = null;
      magneticRef.current = { x: 0, y: 0 };
    };

    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);

    const animate = () => {
      const desiredX = targetRef.current.x + magneticRef.current.x;
      const desiredY = targetRef.current.y + magneticRef.current.y;

      ringRef.current.x = lerp(ringRef.current.x, desiredX, LERP_FACTOR);
      ringRef.current.y = lerp(ringRef.current.y, desiredY, LERP_FACTOR);

      setRingPosition({
        x: ringRef.current.x,
        y: ringRef.current.y,
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mouseover", handlePointerOver);
    window.addEventListener("mouseout", handlePointerOut);
    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseover", handlePointerOver);
      window.removeEventListener("mouseout", handlePointerOut);
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  const springTransition = {
    type: "spring" as const,
    stiffness: 360,
    damping: 24,
  };

  const ringVariants = {
    default: {
      width: 44,
      height: 44,
      borderRadius: 999,
      borderColor: "rgba(59,191,176,0.85)",
      backgroundColor: "rgba(59,191,176,0.03)",
      scale: isPressed ? 0.7 : 1,
      transition: springTransition,
    },
    link: {
      width: 88,
      height: 88,
      borderRadius: 999,
      borderColor: "rgba(59,191,176,0.95)",
      backgroundColor: "rgba(59,191,176,0.15)",
      scale: isPressed ? 0.76 : 1,
      transition: springTransition,
    },
    view: {
      width: 132,
      height: 58,
      borderRadius: 18,
      borderColor: "rgba(59,191,176,0.95)",
      backgroundColor: "rgba(59,191,176,0.18)",
      scale: isPressed ? 0.84 : 1,
      transition: { type: "spring" as const, stiffness: 320, damping: 22 },
    },
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] hidden md:block">
      <AnimatePresence>
        {dotVisible && (
          <motion.span
            key="dot"
            className="absolute h-2.5 w-2.5 rounded-full bg-teal shadow-[0_0_14px_rgba(59,191,176,0.65)]"
            animate={{
              x: dotPosition.x - 5,
              y: dotPosition.y - 5,
              opacity: 1,
            }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="absolute flex items-center justify-center"
        animate={{
          x: ringPosition.x,
          y: ringPosition.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ duration: 0 }}
      >
        <motion.div
          className="relative flex items-center justify-center border border-teal/90 text-xs font-semibold tracking-[0.2em] text-teal"
          variants={ringVariants}
          animate={mode}
          initial="default"
        >
          <AnimatePresence>
            {mode === "view" && (
              <motion.span
                key="view"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                VIEW
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
