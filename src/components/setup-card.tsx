import type { ReactNode } from "react";

type SetupCardProps = {
  children?: ReactNode;
  description: string;
  title: string;
};

export function SetupCard({ children, description, title }: SetupCardProps) {
  return (
    <div className="soft-panel rounded-[2rem] p-6 sm:p-7">
      <h2 className="text-3xl font-medium leading-[1.04] tracking-[-0.05em] text-foreground">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-foreground/68 sm:text-lg">
        {description}
      </p>
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}
