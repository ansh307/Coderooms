import { useCallback, useState } from "react";
import { toast } from "sonner";

import { api } from "@/api";
import { InviteMembership, InviteRoom } from "@/types/rooms";


export function useRoomInvite() {
  const [room, setRoom] = useState<InviteRoom | null>(null);

  const [membership, setMembership] = useState<InviteMembership | null>(null);

  const [isMember, setIsMember] = useState(false);

  const [status, setStatus] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [joining, setJoining] = useState(false);

  const [error, setError] = useState("");

  /*
   * Resolve invite code
   *
   * inviteCode -> room -> membership
   */

  const resolveInvite = useCallback(async (inviteCode: string) => {
    if (!inviteCode.trim()) {
      setError("Invite code is required.");
      return null;
    }

    try {
      setLoading(true);
      setError("");

      /*
       * 1. Get room
       */

      const roomResponse = await api.get(
        `/room/get-room-by-invite/${inviteCode.trim()}`,
      );

      const fetchedRoom = roomResponse.data.data;

      setRoom(fetchedRoom);

      /*
       * 2. Get current user's membership
       */

      const membershipResponse = await api.get(
        `/roomMember/rooms/${fetchedRoom._id}/membership`,
      );

      const data = membershipResponse.data.data;

      setIsMember(data?.isMember === true);

      setMembership(data?.membership ?? null);

      setStatus(data?.status ?? null);

      return {
        room: fetchedRoom,
        membership: data?.membership ?? null,
        isMember: data?.isMember === true,
        status: data?.status ?? null,
      };
    } catch (error: any) {
      console.error("Failed to resolve invite:", error);

      const message =
        error?.response?.data?.message ||
        "This invite link is invalid or has expired.";

      setError(message);

      setRoom(null);
      setMembership(null);
      setIsMember(false);
      setStatus(null);

      toast.error(message);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /*
   * Request to join
   */

  const requestJoin = useCallback(async () => {
    if (!room) {
      return false;
    }

    try {
      setJoining(true);

      if (room.type === "public") {
        await api.post(`/roomMember/rooms/${room._id}/join`);

        setStatus("active");

        setMembership({
          ...(membership ?? {}),
          status: "active",
        });

        toast.success(`Joined "${room.name}"`);
      } else {
        await api.post(`/roomMember/rooms/${room._id}/join-request`);

        setStatus("pending");

        setMembership({
          ...(membership ?? {}),
          status: "pending",
        });

        toast.success("Join request sent. Waiting for owner approval.");
      }

      return true;
    } catch (error: any) {
      console.error("Failed to join room:", error);

      toast.error(error?.response?.data?.message || "Failed to join room.");

      return false;
    } finally {
      setJoining(false);
    }
  }, [room, membership]);

  /*
   * Reset
   */

  const reset = useCallback(() => {
    setRoom(null);
    setMembership(null);
    setIsMember(false);
    setStatus(null);
    setLoading(false);
    setJoining(false);
    setError("");
  }, []);

  return {
    room,
    membership,
    isMember,
    status,

    loading,
    joining,
    error,

    resolveInvite,
    requestJoin,
    reset,
  };
}
