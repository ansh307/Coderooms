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