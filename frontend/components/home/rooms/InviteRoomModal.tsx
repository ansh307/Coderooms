"use client";

import { Check, Copy, Link2, X } from "lucide-react";
import { useState } from "react";

interface InviteRoomModalProps {
  open: boolean;
  room: {
    name: string;
    inviteCode?: string;
  } | null;
  onClose: () => void;
}

export default function InviteRoomModal({
  open,
  room,
  onClose,
}: InviteRoomModalProps) {
  const [copied, setCopied] = useState<"code" | "link" | null>(null);

  if (!open || !room) return null;

  const inviteCode = room.inviteCode ?? "";

  const inviteLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/room/join/${inviteCode}`
      : "";

  const copy = async (value: string, type: "code" | "link") => {
    if (!value) return;

    await navigator.clipboard.writeText(value);

    setCopied(type);

    setTimeout(() => {
      setCopied(null);
    }, 1500);
  };

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/60
        p-4
        backdrop-blur-[3px]
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full max-w-[440px]
          overflow-hidden
          rounded-[16px]
          border border-border-color
          bg-surface
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-center border-b border-border-color px-6 py-5">
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-[9px]
              bg-surface-muted
              text-green-accent
            "
          >
            <Link2 size={20} />
          </div>

          <div className="ml-3">
            <h2 className="text-[17px] font-semibold text-[#e7e9ee]">
              Invite Members
            </h2>

            <p className="mt-0.5 text-[13px] text-[#858c9b]">
              Invite people to "{room.name}".
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              ml-auto
              flex h-9 w-9
              items-center justify-center
              rounded-[8px]
              text-[#858c9b]
              hover:bg-surface-muted
              hover:text-[#e5e7eb]
            "
          >
            <X size={19} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          {/* Code */}
          <div>
            <p className="mb-2 text-[13px] font-medium text-[#cfd3dc]">
              Invite code
            </p>

            <div className="flex gap-2">
              <div
                className="
                  flex h-11 flex-1
                  items-center
                  rounded-[9px]
                  border border-border-color
                  bg-surface-muted
                  px-4
                  font-mono
                  text-[15px]
                  tracking-[0.15em]
                  text-[#e5e7eb]
                "
              >
                {inviteCode}
              </div>

              <button
                type="button"
                onClick={() => copy(inviteCode, "code")}
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-[9px]
                  border border-border-color
                  text-[#858c9b]
                  hover:bg-surface-muted
                  hover:text-[#e5e7eb]
                "
              >
                {copied === "code" ? <Check size={17} /> : <Copy size={17} />}
              </button>
            </div>
          </div>

          {/* Link */}
          <div>
            <p className="mb-2 text-[13px] font-medium text-[#cfd3dc]">
              Invite link
            </p>

            <button
              type="button"
              onClick={() => copy(inviteLink, "link")}
              className="
                flex h-11 w-full
                items-center justify-center
                gap-2
                rounded-[9px]
                border border-border-color
                bg-surface-muted
                text-[13px]
                font-medium
                text-[#b8bec9]
                hover:bg-surface
                hover:text-[#e5e7eb]
              "
            >
              {copied === "link" ? (
                <>
                  <Check size={16} />
                  Copied Invite Link
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy Invite Link
                </>
              )}
            </button>
          </div>

          <div className="rounded-[9px] border border-border-color bg-surface-muted px-3.5 py-3">
            <p className="text-[12px] leading-5 text-[#777f8e]">
              Anyone with this invite can request to join. You still need to
              approve their request before they can access the room.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
