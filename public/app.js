const socket = io();
const form = document.getElementById("form");
const question = document.getElementById("question");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    socket.emit("question", question.value);
    question.value = "";
});
