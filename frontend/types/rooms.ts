export interface Room {
  _id: string;
  name: string;
  description: string;
  owner: Owner;
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

export interface Owner {
  _id: string;
  name: string;
  email: string;
}