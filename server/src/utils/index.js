export function getSocketIp(socket) {
  return (
    socket.handshake.headers["x-real-ip"] ||
    socket.request.connection.remoteAddress ||
    ""
  );
}




export function isFn(arg) {
  return typeof arg === "function";
}