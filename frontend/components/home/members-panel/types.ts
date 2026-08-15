export interface MembersPanelProps {
  open: boolean;
  onToggle: () => void;
}

export interface RoomMember {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  role: "owner" | "admin" | "member";
  status: "active" | "left" | "banned";
  joinedAt: string;
}

export interface ChatMessage {
  _id: string;
  room: string;
  content: string;
  sender: {
    _id: string;
    name: string;
  };
  createdAt: string;
}