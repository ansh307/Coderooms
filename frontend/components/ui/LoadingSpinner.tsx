"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  message?: string;
}

export default function LoadingSpinner({
  size = "md",
  className = "",
  message = "Loading",
}: LoadingSpinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div
        className={[
          "animate-spin rounded-full",
          "border-4 border-surface-muted",
          "border-t-green-accent",
          sizes[size],
          className,
        ].join(" ")}
        role="status"
        aria-label="Loading"
      />
      <span className="">{message}...</span>
    </div>
  );
}
