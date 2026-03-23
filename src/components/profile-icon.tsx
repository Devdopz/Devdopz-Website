type ProfileIconProps = {
  size?: number;
  className?: string;
};

export function ProfileIcon({
  size = 18,
  className = "",
}: ProfileIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5.75 18.25C7.1 15.7 9.2 14.5 12 14.5C14.8 14.5 16.9 15.7 18.25 18.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
