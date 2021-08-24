const scenario = document.getElementById("scenario");

const bankruptcy = document.getElementById("bankruptcy");
const death = document.getElementById("death");

const result = document.getElementById("result-div");

const scenarios = 
      [
	      "You have been diagnosed with a treatable form of cancer. Without treatment, it is terminal.",
	      "You joined a ride-sharing service to bring in extra money when your hours were cut due to excessive staffing. During a ride, you were involved in a hit-and-run that killed your passenger and left you critically injured. When you wake in the hospital, you learn that you will likely die within five years unless you undergo a series of pricey procedures and a lifetime of physical therapy. Your ride-share company is not required to pay workers compensation, and it refuses to do so. Your car insurance will cover your visit so far, but not the following procedures or therapy.",
	      "You exhausted your savings paying to treat your child who developed a deadly, skin-eating bacterial infection, only for the symptoms to return a month later."
      ];

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
