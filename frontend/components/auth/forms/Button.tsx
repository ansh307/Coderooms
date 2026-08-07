import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({ loading, children, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="flex h-11 w-full items-center justify-center rounded-md bg-white font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
