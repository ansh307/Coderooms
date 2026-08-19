"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Hash, Lock, Users } from "lucide-react";
import { toast } from "sonner";

import { api } from "@/api";

interface Room {
  _id: string;
  name: string;
  description: string;
  type: "public" | "private";
  language: string;
  maxUsers: number;
  activeUsers: number;
  owner: {
    _id: string;
    name: string;
  };
}

interface Membership {
  status?: string;
  [key: string]: any;
}

export default function JoinRoomPage() {
  const params = useParams();
  const router = useRouter();

  const inviteCode = params.inviteCode as string;

  const [room, setRoom] = useState<Room | null>(null);
  const [membership, setMembership] = useState<Membership | null>(null);
  const [isMember, setIsMember] = useState(false);
  const [status, setStatus] = useState(null);

  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoomAndMembership = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/room/get-room-by-invite/${inviteCode}`,
        );

        const fetchedRoom = response.data.data;

        setRoom(fetchedRoom);

        // TODOTASK
        // 2. Check current user's membership
        const membershipResponse = await api.get(
          `/roomMember/rooms/${fetchedRoom._id}/membership`,
        );

        const {
          isMember: memberStatus,
          membership: currentMembership,
          status: membershipStatus,
        } = membershipResponse.data.data;

        setIsMember(memberStatus);
        setMembership(currentMembership ?? null);
        setStatus(membershipStatus);
      } catch (error: any) {
        console.error("Failed to load invite:", error);

        setError(
          error?.response?.data?.message ||
            "This invite link is invalid or has expired.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (inviteCode) {
      fetchRoomAndMembership();
    }
  }, [inviteCode]);

  const handleRequestJoin = async () => {
    if (!room) return;

    try {
      setJoining(true);

      await api.post(`/roomMember/rooms/${room._id}/join-request`);

      toast.success("Join request sent successfully.");

      // Update UI immediately instead of redirecting.
      setMembership({
        ...membership,
        status: "pending",
      });

      // We can redirect back to the workspace/sidebar
      //   router.push("/home");
    } catch (error: any) {
      console.error("Failed to request join:", error);

      toast.error(
        error?.response?.data?.message || "Failed to send join request.",
      );
    } finally {
      setJoining(false);
    }
  };

  /*
   * Loading
   */
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-sm text-[#858c9b]">Loading invite...</div>
      </main>
    );
  }

  /*
   * Error
   */
  if (error || !room) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-[420px] rounded-[16px] border border-border-color bg-surface p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[12px] bg-surface-muted text-[#777f8e]">
            <Lock size={22} />
          </div>

          <h1 className="mt-4 text-[17px] font-semibold text-[#e7e9ee]">
            Invalid Invite
          </h1>

          <p className="mt-2 text-[13px] leading-5 text-[#858c9b]">
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

  const isPending = membership?.status === "pending";

  /*
   * Invite
   */
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-[460px] overflow-hidden rounded-[16px] border border-border-color bg-surface shadow-2xl">
        {/* Header */}
        <div className="border-b border-border-color px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[9px] bg-surface-muted text-green-accent">
              <Hash size={20} />
            </div>

            <div>
              <p className="text-[12px] text-[#777f8e]">
                You've been invited to
              </p>

              <h1 className="text-[17px] font-semibold text-[#e7e9ee]">
                {room.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {room.description && (
            <p className="text-[13px] leading-5 text-[#858c9b]">
              {room.description}
            </p>
          )}

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-[10px] border border-border-color bg-surface-muted p-3">
              <div className="flex items-center gap-2">
                <Hash size={15} className="text-[#777f8e]" />

                <span className="text-[11px] text-[#777f8e]">Language</span>
              </div>

              <p className="mt-1 text-[13px] font-medium capitalize text-[#d8dce5]">
                {room.language}
              </p>
            </div>

            <div className="rounded-[10px] border border-border-color bg-surface-muted p-3">
              <div className="flex items-center gap-2">
                <Users size={15} className="text-[#777f8e]" />

                <span className="text-[11px] text-[#777f8e]">Members</span>
              </div>

              <p className="mt-1 text-[13px] font-medium text-[#d8dce5]">
                {room.activeUsers}/{room.maxUsers}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-[10px] border border-border-color bg-surface-muted p-3">
            <p className="text-[12px] leading-5 text-[#777f8e]">
              This is a private CodeRoom. Your request will need to be approved
              by the room owner before you can access it.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRequestJoin}
            disabled={
              joining || isPending || status === "active" || status === "banned"
            }
            className="
              mt-5
              h-11
              w-full
              rounded-[9px]
              bg-green-accent
              text-[14px]
              font-medium
              text-white
              transition-opacity
              hover:opacity-90
              cursor-pointer
              disabled:pointer-events-none
              disabled:opacity-50
            "
          >
            {joining
              ? "Sending Request..."
              : isPending
                ? "Already Requested"
                : status === "active"
                  ? "Already a Member"
                  : status === "banned"
                    ? "Banned from Room"
                    : "Request to Join"}
          </button>
        </div>
      </div>
    </main>
  );
}
