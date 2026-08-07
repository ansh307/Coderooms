import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-zinc-200">{label}</label>

      <input
        {...props}
        className="h-11 mt-1 w-full rounded-md border border-white/10 bg-[#181818] px-4 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
      />
    </div>
  );
}
