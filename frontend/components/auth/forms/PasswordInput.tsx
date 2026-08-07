"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface Props {
  label: string;
  value: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function PasswordInput({ label, value, name, onChange }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-zinc-200">{label}</label>

      <div className="relative">
        <input
          name={name}
          value={value}
          onChange={onChange}
          autoComplete="current-password"
          type={show ? "text" : "password"}
          className="h-11 mt-1 w-full rounded-md border border-white/10 bg-[#181818] px-4 pr-14 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
        />

        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
