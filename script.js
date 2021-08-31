const wrapper = document.querySelector('#wrapper');
const brain = document.querySelector('#img-area img');
const instruction = document.querySelector('#bottom-text .instruction.visable');
const error = document.querySelector('#bottom-text .error');
const leftDisplay = document.querySelector('.area.left');
const rightDisplay = document.querySelector('.area.right');
const choiceArea = document.querySelector('#choice-area');
const displayQuestion = document.querySelector('.display.question');
const displayIdea = document.querySelector('.display.idea');
const answer = document.querySelector('.answer');
const concept = document.querySelector('.concept');
const btnQuestion = document.querySelector('.question button');
const btnIdea = document.querySelector('.idea button');
const input = document.querySelector('.display.question input');
function visibleText(x) { x.classList.add('visable'); }
function hiddenText(x) { x.classList.remove('visable'); }

let choose = 0;


tabAnswer = ["TAK!", "Daj mi chwile pomyśleć", "Pójdę spytać mamy", "NIE!", "A może tak pojedziemy zamiast tego nad morze? :)",
    "Uważam że to dobry pomysł"];

tabConcept = ["Jedź nad morze!", "Idz na spacer z psem albo po psa do schroniska!", "A może by tak... okradniemy bank?", "Zrób to o czym pierwsze pomyślałaś/eś", "Zatrudnij osobę która napisała tą aplikację :) będzie wdzięczna"];


const shakeBrain = function (time) {
    brain.classList.add('shake');
    setTimeout(() => { brain.classList.remove('shake') }, time);
}

const discoBall = function (time) {
    wrapper.classList.add('bg-color');
    setTimeout(() => { wrapper.classList.remove('bg-color') }, time);
}

const changeText = function (timeStart, timeEnd) {

    setTimeout(() => { //start time with error text
        hiddenText(instruction);
        visibleText(error);
    }, timeStart);

    setTimeout(() => { //end time with error text
        hiddenText(error)
        visibleText(instruction);
    }, timeEnd);

}


const choiceLeftDisplay = function () {
    leftDisplay.classList.add('read');
    rightDisplay.classList.remove('read');
    choose = -1;
}
const choiceRightDisplay = function () {
    rightDisplay.classList.add('read');
    leftDisplay.classList.remove('read');
    choose = 1;
}
const cleanChoose = function () {
    leftDisplay.classList.remove('read');
    rightDisplay.classList.remove('read');
    choose = 0;
}


const seeDisplayQuestion = function () {
    displayQuestion.style.zIndex = "1";
    displayIdea.style.zIndex = "-1";
    choiceArea.style.zIndex = "-1";
}
const seeDisplayIdea = function () {
    displayQuestion.style.zIndex = "-1";
    displayIdea.style.zIndex = "1";
    choiceArea.style.zIndex = "-1";
}
const back = function () {
    displayQuestion.style.zIndex = "-1";
    displayIdea.style.zIndex = "-1";
    choiceArea.style.zIndex = "1";

    instruction.innerText = "Wybierz czy chcesz zadać pytanie, albo dostać gotowy pomysł. Następniekliknij na mózg!"
    instruction.style.color = 'blue';

    cleanChoose();
}


const cursorBlock = function (element, time, type) {
    element.style.cursor = "no-drop";
    setTimeout(() => {
        element.style.cursor = `${type}`;
    }, time);
}

const answerCreator = function (editedText, quotations) {
    editedText.innerText = "x";
    editedText.style.visibility = 'hidden';
    setTimeout(() => {
        editedText.innerText = quotations[Math.floor(Math.random() * quotations.length)];
        editedText.style.visibility = 'visible';
    }, 1500);
};

const checkInput = function () {
    if (input.value !== "" && input.value.slice(-1) === '?') {
        answerCreator(answer, tabAnswer);
        shakeBrain(1500);
        cursorBlock(brain, 1500, 'pointer');
    }
    else {
        shakeBrain(3500);
        discoBall(3500);
        changeText(1500, 3500);
        cursorBlock(brain, 3500, 'pointer');

        error.innerText = "Wpisz pytanie i daj na końcu PYTAJNIK!";
    }
}

const movie = function () {
    if (choose === -1) {
        seeDisplayQuestion();
        shakeBrain(1500);
        cursorBlock(brain, 1500, 'pointer');
        choose = 2;
        instruction.style.color = 'green';
        instruction.innerText = "Napisz pytanie i przyciśnij na mózg!";
    }
    else if (choose === 1) {
        seeDisplayIdea();
        shakeBrain(1500);
        cursorBlock(brain, 1500, 'pointer');
        answerCreator(concept, tabConcept);
        instruction.style.color = 'green';
        instruction.innerText = "Przyciśnij na mózg!";
    }
    else if (choose === 2) {
        checkInput();
    }
    else {
        error.innerText = "WYBIERZ NAJPIERW CZY MASZ PYTANIE CZY CHCESZ POMYSŁ!";

        shakeBrain(4500);
        discoBall(4500);
        changeText(1500, 4500);
        cleanChoose();
        cursorBlock(brain, 4500, 'pointer');
    }
}


leftDisplay.addEventListener('click', choiceLeftDisplay);

rightDisplay.addEventListener('click', choiceRightDisplay);

brain.addEventListener('click', movie);

btnQuestion.addEventListener('click', back);

btnIdea.addEventListener('click', back);

