const scenario = document.getElementById("scenario-span");

const bankruptcy = document.getElementById("bankruptcy");
const death = document.getElementById("death");

const result = document.getElementById("result-div");

const scenarios = ["You have been diagnosed with a treatable form of cancer. Without treatment, it is terminal. You lack insurance, and you cannot afford the procedure out of pocket. You have two choices:"];

bankrupt.addEventListener("click", submitChoice);
death.addEventListener("click", submitChoice);

function submitChoice() {
	result.classList.remove("hide");
	setTimeout(updateGame, 1000);
}

function updateGame() {
	const s = scenarios[Math.floor(Math.random() * scenarios.length)];
	
	result.classList.add("hide");
	scenario.innerText = s;
}

updateGame();