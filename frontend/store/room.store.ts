import { create } from "zustand";

export interface Room {
  _id: string;
  name: string;
  description: string;
  owner: string;
  type: "public" | "private";
  inviteCode?: string;
  language: string;
  isArchived: boolean;
  maxUsers: number;
  activeUsers: number;
  lastActivityAt: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateRoomData {
  name: string;
  description?: string;
  type: "public" | "private";
  language: string;
  maxUsers: number;
}

interface RoomStore {
  rooms: Room[];
  activeRoom: Room | null;

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

export const useRoomStore = create<RoomStore>((set) => ({
  rooms: [],
  activeRoom: null,

  loading: false,
  error: null,

  setRooms: (rooms) =>
    set((state) => ({
      rooms,

      // Keep active room synchronized with refreshed data
      activeRoom: state.activeRoom
        ? rooms.find(
            (room) => room._id === state.activeRoom?._id
          ) ?? null
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
      rooms: state.rooms.map((item) =>
        item._id === room._id ? room : item
      ),

      activeRoom:
        state.activeRoom?._id === room._id
          ? room
          : state.activeRoom,
    })),

  removeRoom: (roomId) =>
    set((state) => {
      const rooms = state.rooms.filter(
        (room) => room._id !== roomId
      );

      return {
        rooms,
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
      loading: false,
      error: null,
    }),
}));