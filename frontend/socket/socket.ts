import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(token: string) {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      autoConnect: false,

      auth: {
        token,
      },
    });
  }

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
