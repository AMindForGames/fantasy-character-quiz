const url = "json/test.json";
let myData;
let questionIndex = 0;
let answerArray = [0,0,0,0,0,0,0,0,0,0,0,0];

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
//console.log(myData[1].question.toString());

function addQuestion() {
    let newText = document.createElement("p");
    newText.className = "question-text"
    newText.textContent = myData.quiz[questionIndex].question.toString();
    let questionDiv = document.getElementById("question");
    questionDiv.appendChild(newText);
};

function addAnswer(aNumber ,aText, aArray) {
    let newDiv = document.createElement("div");
    let newButton = document.createElement("button");
    let newText = document.createElement("p");
    let buttonText = document.createTextNode(aNumber);
    let questionText = document.createTextNode(aText);
    newDiv.className = "answer-div";
    newText.className = "answer-text";
    newButton.className = "answer-button";
    newButton.addEventListener("click", () => buttonClick(advanceQuiz(aArray)));
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
  addAnswer("A", myData.quiz[questionIndex].answers["a"].text, myData.quiz[questionIndex].answers["a"].result);
  addAnswer("B", myData.quiz[questionIndex].answers["b"].text, myData.quiz[questionIndex].answers["b"].result);
  addAnswer("C", myData.quiz[questionIndex].answers["c"].text, myData.quiz[questionIndex].answers["c"].result);
  addAnswer("D", myData.quiz[questionIndex].answers["d"].text, myData.quiz[questionIndex].answers["d"].result);
};

function advanceQuiz(aArray) {
  for (let i = 0; i < aArray.length; i++) {
    answerArray[aArray[i]] += 1;
  };
  console.log(answerArray);
  clearCurrentQuestion();
  questionIndex += 1;
  if (questionIndex > 12) {
    showResult();
  } else {
    populateQuiz();
  };
};

function initQuiz() {
  console.log("starting quiz");
  document.getElementById("start-button").remove()
  document.getElementById("introduction-text").innerHTML = "";
  questionIndex += 1;
  populateQuiz();
};

function showResult() {
  console.log("END")
  let classData =  myData.class_order;
  let end_text = document.getElementById("introduction-text");
  let highest = 0;
  for (let i = 0; i < answerArray.length; i++) {
    if (answerArray[i] > answerArray[highest]) {
      highest = i;
    };
  };
  console.log(highest);
  console.log(classData[highest]);
  end_text.innerHTML = `Du solltest einen ${classData[highest]} spielen`
};

// make init Quiz global func
globalThis.initQuiz = initQuiz;
// number of keys in myData
console.log(Object.keys(myData).length);
//testFunc();