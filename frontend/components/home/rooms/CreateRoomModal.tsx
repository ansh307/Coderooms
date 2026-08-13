"use client";

import { FormEvent, useState } from "react";
import { Code2, X } from "lucide-react";

import { api } from "@/api";
import { useRoomStore } from "@/store/room.store";

interface CreateRoomModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateRoomModal({
  open,
  onClose,
}: CreateRoomModalProps) {
  const addRoom = useRoomStore((state) => state.addRoom);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"public" | "private">("public");
  const [language, setLanguage] = useState("javascript");
  const [maxUsers, setMaxUsers] = useState("20");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) {
    return null;
  }

  const resetForm = () => {
    setName("");
    setDescription("");
    setType("public");
    setLanguage("javascript");
    setMaxUsers("20");
    setError("");
  };

  const handleClose = () => {
    if (loading) return;

    resetForm();
    onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Room name is required.");
      return;
    }

    const parsedMaxUsers = Number(maxUsers);

    if (
      !Number.isInteger(parsedMaxUsers) ||
      parsedMaxUsers < 1 ||
      parsedMaxUsers > 100
    ) {
      setError("Maximum users must be between 1 and 100.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/room/create-room", {
        name: name.trim(),
        description: description.trim(),
        type,
        language,
        maxUsers: parsedMaxUsers,
      });

      const newRoom = response.data.data ?? response.data;

      /*
       * Adds the room to Zustand and makes it
       * the currently active room.
       */
      addRoom(newRoom);

      resetForm();
      onClose();
    } catch (error: any) {
      console.error("Failed to create room:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to create CodeRoom. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/60
        p-4
        backdrop-blur-[3px]
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="
          w-full max-w-[520px]
          overflow-hidden
          rounded-[16px]
          border border-border-color
          bg-surface
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-center border-b border-border-color px-6 py-5">
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-[9px]
              bg-surface-muted
              text-green-accent
            "
          >
            <Code2 size={20} strokeWidth={2.2} />
          </div>

          <div className="ml-3">
            <h2 className="text-[17px] font-semibold text-[#e7e9ee]">
              Create CodeRoom
            </h2>

            <p className="mt-0.5 text-[13px] text-[#858c9b]">
              Create a room and start collaborating.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="
              ml-auto
              flex h-9 w-9
              items-center justify-center
              rounded-[8px]
              text-[#858c9b]
              transition-colors
              hover:bg-surface-muted
              hover:text-[#e5e7eb]
              disabled:pointer-events-none
              disabled:opacity-50
            "
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Room Name */}
          <div>
            <label
              htmlFor="room-name"
              className="mb-2 block text-[13px] font-medium text-[#cfd3dc]"
            >
              Room name
            </label>

            <input
              id="room-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. React Interview Practice"
              maxLength={100}
              autoFocus
              className="
                h-11 w-full
                rounded-[9px]
                border border-border-color
                bg-surface-muted
                px-3.5
                text-[14px]
                text-[#e5e7eb]
                outline-none
                placeholder:text-[#626a79]
                focus:border-green-accent-muted
              "
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="room-description"
              className="mb-2 block text-[13px] font-medium text-[#cfd3dc]"
            >
              Description
              <span className="ml-1 text-[#626a79]">(optional)</span>
            </label>

            <textarea
              id="room-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What is this room for?"
              maxLength={500}
              rows={3}
              className="
                w-full
                resize-none
                rounded-[9px]
                border border-border-color
                bg-surface-muted
                px-3.5
                py-3
                text-[14px]
                text-[#e5e7eb]
                outline-none
                placeholder:text-[#626a79]
                focus:border-green-accent-muted
              "
            />
          </div>

          {/* Visibility */}
          <div>
            <label className="mb-2 block text-[13px] font-medium text-[#cfd3dc]">
              Visibility
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType("public")}
                className={[
                  "rounded-[10px] border p-3 text-left transition-all",
                  type === "public"
                    ? "border-green-accent-muted bg-surface-muted"
                    : "border-border-color bg-surface hover:bg-surface-muted",
                ].join(" ")}
              >
                <p className="text-[14px] font-medium text-[#e4e6ec]">Public</p>

                <p className="mt-1 text-[12px] leading-4 text-[#777f8e]">
                  Anyone can discover and join.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setType("private")}
                className={[
                  "rounded-[10px] border p-3 text-left transition-all",
                  type === "private"
                    ? "border-green-accent-muted bg-surface-muted"
                    : "border-border-color bg-surface hover:bg-surface-muted",
                ].join(" ")}
              >
                <p className="text-[14px] font-medium text-[#e4e6ec]">
                  Private
                </p>

                <p className="mt-1 text-[12px] leading-4 text-[#777f8e]">
                  Only invited users can join.
                </p>
              </button>
            </div>
          </div>

          {/* Language + Max Users */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="room-language"
                className="mb-2 block text-[13px] font-medium text-[#cfd3dc]"
              >
                Language
              </label>

              <select
                id="room-language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="
                  h-11 w-full
                  rounded-[9px]
                  border border-border-color
                  bg-surface-muted
                  px-3
                  text-[14px]
                  text-[#e5e7eb]
                  outline-none
                  focus:border-green-accent-muted
                "
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="c">C</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="room-max-users"
                className="mb-2 block text-[13px] font-medium text-[#cfd3dc]"
              >
                Max users
              </label>

              <input
                id="room-max-users"
                type="number"
                min={1}
                max={100}
                value={maxUsers}
                onChange={(event) => setMaxUsers(event.target.value)}
                className="
                  h-11 w-full
                  rounded-[9px]
                  border border-border-color
                  bg-surface-muted
                  px-3
                  text-[14px]
                  text-[#e5e7eb]
                  outline-none
                  focus:border-green-accent-muted
                "
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="
                rounded-[9px]
                border border-red-500/20
                bg-red-500/5
                px-3.5 py-3
                text-[13px]
                text-red-400
              "
            >
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="
                h-11 rounded-[9px]
                border border-border-color
                bg-surface
                px-5
                text-[14px] font-medium
                text-[#b8bec9]
                transition-colors
                hover:bg-surface-muted
                hover:text-[#e5e7eb]
                disabled:pointer-events-none
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                h-11 rounded-[9px]
                bg-green-accent
                px-5
                text-[14px] font-medium
                text-white
                transition-opacity
                hover:opacity-90
                disabled:pointer-events-none
                disabled:opacity-50
              "
            >
              {loading ? "Creating..." : "Create CodeRoom"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
