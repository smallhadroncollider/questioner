let questions = [];

module.exports = (io) => {
    let question = null;

    return socket => {
        let askQuestion = () => {
            if (questions.length) {
                question = questions.shift();
                socket.emit("show answer", question.msg);
            } else {
                socket.emit("no questions");
                socket.emit("show question");
            }
        };

        askQuestion();

        socket.on("question", msg => {
            console.log(`Question: ${msg}`);

            questions.push({
                socket: socket,
                msg: msg,
            });
        });

        socket.on("answer", msg => {
            question.socket.emit("answer", msg);
            socket.emit("show question");
            askQuestion();
        });
    }
}
