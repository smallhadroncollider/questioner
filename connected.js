let questions = [];

module.exports = (io) => {
    let question = null;

    return socket => {
        let askQuestion = (on) => {
            if (questions.length) {
                question = questions.shift();
                on.emit("show answer", question.msg);
            } else {
                on.emit("no questions");
                on.emit("show question");
            }
        };

        askQuestion(socket);

        socket.on("question", msg => {
            console.log(`Question: ${msg}`);

            questions.push({
                socket: socket,
                msg: msg,
            });

            askQuestion(socket.broadcast);
        });

        socket.on("answer", msg => {
            question.socket.emit("answer", msg);
            socket.emit("show question");
            askQuestion(socket);
        });
    }
}
