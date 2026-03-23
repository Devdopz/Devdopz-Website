import Image from "next/image";

type ContributorAvatarProps = {
  name: string;
  photo?: string;
  size?: number;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function getHue(name: string) {
  return Array.from(name).reduce((total, character) => {
    return (total + character.charCodeAt(0)) % 360;
  }, 210);
}

export function ContributorAvatar({
  name,
  photo,
  size = 56,
}: ContributorAvatarProps) {
  if (photo) {
    return (
      <div
        className="overflow-hidden rounded-full border border-accent/12 bg-white shadow-[var(--card-shadow)]"
        style={{ height: size, width: size }}
      >
        <Image
          src={photo}
          alt={name}
          width={size}
          height={size}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const initials = getInitials(name);
  const hue = getHue(name);

  return (
    <div
      className="flex items-center justify-center rounded-full border border-accent/12 shadow-[var(--card-shadow)]"
      style={{
        height: size,
        width: size,
        background: `linear-gradient(180deg, hsla(${hue}, 88%, 97%, 1), hsla(${hue}, 92%, 92%, 1))`,
      }}
    >
      <span
        className="text-sm font-medium tracking-[-0.04em]"
        style={{ color: `hsl(${hue}, 48%, 34%)` }}
      >
        {initials}
      </span>
    </div>
  );
}
