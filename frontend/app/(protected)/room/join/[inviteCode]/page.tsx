"use client";

import { useEffect } from "react";
import { Lock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useRoomInvite } from "@/hooks/room/useRoomInvite";

import RoomInvitePreview from "@/components/home/rooms/RoomInvitePreview";

export default function JoinRoomPage() {
  const params = useParams();
  const router = useRouter();

  const inviteCode = params.inviteCode as string;

  const {
    room,
    membership,
    status,
    loading,
    joining,
    error,
    resolveInvite,
    requestJoin,
  } = useRoomInvite();

  /*
   * Resolve invite code
   */

  useEffect(() => {
    if (!inviteCode) {
      return;
    }

    resolveInvite(inviteCode);
  }, [inviteCode, resolveInvite]);

  /*
   * Loading
   */

  if (loading) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-background
        "
      >
        <div className="text-sm text-[#858c9b]">Loading invite...</div>
      </main>
    );
  }

  /*
   * Invalid invite
   */

  if (error || !room) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-background
          px-4
        "
      >
        <div
          className="
            w-full
            max-w-[420px]
            rounded-[16px]
            border
            border-border-color
            bg-surface
            p-6
            text-center
          "
        >
          <div
            className="
              mx-auto
              flex h-12 w-12
              items-center justify-center
              rounded-[12px]
              bg-surface-muted
              text-[#777f8e]
            "
          >
            <Lock size={22} />
          </div>

          <h1
            className="
              mt-4
              text-[17px]
              font-semibold
              text-[#e7e9ee]
            "
          >
            Invalid Invite
          </h1>

          <p
            className="
              mt-2
              text-[13px]
              leading-5
              text-[#858c9b]
            "
          >
            {error || "This invite link is no longer valid."}
          </p>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="
              mt-5
              h-10
              rounded-[9px]
              bg-green-accent
              px-5
              text-sm
              font-medium
              text-white
              hover:opacity-90
            "
          >
            Go Home
          </button>
        </div>
      </main>
    );
  }

  /*
   * Invite preview
   */

  return (
    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-background
        px-4
      "
    >
      <RoomInvitePreview
        room={room}
        membership={membership}
        status={status}
        joining={joining}
        onJoin={requestJoin}
      />
    </main>
  );
}
