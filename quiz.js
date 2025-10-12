const url = "json/test.json";
let myData;
let questionIndex = 0;
let answerArray = [0,0,0,0];

const fetchJson = async () => {
  try {
    const data = await fetch(url);
    const response = await data.json();  
    myData = response;
  } catch (error) {
    console.log(error);
  }
 };

await fetchJson();
console.log(myData);
console.log(myData[1].question.toString());

function addQuestion() {
    let newText = document.createElement("p");
    newText.className = "question-text"
    newText.textContent = myData[questionIndex].question.toString();
    let questionDiv = document.getElementById("question");
    questionDiv.appendChild(newText);
};

function addAnswer(aNumber ,aText) {
    let newDiv = document.createElement("div");
    let newButton = document.createElement("button");
    let newText = document.createElement("p");
    let buttonText = document.createTextNode(aNumber);
    let questionText = document.createTextNode(aText);
    newDiv.className = "answer-div";
    newText.className = "answer-text";
    newButton.className = "answer-button";
    newButton.addEventListener("click", () => buttonClick(advanceQuiz()));
    newText.appendChild(questionText);
    newButton.appendChild(buttonText);
    newDiv.appendChild(newButton);
    newDiv.appendChild(newText);
    let quizDiv = document.getElementById("answer-block");
    quizDiv.appendChild(newDiv);
};

function buttonClick(text) {
    console.log(text)
};

function testFunc() {
    Object.entries(myData[1].answers).forEach(([key, value]) => {
        console.log(key);
        console.log(value);
    })
};

function clearCurrentQuestion() {
  var current = document.getElementById("question");
  current.innerHTML = "";
  current = document.getElementById("answer-block");
  current.innerHTML = "";
};

function populateQuiz() {
  addQuestion();
  addAnswer("A", myData[questionIndex].answers["a"].text);
  addAnswer("B", myData[questionIndex].answers["b"].text);
  addAnswer("C", myData[questionIndex].answers["c"].text);
  addAnswer("D", myData[questionIndex].answers["d"].text);
};

function advanceQuiz() {
  clearCurrentQuestion();
  questionIndex += 1;
  populateQuiz();
};

function initQuiz() {
  console.log("starting quiz");
  document.getElementById("start-button").remove()
  questionIndex += 1;
  populateQuiz();
};

// make init Quiz global func
globalThis.initQuiz = initQuiz;
// number of keys in myData
console.log(Object.keys(myData).length);
//testFunc();