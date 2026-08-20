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


export interface InviteRoom {
  _id: string;
  name: string;
  description: string;
  type: "public" | "private";
  language: string;
  maxUsers: number;
  activeUsers: number;
  owner: {
    _id: string;
    name: string;
  };
}

export interface InviteMembership {
  status?: string;
  role?: string;
  [key: string]: any;
}