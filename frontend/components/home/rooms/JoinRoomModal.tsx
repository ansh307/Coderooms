"use client";

import { FormEvent, useState } from "react";
import { Link2, X } from "lucide-react";
import { api } from "@/api";
import { toast } from "sonner";

interface JoinRoomModalProps {
  open: boolean;
  onClose: () => void;
  setJoinRoomOpen: (open: boolean) => void;
}

export default function JoinRoomModal({
  open,
  onClose,
  setJoinRoomOpen,
}: JoinRoomModalProps) {
  const [joiningRoom, setJoiningRoom] = useState(false);

  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleJoinRoom = async (inviteCode: string) => {
    try {
      setJoiningRoom(true);

      /*
       * 1. Resolve invite code → room
       */
      const roomResponse = await api.get(
        `/room/get-room-by-invite/${inviteCode}`,
      );

      const room = roomResponse.data.data;

      /*
       * 2. Private room → request membership
       */
      const response = await api.post(
        `/roomMember/rooms/${room._id}/join-request`,
      );

      toast.success("Join request sent. Waiting for owner approval.");

      setJoinRoomOpen(false);
    } catch (error: any) {
      // console.error("Failed to join room:", error);

      toast.error(error?.response?.data?.message || "Failed to join room");
    } finally {
      setJoiningRoom(false);
      setInviteCode("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const code = inviteCode.trim();

    if (!code) {
      setError("Enter an invite code.");
      return;
    }

    setError("");

    handleJoinRoom(code);
  };

  const handleClose = () => {
    if (joiningRoom) return;

    setInviteCode("");
    setError("");
    onClose();
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
          handleClose();
        }
      }}
    >
      <div
        className="
          w-full max-w-[420px]
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
            <Link2 size={20} strokeWidth={2} />
          </div>

          <div className="ml-3">
            <h2 className="text-[17px] font-semibold text-[#e7e9ee]">
              Join a CodeRoom
            </h2>

            <p className="mt-0.5 text-[13px] text-[#858c9b]">
              Enter the invite code shared with you.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={joiningRoom}
            className="
              ml-auto
              flex h-9 w-9
              items-center justify-center
              rounded-[8px]
              text-[#858c9b]
              transition-colors
              hover:bg-surface-muted
              hover:text-[#e5e7eb]
              disabled:pointer-events-none
              disabled:opacity-50
            "
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <label
            htmlFor="invite-code"
            className="mb-2 block text-[13px] font-medium text-[#cfd3dc]"
          >
            Invite code
          </label>

          <input
            id="invite-code"
            value={inviteCode}
            onChange={(event) => setInviteCode(event.target.value)}
            placeholder="e.g. X7K9P2"
            autoFocus
            disabled={joiningRoom}
            className="
              h-11 w-full
              rounded-[9px]
              border border-border-color
              bg-surface-muted
              px-3.5
              text-[14px]
              uppercase
              tracking-[0.08em]
              text-[#e5e7eb]
              outline-none
              placeholder:normal-case
              placeholder:tracking-normal
              placeholder:text-[#626a79]
              focus:border-green-accent-muted
              disabled:opacity-50
            "
          />

          {error && <p className="mt-2 text-[12px] text-red-400">{error}</p>}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={joiningRoom}
              className="
                h-11 rounded-[9px]
                border border-border-color
                px-5
                text-[14px] font-medium
                text-[#b8bec9]
                transition-colors
                hover:bg-surface-muted
                hover:text-[#e5e7eb]
                disabled:pointer-events-none
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={joiningRoom}
              className="
                h-11 rounded-[9px]
                bg-green-accent
                px-5
                text-[14px] font-medium
                text-white
                transition-opacity
                hover:opacity-90
                disabled:pointer-events-none
                disabled:opacity-50
              "
            >
              {joiningRoom ? "Joining..." : "Join Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
