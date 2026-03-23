import Image from "next/image";

type DevdopzLogoProps = {
  size?: number;
  className?: string;
};

export function DevdopzLogo({
  size = 44,
  className = "",
}: DevdopzLogoProps) {
  return (
    <Image
      src="/Logo.jpg"
      alt="Devdopz logo"
      width={size}
      height={size}
      className={className}
      priority={size >= 36}
    />
  );
}
