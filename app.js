// ===== NASTAVENÍ =====

let journeyMinutes = 3;
let pauseSeconds = 5;
let ballColor = "#ff0000";
let ballRadius = 8;
let backgroundColor = "#000000";

async function init() {

  const saved = localStorage.getItem("labyrinthSettings");

	if (saved) {

  	const s = JSON.parse(saved);

  	journeyMinutes = s.journeyMinutes ?? journeyMinutes;
  	pauseSeconds = s.pauseSeconds ?? pauseSeconds;
  	ballColor = s.ballColor ?? ballColor;
  	backgroundColor = s.backgroundColor ?? backgroundColor;

	}

  document.body.style.background = backgroundColor;

  const response = await fetch("centerline.svg");
  const svgText = await response.text();

  const container = document.getElementById("labyrinth");
  container.innerHTML = svgText;

  const path = document.getElementById("centerline");
  const length = path.getTotalLength();

  const svg = document.querySelector("svg");

  const ball = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  ball.setAttribute("r", 8);
  ball.setAttribute("fill", "red");

  svg.appendChild(ball);

  const start = path.getPointAtLength(0);
ball.setAttribute("cx", start.x);
ball.setAttribute("cy", start.y);


// synchronizace UI s aktuálním nastavením
document.getElementById("journeyInput").value = journeyMinutes;
document.getElementById("pauseInput").value = pauseSeconds;
document.getElementById("ballColorInput").value = ballColor;
document.getElementById("bgColorInput").value = backgroundColor;

document.body.style.background = backgroundColor;
ball.setAttribute("fill", ballColor);


// spuštění animační smyčky
animate();


// START tlačítko
document
  .getElementById("startButton")
  .addEventListener("click", startJourney);


// SETTINGS tlačítko
document
  .getElementById("settingsButton")
  .addEventListener("click", () => {

    const panel = document.getElementById("settingsPanel");

    panel.style.display =
      panel.style.display === "none" ? "block" : "none";

  });


// změna délky cesty
document.getElementById("journeyInput").addEventListener("input", (e) => {

  journeyMinutes = Number(e.target.value);

  const journeyTime = journeyMinutes * 60 * 1000;
  speed = length / (journeyTime / 16);

  saveSettings();

});


// změna pauzy
document.getElementById("pauseInput").addEventListener("input", (e) => {

  pauseSeconds = Number(e.target.value);

  saveSettings();

});


// změna barvy kuličky
document.getElementById("ballColorInput").addEventListener("input", (e) => {

  ballColor = e.target.value;

  ball.setAttribute("fill", ballColor);

  saveSettings();

});


// změna barvy pozadí
document.getElementById("bgColorInput").addEventListener("input", (e) => {

  backgroundColor = e.target.value;

  document.body.style.background = backgroundColor;

  saveSettings();

});

document.getElementById("resetButton").addEventListener("click", () => {

  journeyMinutes = 3;
  pauseSeconds = 5;
  ballColor = "#ff0000";
  backgroundColor = "#000000";

  document.getElementById("journeyInput").value = journeyMinutes;
  document.getElementById("pauseInput").value = pauseSeconds;
  document.getElementById("ballColorInput").value = ballColor;
  document.getElementById("bgColorInput").value = backgroundColor;

  document.body.style.background = backgroundColor;
  ball.setAttribute("fill", ballColor);

  saveSettings();

});

}

init();