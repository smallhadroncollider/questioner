const socket = io();

const questionForm = $("#question-form");
const question = $("#question-text");

const answerForm = $("#answer-form");
const answer = $("#answer-text");

const questionAsk = $("#question-ask");
const questionAnswer = $("#question-answer");

const waiting = $("#waiting");

const show = el => el.removeClass("hidden");
const hide = el => el.addClass("hidden");

socket.on("show question", msg => {
    show(questionForm);
});

socket.on("show answer", msg => {
    questionAsk.html(msg);
    show(answerForm);
});

socket.on("answer", msg => {
    questionAnswer.html(msg);
    hide(waiting);
    show(questionAnswer);
});

questionForm.on("submit", (e) => {
    e.preventDefault();

    socket.emit("question", question.val());
    question.val("");

    hide(questionForm);
    show(waiting);
});

answerForm.on("submit", (e) => {
    e.preventDefault();

    socket.emit("answer", answer.val());
    answer.val("");

    hide(answerForm);
    hide(questionAnswer);
    show(questionForm);
});
