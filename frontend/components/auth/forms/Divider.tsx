interface Props {
  text?: string;
}

export default function Divider({ text = "or" }: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-white/10" />

      <span className="text-xs uppercase tracking-widest text-zinc-500">
        {text}
      </span>

      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}
