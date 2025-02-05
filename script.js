const jeopardyData = {
  "Civil Rights Leaders": [
    { question: "This leader famously said, 'I have a dream' during the 1963 March on Washington.", answer: "Who is Martin Luther King Jr.?" },
    { question: "She refused to give up her seat on a Montgomery bus in 1955, sparking the Montgomery Bus Boycott.", answer: "Who is Rosa Parks?" },
    { question: "This co-founder of the NAACP was also the first African American to earn a Ph.D. from Harvard.", answer: "Who is W.E.B. Du Bois?" },
    { question: "This NCA&T Aggie, minister, and two-time presidential candidate founded the Rainbow PUSH Coalition to advocate for social justice and economic empowerment.", answer: "Who is Jesse Jackson?" },
    { question: "This civil rights activist and organizer was a key figure in the Freedom Rides and the Selma to Montgomery marches.", answer: "Who is John Lewis?" }
  ],
  "Inventors and Innovators": [
    { question: "He invented the traffic light and the gas mask.", answer: "Who is Garrett Morgan?" },
    { question: "She developed the first effective treatment for glaucoma in the 1980s.", answer: "Who is Dr. Patricia Bath?" },
    { question: "This inventor created the Super Soaker water gun, one of the top-selling toys of all time.", answer: "Who is Lonnie Johnson?" },
    { question: "He improved the process for refining sugar and patented a sugar-processing machine in the 1800s.", answer: "Who is Norbert Rillieux?" },
    { question: "This scientist developed over 300 products from peanuts, including dyes, plastics, and gasoline.", answer: "Who is George Washington Carver?" }
  ],
  "Arts and Literature": [
    { question: "This poet wrote 'Still I Rise' and 'Phenomenal Woman.'", answer: "Who is Maya Angelou?" },
    { question: "He ain't got no job", answer: "Who is Tommy (from Martin)?" },
    { question: "This artist is known for his vibrant paintings of African American life, such as 'The Migration Series.'", answer: "Who is Jacob Lawrence?" },
    { question: "She was the first African American woman to win the Nobel Prize in Literature for her novel 'Beloved.'", answer: "Who is Toni Morrison?" },
    { question: "This playwright wrote 'A Raisin in the Sun,' a groundbreaking play about a Black family in Chicago.", answer: "Who is Lorraine Hansberry?" }
  ],
  "Sports Legends": [
    { question: "This tennis player won 23 Grand Slam singles titles, the most in the Open Era.", answer: "Who is Serena Williams?" },
    { question: "This legendary pitcher in the Negro Leagues and Major League Baseball, made his MLB debut at age 42 with the Cleveland Indians.", answer: "Who is Satchel Paige?" },
    { question: "He is widely regarded as the greatest boxer of all time and famously said, 'Float like a butterfly, sting like a bee.'", answer: "Who is Muhammad Ali?" },
    { question: "This Hall of Fame outfielder hit 630 home runs and made 'The Kid' a household name", answer: "Who is Ken Griffey Jr?" },
    { question: "She was the first African American woman to win an Olympic gold medal in gymnastics (1992).", answer: "Who is Dominique Dawes?" }
  ],
  "Historical Milestones": [
    { question: "This 1863 executive order declared freedom for enslaved people in Confederate states.", answer: "What is the Emancipation Proclamation?" },
    { question: "This 1964 legislation outlawed discrimination based on race, color, religion, sex, or national origin.", answer: "What is the Civil Rights Act?" },
    { question: "This 1954 Supreme Court case declared racial segregation in public schools unconstitutional.", answer: "What is Brown v. Board of Education?" },
    { question: "This 1965 law aimed to overcome legal barriers preventing African Americans from voting.", answer: "What is the Voting Rights Act?" },
    { question: "This African American woman was the first to serve as the U.S. Secretary of State.", answer: "Who is Condoleezza Rice?" }
  ]
};

