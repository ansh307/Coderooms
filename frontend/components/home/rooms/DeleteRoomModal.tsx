"use client";

import { AlertTriangle, X } from "lucide-react";

interface DeleteRoomModalProps {
  open: boolean;
  roomName: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteRoomModal({
  open,
  roomName,
  loading = false,
  onClose,
  onConfirm,
}: DeleteRoomModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-[400px] overflow-hidden rounded-[16px] border border-border-color bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border-color px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-red-500/10 text-red-400">
              <AlertTriangle size={18} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-muted">
                Delete CodeRoom
              </h2>

              <p className="mt-0.5 text-xs text-gray-muted">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-muted transition-colors hover:bg-surface-muted hover:text-gray-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-5">
          <p className="text-sm leading-6 text-gray-light">
            Are you sure you want to delete{" "}
            <span className="font-medium text-secondary-title">
              "{roomName}"
            </span>
            ?
          </p>

          <p className="mt-2 text-xs leading-5 text-gray-muted">
            All data associated with this CodeRoom will be permanently removed.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 border-t border-border-color px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-[9px] border border-border-color px-4 py-2 text-sm font-medium text-gray-light transition-colors hover:bg-surface-muted hover:text-gray-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-[9px] bg-red-500/90 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete Room"}
          </button>
        </div>
      </div>
    </div>
  );
}
