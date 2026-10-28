"use client";

import React, { useEffect, useRef, useState } from "react";

interface CursorProps {
  size?: number;
}

export const Cursor: React.FC<CursorProps> = ({ size = 90 }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const target = useRef({ x: -size, y: -size });
  const current = useRef({ x: -size, y: -size });
  const [visible, setVisible] = useState(false);
  const [isHoverable, setIsHoverable] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) {
      setIsHoverable(false);
      return;
    }
    setIsHoverable(true);

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX - size / 2, y: e.clientY - size / 2 };
      const isOverZone = Boolean(
        (e.target as HTMLElement)?.closest?.("[data-cursor-zone]")
      );
      setVisible(isOverZone);
    };

    document.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    function animate() {
      current.current.x += (target.current.x - current.current.x) * 0.2;
      current.current.y += (target.current.y - current.current.y) * 0.2;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [size]);

  if (!isHoverable) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed left-0 top-0 z-50 rounded-full bg-white mix-blend-difference pointer-events-none transition-opacity duration-300"
      style={{ width: size, height: size, opacity: visible ? 1 : 0 }}
    />
  );
};

export default Cursor;
