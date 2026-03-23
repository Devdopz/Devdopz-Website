import type { CSSProperties } from "react";

type ParticleStyle = CSSProperties & {
  "--particle-color": string;
  "--particle-delay": string;
  "--particle-duration": string;
  "--particle-length": string;
  "--particle-opacity": string;
  "--particle-rotation": string;
  "--particle-scale": string;
  "--particle-thickness": string;
};

type DustStyle = CSSProperties & {
  "--dust-color": string;
  "--dust-delay": string;
  "--dust-duration": string;
  "--dust-opacity": string;
  "--dust-scale": string;
  "--dust-size": string;
  "--dust-shift-x": string;
  "--dust-shift-y": string;
};

type RingLayer = {
  className: string;
  particles: ParticleStyle[];
};

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453123;

  return value - Math.floor(value);
}

function mixChannel(a: number, b: number, amount: number) {
  return Math.round(a + (b - a) * amount);
}

function ringColor(progress: number, tintOffset: number, alpha: number) {
  const blue = { r: 76, g: 103, b: 255 };
  const violet = { r: 136, g: 90, b: 232 };
  const coral = { r: 240, g: 86, b: 112 };
  const gradientPosition = (Math.sin(progress * Math.PI * 4 + tintOffset) + 1) * 0.5;

  if (gradientPosition < 0.6) {
    const amount = gradientPosition / 0.6;

    return `rgba(${mixChannel(blue.r, violet.r, amount)}, ${mixChannel(
      blue.g,
      violet.g,
      amount,
    )}, ${mixChannel(blue.b, violet.b, amount)}, ${alpha})`;
  }

  const amount = (gradientPosition - 0.6) / 0.4;

  return `rgba(${mixChannel(violet.r, coral.r, amount)}, ${mixChannel(
    violet.g,
    coral.g,
    amount,
  )}, ${mixChannel(violet.b, coral.b, amount)}, ${alpha})`;
}

function dustColor(index: number, alpha: number) {
  const coolTint = seeded(index, 12);
  const dark = { r: 24, g: 30, b: 42 };
  const blue = { r: 83, g: 120, b: 255 };

  return `rgba(${mixChannel(dark.r, blue.r, coolTint)}, ${mixChannel(
    dark.g,
    blue.g,
    coolTint,
  )}, ${mixChannel(dark.b, blue.b, coolTint)}, ${alpha})`;
}

function createRingLayer(
  count: number,
  radiusX: number,
  radiusY: number,
  jitter: number,
  className: string,
  tintOffset: number,
): RingLayer {
  const particles = Array.from({ length: count }, (_, index) => {
    const progress = index / count;
    const angle = progress * Math.PI * 2;
    const xJitter = (seeded(index, 1 + tintOffset) - 0.5) * jitter;
    const yJitter = (seeded(index, 2 + tintOffset) - 0.5) * jitter;
    const x = 50 + Math.cos(angle) * (radiusX + xJitter);
    const y = 50 + Math.sin(angle) * (radiusY + yJitter);
    const rotation =
      (angle * 180) / Math.PI +
      90 +
      (seeded(index, 3 + tintOffset) - 0.5) * 24;
    const alpha = 0.22 + seeded(index, 4 + tintOffset) * 0.62;
    const length = 1.6 + seeded(index, 5 + tintOffset) * 4.2;
    const thickness = 0.55 + seeded(index, 6 + tintOffset) * 1.2;
    const duration = 6 + seeded(index, 7 + tintOffset) * 4;
    const delay = -seeded(index, 8 + tintOffset) * duration;
    const scale = 0.85 + seeded(index, 9 + tintOffset) * 0.45;

    return {
      left: `${x}%`,
      top: `${y}%`,
      "--particle-color": ringColor(progress, tintOffset, alpha),
      "--particle-delay": `${delay}s`,
      "--particle-duration": `${duration}s`,
      "--particle-length": `${length}px`,
      "--particle-opacity": `${alpha}`,
      "--particle-rotation": `${rotation}deg`,
      "--particle-scale": `${scale}`,
      "--particle-thickness": `${thickness}px`,
    } satisfies ParticleStyle;
  });

  return { className, particles };
}

function createDustParticles(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const x = seeded(index, 20) * 100;
    const y = seeded(index, 21) * 100;
    const size = 0.45 + seeded(index, 22) * 1.1;
    const alpha = 0.08 + seeded(index, 23) * 0.22;
    const duration = 10 + seeded(index, 24) * 7;
    const delay = -seeded(index, 25) * duration;
    const driftX = (seeded(index, 26) - 0.5) * 9;
    const driftY = (seeded(index, 27) - 0.5) * 9;
    const scale = 0.85 + seeded(index, 28) * 0.4;

    return {
      left: `${x}%`,
      top: `${y}%`,
      "--dust-color": dustColor(index, alpha),
      "--dust-delay": `${delay}s`,
      "--dust-duration": `${duration}s`,
      "--dust-opacity": `${alpha}`,
      "--dust-scale": `${scale}`,
      "--dust-size": `${size}px`,
      "--dust-shift-x": `${driftX}px`,
      "--dust-shift-y": `${driftY}px`,
    } satisfies DustStyle;
  });
}

const ringLayers = [
  createRingLayer(92, 33, 44, 2.8, "hero-ring-layer-a", 0.2),
  createRingLayer(88, 30.5, 40.5, 3.6, "hero-ring-layer-b", 1.3),
  createRingLayer(76, 36, 48, 2.2, "hero-ring-layer-c", 2.1),
];

const dustParticles = createDustParticles(160);

export function HeroParticleBackground() {
  return (
    <div aria-hidden="true" className="hero-antigravity-field">
      <div className="hero-antigravity-halo" />

      <div className="hero-dust-layer">
        {dustParticles.map((style, index) => (
          <span
            key={`dust-${index}`}
            className="hero-dust-particle"
            style={style}
          />
        ))}
      </div>

      {ringLayers.map((layer) => (
        <div
          key={layer.className}
          className={`hero-ring-layer ${layer.className}`}
        >
          {layer.particles.map((style, index) => (
            <span
              key={`${layer.className}-${index}`}
              className="hero-ring-particle"
              style={style}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
