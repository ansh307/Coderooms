"use client";

import { FormEvent, useEffect, useState } from "react";
import { Code2, X } from "lucide-react";

interface Room {
  _id: string;
  name: string;
  language: string;
  description: string;
  type: "private" | "public";
  maxUsers: number;
}

interface UpdateRoomData {
  name: string;
  description: string;
  type: "public" | "private";
  language: string;
  maxUsers: number;
}

interface EditRoomModalProps {
  open: boolean;
  room: Room | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateRoomData) => void;
}

export default function EditRoomModal({
  open,
  room,
  loading = false,
  onClose,
  onSubmit,
}: EditRoomModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"public" | "private">("public");
  const [language, setLanguage] = useState("javascript");
  const [maxUsers, setMaxUsers] = useState("20");

  const [error, setError] = useState("");

  /*
   * Populate form whenever a room is selected
   */
  useEffect(() => {
    if (!room) return;

    setName(room.name ?? "");
    setDescription(room.description ?? "");
    setType(room.type ?? "public");
    setLanguage(room.language ?? "javascript");
    setMaxUsers(String(room.maxUsers ?? 20));
    setError("");
  }, [room]);

  if (!open || !room) {
    return null;
  }

  const handleClose = () => {
    if (loading) return;

    setError("");
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Room name is required.");
      return;
    }

    if (name.trim().length < 3) {
      setError("Room name must be at least 3 characters.");
      return;
    }

    const parsedMaxUsers = Number(maxUsers);

    if (
      !Number.isInteger(parsedMaxUsers) ||
      parsedMaxUsers < 2 ||
      parsedMaxUsers > 100
    ) {
      setError("Maximum users must be between 2 and 100.");
      return;
    }

    setError("");

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      type,
      language,
      maxUsers: parsedMaxUsers,
    });
  };

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/60
        p-4
        backdrop-blur-xs
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
            <h2 className="text-[17px] font-semibold text-primary-heading">
              Edit CodeRoom
            </h2>

            <p className="mt-0.5 text-[13px] text-gray-muted">
              Update your room settings.
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
               text-gray-muted
              hover:bg-surface-muted
              hover:text-primary-not-selected
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
              htmlFor="edit-room-name"
              className="mb-2 block text-[13px] font-medium text-primary-heading"
            >
              Room name
            </label>

            <input
              id="edit-room-name"
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
                text-primary-heading
                outline-none
                placeholder:text-gray-muted
                focus:border-green-accent-muted
              "
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="edit-room-description"
              className="mb-2 block text-[13px] font-medium text-primary-heading"
            >
              Description
              <span className="ml-1 text-gray-muted">(optional)</span>
            </label>

            <textarea
              id="edit-room-description"
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
                text-primary-heading
                outline-none
                placeholder:text-gray-muted
                focus:border-green-accent-muted
              "
            />
          </div>

          {/* Visibility */}
          <div>
            <label className="mb-2 block text-[13px] font-medium text-primary-heading">
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
                    : "border-border-color bg-surface-muted hover:bg-surface-muted",
                ].join(" ")}
              >
                <p className="text-[14px] font-medium text-primary-heading">
                  Public
                </p>

                <p className="mt-1 text-[12px] leading-4 text-gray-muted">
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
                    : "border-border-color bg-surface-muted hover:bg-surface-muted",
                ].join(" ")}
              >
                <p className="text-[14px] font-medium text-primary-heading">
                  Private
                </p>

                <p className="mt-1 text-[12px] leading-4 text-gray-muted">
                  Only invited users can join.
                </p>
              </button>
            </div>
          </div>

          {/* Language + Max Users */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="edit-room-language"
                className="mb-2 block text-[13px] font-medium text-primary-heading"
              >
                Language
              </label>

              <select
                id="edit-room-language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="
                  h-11 w-full
                  rounded-[9px]
                  border border-border-color
                  bg-surface-muted
                  px-3
                  text-[14px]
                  text-primary-heading
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
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="ruby">Ruby</option>
                <option value="php">PHP</option>
                <option value="kotlin">Kotlin</option>
                <option value="swift">Swift</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="edit-room-max-users"
                className="mb-2 block text-[13px] font-medium text-primary-heading"
              >
                Max users
              </label>

              <input
                id="edit-room-max-users"
                type="number"
                min={2}
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
                  text-primary-heading
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
                text-primary-not-selected
                hover:bg-surface-muted
                hover:text-primary-heading
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
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
