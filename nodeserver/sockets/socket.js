// sockets/socket.js
const socketIo = require("socket.io");

module.exports = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle your WebSocket events here
    socket.on("message", (data) => {
      console.log("Received custom event:", data);
    });
  });

  return io;
};
