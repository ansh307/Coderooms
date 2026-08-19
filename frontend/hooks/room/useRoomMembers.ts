import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { api } from "@/api";
import { useRoomStore } from "@/store/room.store";

import type {
  JoinRequest,
  RoomMember,
} from "@/components/home/members-panel/types";
import useAuthStore from "@/store/auth.store";

interface UseRoomMembersProps {
  isMember: boolean;
  isCheckingMembership: boolean | null;
}

export function useRoomMembers({
  isMember,
  isCheckingMembership,
}: UseRoomMembersProps) {
  const activeRoom = useRoomStore((state) => state.activeRoom);

  const [members, setMembers] = useState<RoomMember[]>([]);

  const [membersLoading, setMembersLoading] = useState(false);

  const [membersError, setMembersError] = useState<string | null>(null);

  /*
   * Join Requests
   */

  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);

  const [joinRequestsLoading, setJoinRequestsLoading] = useState(false);

  const [joinRequestsError, setJoinRequestsError] = useState<string | null>(
    null,
  );

  const [processingRequest, setProcessingRequest] = useState<string | null>(
    null,
  );

  /*
   * Is current user owner?
   *
   * We will add this properly depending on
   * the structure of activeRoom.
   */

  const currentUser = useAuthStore.getState().user;

  const currentUserId = currentUser?._id?.toString();
  const ownerId = activeRoom?.owner?._id?.toString();

  const isOwner = !!currentUserId && !!ownerId && currentUserId === ownerId;

  const isPrivate = activeRoom?.type === "private";

  /*
   * Fetch Members
   */

  const fetchMembers = useCallback(async () => {
    if (!activeRoom) return;

    try {
      setMembersLoading(true);
      setMembersError(null);

      const response = await api.get(
        `/roomMember/rooms/${activeRoom._id}/members`,
      );

      setMembers(response.data.data ?? response.data ?? []);
    } catch (error: any) {
      console.error("Failed to fetch members:", error);

      toast.error(error?.response?.data?.message || "Failed to load members.");

      setMembersError(
        error?.response?.data?.message || "Failed to load members.",
      );

      setMembers([]);
    } finally {
      setMembersLoading(false);
    }
  }, [activeRoom]);

  /*
   * Fetch Join Requests
   */

  const fetchJoinRequests = useCallback(async () => {
    if (!activeRoom || !isOwner) {
      return;
    }

    try {
      setJoinRequestsLoading(true);
      setJoinRequestsError(null);

      const response = await api.get(
        `/roomMember/rooms/${activeRoom._id}/join-requests`,
      );

      setJoinRequests(response.data.data ?? []);
    } catch (error: any) {
      console.error("Failed to fetch join requests:", error);

      setJoinRequestsError(
        error?.response?.data?.message || "Failed to load join requests.",
      );

      setJoinRequests([]);
    } finally {
      setJoinRequestsLoading(false);
    }
  }, [activeRoom, isOwner]);

  /*
   * Initial Members Fetch
   */

  useEffect(() => {
    if (!activeRoom) {
      setMembers([]);
      setJoinRequests([]);
      return;
    }

    if (isCheckingMembership) {
      return;
    }

    if (!isMember) {
      setMembersError("You are not a member of this room.");

      setMembers([]);
      return;
    }

    fetchMembers();
  }, [activeRoom, isMember, isCheckingMembership, fetchMembers]);

  /*
   * Fetch Join Requests
   *
   * Only owner should call this API.
   */

  useEffect(() => {
    if (!activeRoom || isCheckingMembership || !isMember || !isOwner) {
      return;
    }

    fetchJoinRequests();
  }, [activeRoom, isCheckingMembership, isMember, isOwner, fetchJoinRequests]);

  /*
   * Approve Join Request
   */

  const approveJoinRequest = async (userId: string) => {
    if (!activeRoom) return;

    try {
      setProcessingRequest(userId);

      await api.post(
        `/roomMember/rooms/${activeRoom._id}/join-requests/${userId}/approve`,
      );

      toast.success("Join request approved.");

      // Remove from pending requests immediately
      setJoinRequests((prev) =>
        prev.filter((request) => request.user._id !== userId),
      );

      // Refresh members
      await fetchMembers();
    } catch (error: any) {
      console.error("Failed to approve join request:", error);

      toast.error(
        error?.response?.data?.message || "Failed to approve join request.",
      );
    } finally {
      setProcessingRequest(null);
    }
  };

  /*
   * Reject Join Request
   */

  const rejectJoinRequest = async (userId: string) => {
    if (!activeRoom) return;

    try {
      setProcessingRequest(userId);

      await api.delete(
        `/roomMember/rooms/${activeRoom._id}/join-requests/${userId}/reject`,
      );

      toast.success("Join request rejected.");

      // Remove from UI immediately
      setJoinRequests((prev) =>
        prev.filter((request) => request.user._id !== userId),
      );
    } catch (error: any) {
      console.error("Failed to reject join request:", error);

      toast.error(
        error?.response?.data?.message || "Failed to reject join request.",
      );
    } finally {
      setProcessingRequest(null);
    }
  };

  return {
    members,
    membersLoading,
    membersError,
    fetchMembers,

    joinRequests,
    joinRequestsLoading,
    joinRequestsError,
    processingRequest,

    isOwner,
    isPrivate,

    approveJoinRequest,
    rejectJoinRequest,
  };
}
