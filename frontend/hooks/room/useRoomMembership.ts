import { useEffect } from "react";

import { api } from "@/api";
import { useRoomStore } from "@/store/room.store";

export function useRoomMembership() {
  const activeRoom = useRoomStore((state) => state.activeRoom);

  const setMembership = useRoomStore(
    (state) => state.setMembership,
  );

  const membershipLoading = useRoomStore(
    (state) => state.membershipLoading,
  );

  const setMembershipLoading = useRoomStore(
    (state) => state.setMembershipLoading,
  );

  const joinedRooms = useRoomStore(
    (state) => state.joinedRooms,
  );

  const roomMembership = activeRoom
    ? joinedRooms[activeRoom._id]
    : undefined;

  const isMember = roomMembership === true;

  const isCheckingMembership =
    activeRoom &&
    (roomMembership === undefined ||
      membershipLoading[activeRoom._id] === true);

  useEffect(() => {
    if (!activeRoom) return;

    const roomId = activeRoom._id;

    const checkMembership = async () => {
      try {
        setMembershipLoading(roomId, true);

        const response = await api.get(
          `/roomMember/rooms/${roomId}/membership`,
        );

        const isMember =
          response.data?.data?.isMember === true;

        setMembership(roomId, isMember);
      } catch (error) {
        console.error(
          "Failed to check room membership:",
          error,
        );

        setMembership(roomId, false);
      } finally {
        setMembershipLoading(roomId, false);
      }
    };

    checkMembership();
  }, [
    activeRoom,
    setMembership,
    setMembershipLoading,
  ]);

  return {
    activeRoom,
    isMember,
    isCheckingMembership,
  };
}