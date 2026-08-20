"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useRoomStore } from "@/store/room.store";
import CreateRoomModal from "@/components/home/rooms/CreateRoomModal";
import DeleteRoomModal from "@/components/home/rooms/DeleteRoomModal";
import EditRoomModal from "@/components/home/rooms/EditRoomModal";
import JoinRoomModal from "@/components/home/rooms/JoinRoomModal";

import { api } from "@/api";

import SidebarCollapsed from "./SidebarCollapsed";
import SidebarHeader from "./SidebarHeader";
import SidebarRooms from "./SidebarRooms";
import SidebarBottomNavigation from "./SidebarBottomNavigation";

import type { Room } from "@/types/rooms";
import InviteRoomModal from "../rooms/InviteRoomModal";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

interface UpdateRoomData {
  name: string;
  description: string;
  language: string;
  type: "public" | "private";
  maxUsers: number;
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
  const [createRoomOpen, setCreateRoomOpen] = useState(false);
  const [joinedRooms, setJoinedRooms] = useState<Room[]>([]);
  const [myRooms, setMyRooms] = useState<Room[]>([]);
  const [publicRooms, setPublicRooms] = useState<Room[]>([]);

  const [deleteRoom, setDeleteRoom] = useState<Room | null>(null);
  const [deletingRoom, setDeletingRoom] = useState(false);

  const [editRoom, setEditRoom] = useState<Room | null>(null);
  const [updatingRoom, setUpdatingRoom] = useState(false);

  // const [joinRoomOpen, setJoinRoomOpen] = useState(false);

  const {
    rooms,
    activeRoom,
    setRooms,
    setActiveRoom,
    loading,
    setLoading,
    error,
    setError,
    joinRoomOpen,
    setJoinRoomOpen,
    inviteRoom,
    setInviteRoom,
  } = useRoomStore();

  /*
   * FETCH ROOMS
   */
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/room/get-all-rooms");

        const data = response.data.data ?? response.data;

        setJoinedRooms(data.joinedRooms ?? []);
        setMyRooms(data.myRooms ?? []);
        setPublicRooms(data.publicRooms ?? []);
        setRooms(data.rooms ?? []);
        // console.log(data);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);

        setError("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [setRooms, setLoading, setError]);

  /*
   * Delete A Room
   */

  const handleDeleteRoom = async (room: Room) => {
    setDeleteRoom(room);
  };

  const confirmDeleteRoom = async () => {
    if (!deleteRoom) return;

    try {
      setDeletingRoom(true);

      await api.delete(`/room/delete-room/${deleteRoom._id}`);

      setMyRooms((prev) => prev.filter((item) => item._id !== deleteRoom._id));

      if (activeRoom?._id === deleteRoom._id) {
        setActiveRoom(null);
      }

      toast.success(`"${deleteRoom.name}" deleted successfully`);

      setDeleteRoom(null);
    } catch (error) {
      console.error("Failed to delete room:", error);

      toast.error("Failed to delete room");
    } finally {
      setDeletingRoom(false);
    }
  };

  const handleEditRoom = (room: Room) => {
    setEditRoom(room);
  };

  const handleUpdateRoom = async (data: UpdateRoomData) => {
    if (!editRoom) return;

    try {
      setUpdatingRoom(true);

      const response = await api.patch(
        `/room/update-room/${editRoom._id}`,
        data,
      );

      const updatedRoom = response.data.data;

      setMyRooms((prev) =>
        prev.map((room) => (room._id === updatedRoom._id ? updatedRoom : room)),
      );

      if (activeRoom?._id === updatedRoom._id) {
        setActiveRoom(updatedRoom);
      }

      toast.success("Room updated successfully");

      setEditRoom(null);
    } catch (error) {
      console.error("Failed to update room:", error);

      toast.error("Failed to update room");
    } finally {
      setUpdatingRoom(false);
    }
  };

  const handleJoinPublicRoom = async (room: Room) => {
    try {
      await api.post(`/roomMember/rooms/${room._id}/join`);

      /*
       * Move room:
       * Public → Joined
       */
      setPublicRooms((prev) => prev.filter((item) => item._id !== room._id));

      setJoinedRooms((prev) => [...prev, room]);

      toast.success(`Joined "${room.name}"`);

      /*
       * Optional: immediately activate it
       */
      setActiveRoom(room);
    } catch (error: any) {
      console.error("Failed to join room:", error);

      toast.error(error?.response?.data?.message || "Failed to join room");
    }
  };

  const handleInviteRoom = (room: Room) => {
    setInviteRoom(room);
  };

  /*
   * COLLAPSED SIDEBAR
   */

  if (!open) {
    return (
      <>
        <SidebarCollapsed
          activeRoom={activeRoom}
          onToggle={onToggle}
          onSetActiveRoom={setActiveRoom}
          onCreateRoom={() => setCreateRoomOpen(true)}
        />

        <CreateRoomModal
          setMyRooms={setMyRooms}
          open={createRoomOpen}
          onClose={() => setCreateRoomOpen(false)}
        />
      </>
    );
  }

  /*
   * EXPANDED SIDEBAR
   */

  return (
    <>
      <aside className="flex h-full min-h-0 flex-col overflow-hidden rounded-[16px] border border-border-color bg-surface">
        {/* Header */}
        <SidebarHeader onToggle={onToggle} />

        {/* Rooms */}
        <SidebarRooms
          publicRooms={publicRooms}
          myRooms={myRooms}
          joinedRooms={joinedRooms}
          // rooms={rooms}
          activeRoom={activeRoom}
          loading={loading}
          error={error}
          onSetActiveRoom={setActiveRoom}
          onDeleteRoom={handleDeleteRoom}
          onEditRoom={handleEditRoom}
          onJoinRoom={handleJoinPublicRoom}
          onInviteRoom={handleInviteRoom}
        />

        {/* Bottom Navigation */}
        <SidebarBottomNavigation
          onCreateRoom={() => setCreateRoomOpen(true)}
          onJoinRoom={() => setJoinRoomOpen(true)}
        />
      </aside>

      <CreateRoomModal
        open={createRoomOpen}
        onClose={() => setCreateRoomOpen(false)}
        setMyRooms={setMyRooms}
      />
      <DeleteRoomModal
        open={deleteRoom !== null}
        roomName={deleteRoom?.name ?? ""}
        loading={deletingRoom}
        onClose={() => {
          if (!deletingRoom) {
            setDeleteRoom(null);
          }
        }}
        onConfirm={confirmDeleteRoom}
      />

      <EditRoomModal
        open={editRoom !== null}
        room={editRoom}
        loading={updatingRoom}
        onClose={() => {
          if (!updatingRoom) {
            setEditRoom(null);
          }
        }}
        onSubmit={handleUpdateRoom}
      />

      <JoinRoomModal
        open={joinRoomOpen}
        setJoinRoomOpen={setJoinRoomOpen}
        onClose={() => setJoinRoomOpen(false)}
      />

      <InviteRoomModal
        open={inviteRoom !== null}
        room={inviteRoom}
        onClose={() => setInviteRoom(null)}
      />
    </>
  );
}
