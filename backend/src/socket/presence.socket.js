const rooms = new Map();

function addUser(roomId, socket) {
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map());
    }

    rooms
        .get(roomId)
        .set(socket.user.userId.toString(), {
            socketId: socket.id,
            username: socket.user.name,
        });
}

function removeUser(roomId, userId) {
    if (!rooms.has(roomId)) return;

    rooms.get(roomId).delete(userId);

    if (rooms.get(roomId).size === 0) {
        rooms.delete(roomId);
    }
}

function getUsers(roomId) {
    if (!rooms.has(roomId)) return [];

    return [...rooms.get(roomId).values()];
}

module.exports = {
    addUser,
    removeUser,
    getUsers,
};