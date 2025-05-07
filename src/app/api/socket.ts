import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import type { NextApiResponseServerIO } from "../../../types/next";

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.IO server...");
    const io = new Server(res.socket.server, {
      path: "/api/socket", 
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("✅ Client connected:", socket.id);
    });
  }

  res.end();
}

export const config = {
  api: {
    bodyParser: false, // important for socket handshake
  },
};