const points = [100, 200, 300, 400, 500];
const board = document.getElementById("jeopardy-board");
const modal = document.getElementById("question-modal");
const modalQuestion = document.getElementById("modal-question");
const modalAnswer = document.getElementById("modal-answer");
const revealAnswerButton = document.getElementById("reveal-answer");
const closeModal = document.getElementById("close-modal");
const scoreButtons = document.getElementById("score-buttons");
const scoresDiv = document.getElementById("scores");
const teamSelection = document.getElementById("team-selection");
const scoreboard = document.getElementById("scoreboard");

let teams = [];
let currentQuestion = null;

// Initialize the game
function initializeGame(numTeams) {
  teams = Array.from({ length: numTeams }, (_, i) => ({ name: `Team ${i + 1}`, score: 0 }));
  teamSelection.style.display = "none";
  scoreboard.style.display = "block";
  updateScoreboard();
  buildBoard();
}

// Update the scoreboard
function updateScoreboard() {
  scoresDiv.innerHTML = teams.map(team => `<div>${team.name}: $${team.score}</div>`).join("");
}

// Build the Jeopardy board
function buildBoard() {
  board.innerHTML = "";

  // Add category headings
  Object.keys(jeopardyData).forEach(category => {
    const categoryCell = document.createElement("div");
    categoryCell.className = "category";
    categoryCell.textContent = category;
    board.appendChild(categoryCell);
  });

  // Add points for each category
  points.forEach(point => {
    Object.keys(jeopardyData).forEach(category => {
      const pointCell = document.createElement("div");
      pointCell.className = "points";
      pointCell.textContent = `$${point}`;
      pointCell.dataset.category = category;
      pointCell.dataset.point = point;
      pointCell.addEventListener("click", showQuestion);
      board.appendChild(pointCell);
    });
  });
}

// Show question in modal
function showQuestion(event) {
  if (event.target.classList.contains("used")) return;

  const category = event.target.dataset.category;
  const point = event.target.dataset.point;
  const index = points.indexOf(Number(point));
  const questionData = jeopardyData[category][index];

  currentQuestion = { category, point, element: event.target };

  modalQuestion.textContent = questionData.question;
  modalAnswer.textContent = "";
  modal.style.display = "block";
  scoreButtons.style.display = "none";

  revealAnswerButton.onclick = () => {
    modalAnswer.textContent = questionData.answer;
    scoreButtons.style.display = "block";
  };
}

// Handle scoring
function handleScoring(teamIndex) {
  const pointsValue = Number(currentQuestion.point);
  if (teamIndex >= 0) {
    teams[teamIndex].score += pointsValue;
  }
  currentQuestion.element.classList.add("used");
  currentQuestion.element.style.cursor = "not-allowed";
  updateScoreboard();
  modal.style.display = "none"; // Close the modal after scoring
}

// Event listeners for team selection
document.getElementById("1-team").addEventListener("click", () => initializeGame(1));
document.getElementById("2-teams").addEventListener("click", () => initializeGame(2));
document.getElementById("3-teams").addEventListener("click", () => initializeGame(3));

// Event listeners for scoring
document.getElementById("team1-correct").addEventListener("click", () => handleScoring(0));
document.getElementById("team2-correct").addEventListener("click", () => handleScoring(1));
document.getElementById("team3-correct").addEventListener("click", () => handleScoring(2));
document.getElementById("no-one-correct").addEventListener("click", () => handleScoring(-1));

// Close modal
closeModal.onclick = () => {
  modal.style.display = "none";
};
// ... (keep the existing code for jeopardyData, points, and DOM element references)

// Audio elements
const scoreSound = document.getElementById("score-sound");
const wompWompSound = document.getElementById("womp-womp-sound");

// Handle scoring
function handleScoring(teamIndex) {
  const pointsValue = Number(currentQuestion.point);
  if (teamIndex >= 0) {
    teams[teamIndex].score += pointsValue;
    scoreSound.play(); // Play the fun tune for scoring
  } else {
    wompWompSound.play(); // Play the "womp womp" sound for no one scoring
  }
  currentQuestion.element.classList.add("used");
  currentQuestion.element.style.cursor = "not-allowed";
  updateScoreboard();
  modal.style.display = "none"; // Close the modal after scoring
}

// ... (keep the rest of the existing code)