let questions = {};

module.exports = socket => {
    socket.on("question", msg => questions[socket.id] = msg);
}
