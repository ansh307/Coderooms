import { Code2 } from "lucide-react";

export default function CodeEditorEmpty() {
  return (
    <div className="flex min-h-[81vh] flex-1 items-center justify-center">
      <div className="text-center">
        <Code2
          size={32}
          className="mx-auto text-gray-muted"
          strokeWidth={1.6}
        />

        <h2 className="mt-4 text-[16px] font-medium text-primary-heading">
          No CodeRoom selected
        </h2>

        <p className="mt-2 text-[13px] text-gray-muted">
          Select or create a CodeRoom to start coding.
        </p>
      </div>
    </div>
  );
}
