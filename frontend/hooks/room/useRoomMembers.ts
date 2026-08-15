import { useEffect, useState } from "react";
import { toast } from "sonner";

import { api } from "@/api";
import { useRoomStore } from "@/store/room.store";

import type { RoomMember } from "@/components/home/members-panel/types";

interface UseRoomMembersProps {
  isMember: boolean;
  isCheckingMembership: boolean | null;
}

export function useRoomMembers({
  isMember,
  isCheckingMembership,
}: UseRoomMembersProps) {
  const activeRoom = useRoomStore(
    (state) => state.activeRoom,
  );

  const [members, setMembers] = useState<RoomMember[]>([]);
  const [membersLoading, setMembersLoading] =
    useState(false);
  const [membersError, setMembersError] =
    useState<string | null>(null);

  useEffect(() => {
    if (!activeRoom) {
      setMembers([]);
      return;
    }

    const roomId = activeRoom._id;

    if (isCheckingMembership) {
      return;
    }

    if (!isMember) {
      setMembersError(
        "You are not a member of this room.",
      );
      return;
    }

    const fetchMembers = async () => {
      try {
        setMembersLoading(true);
        setMembersError(null);

        const response = await api.get(
          `/roomMember/rooms/${roomId}/members`,
        );

        setMembers(
          response.data.data ?? response.data ?? [],
        );
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to load messages",
        );

        setMembersError(
          error?.response?.data?.message ||
            "Failed to load members.",
        );

        setMembers([]);
      } finally {
        setMembersLoading(false);
      }
    };

    fetchMembers();
  }, [
    activeRoom,
    isMember,
    isCheckingMembership,
  ]);

  return {
    members,
    membersLoading,
    membersError,
  };
}