"use client";

import { useEffect, useState } from "react";

import { useRoomStore } from "@/store/room.store";
import CreateRoomModal from "@/components/home/rooms/CreateRoomModal";

import { api } from "@/api";

import SidebarCollapsed from "./SidebarCollapsed";
import SidebarHeader from "./SidebarHeader";
import SidebarRooms from "./SidebarRooms";
import SidebarBottomNavigation from "./SidebarBottomNavigation";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
  const [createRoomOpen, setCreateRoomOpen] = useState(false);

  const {
    rooms,
    activeRoom,
    setRooms,
    setActiveRoom,
    loading,
    setLoading,
    error,
    setError,
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

        const fetchedRooms = response.data.data ?? response.data;

        setRooms(fetchedRooms);
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
          rooms={rooms}
          activeRoom={activeRoom}
          loading={loading}
          error={error}
          onSetActiveRoom={setActiveRoom}
        />

        {/* Bottom Navigation */}
        <SidebarBottomNavigation onCreateRoom={() => setCreateRoomOpen(true)} />
      </aside>

      <CreateRoomModal
        open={createRoomOpen}
        onClose={() => setCreateRoomOpen(false)}
      />
    </>
  );
}
