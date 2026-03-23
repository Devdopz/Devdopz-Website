type TelegramIconProps = {
  size?: number;
  className?: string;
};

export function TelegramIcon({
  size = 18,
  className = "",
}: TelegramIconProps) {
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
      <path
        d="M21.25 4.25L3.75 11.55L9.7 13.85L16 8.25L11.2 14.35V19.75L14.85 16.95L18.75 19.95L21.25 4.25Z"
        fill="currentColor"
      />
      <path
        d="M9.7 13.85L11.2 19.75V14.35M9.7 13.85L16 8.25"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 11.55L21.25 4.25L18.75 19.95L14.85 16.95L11.2 19.75"
        fill="white"
        fillOpacity="0.14"
      />
    </svg>
  );
}
