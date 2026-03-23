"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { DevdopzLogo } from "@/components/devdopz-logo";

type HeroMotionStyle = CSSProperties & {
  "--pointer-x": string;
  "--pointer-y": string;
  "--tilt-x": string;
  "--tilt-y": string;
};

const initialHeroMotionStyle: HeroMotionStyle = {
  "--pointer-x": "50%",
  "--pointer-y": "50%",
  "--tilt-x": "0",
  "--tilt-y": "0",
};

export function HeroScene() {
  const sceneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) {
      return undefined;
    }

    let frame = 0;

    const updateMotion = (pointerX: number, pointerY: number) => {
      const normalizedX = (pointerX - 0.5) * 2;
      const normalizedY = (pointerY - 0.5) * 2;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        scene.style.setProperty("--pointer-x", `${pointerX * 100}%`);
        scene.style.setProperty("--pointer-y", `${pointerY * 100}%`);
        scene.style.setProperty("--tilt-x", normalizedX.toFixed(3));
        scene.style.setProperty("--tilt-y", normalizedY.toFixed(3));
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = scene.getBoundingClientRect();
      const pointerX = (event.clientX - bounds.left) / bounds.width;
      const pointerY = (event.clientY - bounds.top) / bounds.height;

      updateMotion(
        Math.min(Math.max(pointerX, 0), 1),
        Math.min(Math.max(pointerY, 0), 1),
      );
    };

    const resetMotion = () => updateMotion(0.5, 0.5);

    resetMotion();
    scene.addEventListener("pointermove", handlePointerMove);
    scene.addEventListener("pointerleave", resetMotion);

    return () => {
      cancelAnimationFrame(frame);
      scene.removeEventListener("pointermove", handlePointerMove);
      scene.removeEventListener("pointerleave", resetMotion);
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="glass-panel hero-scene-shell hero-scene-frame relative isolate overflow-hidden rounded-[2.75rem] px-5 py-5 sm:px-7 sm:py-7"
      style={initialHeroMotionStyle}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--pointer-x)_var(--pointer-y),rgba(47,102,255,0.2),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.88))]" />
      <div className="hero-stage-grid absolute inset-4 rounded-[2.15rem] sm:inset-5" />
      <div className="hero-scene-vignette absolute inset-4 rounded-[2.15rem] sm:inset-5" />

      <div className="relative flex min-h-[29rem] items-center justify-center sm:min-h-[35rem]">
        <div
          className="hero-pointer-halo absolute h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(47,102,255,0.16),transparent_72%)] blur-3xl"
          style={{
            left: "var(--pointer-x)",
            top: "var(--pointer-y)",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div
          className="absolute inset-x-9 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/12 to-transparent"
          style={{
            transform:
              "translate3d(calc(var(--tilt-x) * -6px), calc(-50% + (var(--tilt-y) * -6px)), 0)",
          }}
        />

        <div
          className="absolute inset-y-9 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent/12 to-transparent"
          style={{
            transform:
              "translate3d(calc(-50% + (var(--tilt-x) * 6px)), calc(var(--tilt-y) * 6px), 0)",
          }}
        />

        <div
          className="absolute"
          style={{
            transform:
              "translate3d(calc(var(--tilt-x) * 10px), calc(var(--tilt-y) * 10px), 0)",
          }}
        >
          <div className="orbit-ring h-[22rem] w-[22rem] rounded-full border border-dashed border-accent/14 sm:h-[28rem] sm:w-[28rem]" />
        </div>

        <div
          className="absolute h-[15rem] w-[15rem] rounded-full border border-accent/10 sm:h-[20rem] sm:w-[20rem]"
          style={{
            transform:
              "translate3d(calc(var(--tilt-x) * -8px), calc(var(--tilt-y) * -8px), 0)",
          }}
        />

        <div
          className="hero-float absolute left-5 top-5 rounded-[1.5rem] border border-accent/10 bg-white px-4 py-4 shadow-[var(--card-shadow)] sm:left-8 sm:top-8 sm:px-5"
          style={{
            transform:
              "translate3d(calc(var(--tilt-x) * -14px), calc(var(--tilt-y) * -12px), 0)",
          }}
        >
          <p className="code-pill text-[0.66rem] uppercase tracking-[0.22em] text-foreground/42">
            Since
          </p>
          <p className="mt-2 text-2xl font-medium tracking-[-0.06em] text-foreground">
            2024
          </p>
        </div>

        <div
          className="hero-float-delayed absolute bottom-5 left-5 rounded-full border border-accent/10 bg-white px-4 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-accent/72 shadow-[var(--card-shadow)] sm:bottom-8 sm:left-8"
          style={{
            transform:
              "translate3d(calc(var(--tilt-x) * -12px), calc(var(--tilt-y) * 10px), 0)",
          }}
        >
          Build together
        </div>

        <div
          className="hero-float-delayed absolute right-5 top-8 rounded-[1.5rem] border border-accent/10 bg-white px-4 py-4 shadow-[var(--card-shadow)] sm:right-8 sm:top-10 sm:px-5"
          style={{
            transform:
              "translate3d(calc(var(--tilt-x) * 14px), calc(var(--tilt-y) * -12px), 0)",
          }}
        >
          <p className="code-pill text-[0.66rem] uppercase tracking-[0.22em] text-foreground/42">
            Organization
          </p>
          <p className="mt-2 text-2xl font-medium tracking-[-0.06em] text-foreground">
            2026
          </p>
        </div>

        <div
          className="hero-float relative flex h-60 w-60 flex-col items-center justify-center rounded-[2.5rem] border border-accent/12 bg-white text-center shadow-[var(--hero-shadow)] sm:h-80 sm:w-80"
          style={{
            transform:
              "perspective(1400px) rotateX(calc(var(--tilt-y) * -6deg)) rotateY(calc(var(--tilt-x) * 6deg))",
          }}
        >
          <div className="absolute inset-4 rounded-[2rem] border border-accent/10 sm:inset-5" />
          <div className="absolute inset-8 rounded-[1.6rem] border border-accent/8 sm:inset-10" />
          <div className="absolute inset-x-10 top-10 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
          <div className="absolute inset-x-10 bottom-10 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-accent/10 bg-white shadow-[var(--card-shadow)] sm:h-[8.5rem] sm:w-[8.5rem]">
            <DevdopzLogo size={94} />
          </div>

          <div className="mt-7 space-y-3">
            <p className="code-pill text-[0.68rem] uppercase tracking-[0.24em] text-accent/70">
              Devdopz
            </p>
            <p className="max-w-[9ch] text-2xl font-medium leading-[1.02] tracking-[-0.06em] text-foreground sm:text-[2rem]">
              Learn. Build. Launch.
            </p>
          </div>
        </div>

        <div
          className="hero-dot absolute left-[24%] top-[30%] h-3 w-3 rounded-full bg-accent"
          style={{
            transform:
              "translate3d(calc(var(--tilt-x) * -18px), calc(var(--tilt-y) * -14px), 0)",
          }}
        />

        <div
          className="hero-dot hero-dot-delayed absolute right-[22%] top-[34%] h-2.5 w-2.5 rounded-full bg-accent"
          style={{
            transform:
              "translate3d(calc(var(--tilt-x) * 18px), calc(var(--tilt-y) * -10px), 0)",
          }}
        />

        <div
          className="hero-dot absolute bottom-[24%] right-[28%] h-3 w-3 rounded-full bg-accent"
          style={{
            transform:
              "translate3d(calc(var(--tilt-x) * 14px), calc(var(--tilt-y) * 14px), 0)",
          }}
        />
      </div>
    </div>
  );
}
