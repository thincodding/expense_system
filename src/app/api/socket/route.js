import { NextResponse } from 'next/server';
import { Server } from 'socket.io';

export async function GET(req) {
  if (!global.io) {
    console.log('🧠 Initializing new Socket.io server...');

    const io = new Server({
      path: '/api/socket',
    });

    global.io = io;

    io.on('connection', (socket) => {
      console.log('✅ New client connected:', socket.id);

      socket.emit('connected', 'You are connected via WebSocket!');

      socket.on('disconnect', () => {
        console.log('❌ Client disconnected:', socket.id);
      });
    });
  } else {
    console.log('🌀 Socket.io server already running.');
  }

  return NextResponse.json({ status: 'ok', message: '✅ Socket server ready' });
}
