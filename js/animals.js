const animalsUrl = 'https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple';
const homeBtn = document.getElementById("back-home");
const retryBtn = document.getElementById("retry");
let score = 0;//starting with a score of 0 -> can only go up
let answeredCount = 0;//keep track of what has been answered for final feedback

window.addEventListener("pageshow", () => {//When page opens, reload and refetch data
    loadQuiz();
});

homeBtn.addEventListener("click", () => {//home button access
    window.location.href = "../index.html";
});

retryBtn.addEventListener("click", () => {//reload quiz when user wants to try again
    loadQuiz();
});

function displayQuiz(questions) {
    const container = document.getElementById("quiz-container");//this is where all of the question divs will go (div with many divs inside)
    container.innerHTML = "";//clear container for when retaking

    questions.forEach((q, index) => {//loop through each question + keep track of index for numbering
        //Present each question
        const qDiv = document.createElement("div");//create a divider for each question
        const qText = document.createElement("h3");//create a text of the question (later will be put inside divider)
        qText.innerHTML = `${index + 1}.${" " + decodeHTML(q.question)}`;//displaying (as an h3 element) the question -> needed chatgpt for this syntax
        qDiv.appendChild(qText);//place the qtext inside of the qdiv (putting the <h3> tag inside this divider)
        container.appendChild(qDiv);//putting these into the container that is presented on the page (adding the divs to the outter div)
    
        //Present answer choices for each question
        let allAnswers = [...q.incorrect_answers, q.correct_answer];//spreading the incorrect answers array
        let shuffledAnswers = shuffleAnswers(allAnswers);//helper function to shuffle answer array indexes
        let answered = false;//keep track of what has been answered
        const correctDisplay = document.createElement("p");//create a paragraph element
        correctDisplay.textContent = `Correct answer: ${decodeHTML(q.correct_answer)}`;//will be used to show correct answer when incorrect was chosen -> call decodeHTML helper function

        shuffledAnswers.forEach(answer => {
            const btn = document.createElement("button");//create a button element
            btn.textContent = decodeHTML(answer);//make the button say the answer
            qDiv.appendChild(btn);//place each answer button on screen for each question

            btn.addEventListener("click", () => {
                if (answered) return;//do not change anything if we already answered a question
                answered = true;//mark question as answered
                ++answeredCount;//to know how far we are in the quiz

                if (answer === q.correct_answer) {
                    btn.style.backgroundColor = "#98d498";
                    score++;//increment score when choosing a correct answer
                } else {
                    btn.style.backgroundColor = "#e86c5f";
                    qDiv.appendChild(correctDisplay);//display correct answer
                }

                if (score <= 0) {score = 0};//keep lowest score at 0

                document.getElementById("score").textContent = `Score: ${score}/5`;//display score

                qDiv.scrollIntoView({//Used chatgpt to get this -> wanted a smoother user experience
                    behavior: "smooth",
                    block: "center"
                });

                //print overall feedback once finished
                if (answeredCount === questions.length) {//if all questions are answered...
                    window.scrollTo({top: 0,behavior: "smooth"});//scroll back up when done with quiz
                    document.getElementById("score").textContent = ``;
                    document.getElementById("finished").textContent = `You finished the quiz with a final score of ${score}/5`;
                    if (score === 5) {
                        document.getElementById("comment").textContent = `PERFECT SCORE!! WOW!`;
                    } else if (score === 4) {
                        document.getElementById("comment").textContent = `So close!!`;
                    } else if (score === 3) {
                        document.getElementById("comment").textContent = `Not too bad!`;
                    } else if (score === 2 || score === 1) {
                        document.getElementById("comment").textContent = `You should study more...`;
                    } else if (score === 0) {
                        document.getElementById("comment").textContent = `Yikes!`;
                    }
                }
            });
        });
    });
}

//THREE HELPER FUNCTIONS BELOW:
//Helper function to shuffle answer choices (make it not predictable) -> using Fisher-Yates Shuffle
function shuffleAnswers(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));//generate random index

        const temp = array[i];//temp to hold current value
        array[i] = array[j];//swap current value with a random index's value
        array[j] = temp;//change random other index value with original saved value
    }
    return array;
}

//Helper function to make html style answers provided by API look like plain text
function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

//Helper function to load and fetch data (for first time or after mutliple times loading page)
function loadQuiz() {
    score = 0;//reset score
    answeredCount = 0;//reset how many questions were answered

    document.getElementById("score").textContent = "Score: 0/5";
    document.getElementById("finished").textContent = "";
    document.getElementById("comment").textContent = "";

    fetch(animalsUrl) 
    .then(res => res.json())//converting the response to a json file (objects to use)
    .then(data => {//data that was given, we want to use it
        displayQuiz(data.results);//grabbing the array of question information objects
    });
}