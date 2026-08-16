import type { Room } from "@/types/rooms";
import { create } from "zustand";

interface RoomStore {
  rooms: Room[];
  activeRoom: Room | null;

  joinedRooms: Record<string, boolean | null>;
  membershipLoading: Record<string, boolean>;

  setRoomJoined: (roomId: string) => void;
  setRoomLeft: (roomId: string) => void;

  setMembership: (roomId: string, isMember: boolean) => void;

  setMembershipLoading: (roomId: string, loading: boolean) => void;

  isRoomJoined: (roomId: string) => boolean;
  loading: boolean;
  error: string | null;

  setRooms: (rooms: Room[]) => void;
  setActiveRoom: (room: Room | null) => void;

  addRoom: (room: Room) => void;
  updateRoom: (room: Room) => void;
  removeRoom: (roomId: string) => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  reset: () => void;
}

export const useRoomStore = create<RoomStore>((set, get) => ({
  rooms: [],
  activeRoom: null,

  // Membership state
  joinedRooms: {},
  membershipLoading: {},

  setRoomJoined: (roomId) =>
    set((state) => ({
      joinedRooms: {
        ...state.joinedRooms,
        [roomId]: true,
      },
    })),

  setRoomLeft: (roomId) =>
    set((state) => ({
      joinedRooms: {
        ...state.joinedRooms,
        [roomId]: false,
      },
    })),

  setMembership: (roomId, isMember) =>
    set((state) => ({
      joinedRooms: {
        ...state.joinedRooms,
        [roomId]: isMember,
      },
    })),

  setMembershipLoading: (roomId, loading) =>
    set((state) => ({
      membershipLoading: {
        ...state.membershipLoading,
        [roomId]: loading,
      },
    })),

  isRoomJoined: (roomId) => {
    return get().joinedRooms[roomId] === true;
  },

  loading: false,
  error: null,

  setRooms: (rooms) =>
    set((state) => ({
      rooms,

      // Keep active room synchronized with refreshed data
      activeRoom: state.activeRoom
        ? (rooms.find((room) => room._id === state.activeRoom?._id) ?? null)
        : null,
    })),

  setActiveRoom: (room) =>
    set({
      activeRoom: room,
    }),

  addRoom: (room) =>
    set((state) => ({
      rooms: [room, ...state.rooms],
      activeRoom: room,
    })),

  updateRoom: (room) =>
    set((state) => ({
      rooms: state.rooms.map((item) => (item._id === room._id ? room : item)),

      activeRoom: state.activeRoom?._id === room._id ? room : state.activeRoom,
    })),

  removeRoom: (roomId) =>
    set((state) => {
      const rooms = state.rooms.filter((room) => room._id !== roomId);

      const joinedRooms = {
        ...state.joinedRooms,
      };

      delete joinedRooms[roomId];

      return {
        rooms,
        joinedRooms,

        activeRoom:
          state.activeRoom?._id === roomId
            ? (rooms[0] ?? null)
            : state.activeRoom,
      };
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),

  setError: (error) =>
    set({
      error,
    }),

  reset: () =>
    set({
      rooms: [],
      activeRoom: null,
      joinedRooms: {},
      membershipLoading: {},
      loading: false,
      error: null,
    }),
}));
