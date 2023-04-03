//! load local storage data
let highScoresHistory = JSON.parse(localStorage.getItem("scores") || "[]");

//! sort scores to present the scores in descending order
highScoresHistory = highScoresHistory.sort((a, b) =>
  a.score < b.score ? 1 : -1
);

//! scores section div
const scoresContainer = document.querySelector("#scores-container");

//! main section for scores
const mainBox = document.createElement("main");
mainBox.setAttribute("class", "scores-main-box");

const highScoresHeading = document.createElement("h1");
highScoresHeading.setAttribute("class", "hs-h1");
highScoresHeading.textContent = "High Scores";
scoresContainer.appendChild(highScoresHeading);
scoresContainer.appendChild(mainBox);

const highScoreBtnSection = document.createElement("div");
const homeBtn = document.createElement("button");
const clearHistory = document.createElement("button");

homeBtn.innerText = "Go Back";
clearHistory.innerText = "Clear History";

highScoreBtnSection.setAttribute("class", "hs-btn-section");
homeBtn.setAttribute("id", "go-back");
clearHistory.setAttribute("id", "clear-history");

scoresContainer.appendChild(highScoreBtnSection);
highScoreBtnSection.appendChild(homeBtn);
highScoreBtnSection.appendChild(clearHistory);

if (highScoresHistory.length > 0) {
  highScoresHistory.forEach(function (player, index) {
    const scoreItem = document.createElement("p");
    if (index % 2) {
      scoreItem.setAttribute("class", "hs-initials");
    } else {
      scoreItem.setAttribute("class", "hs-initials gray-bg");
    }
    scoreItem.innerHTML =
      index + 1 + ". " + player.initials + ": " + player.score;
    mainBox.appendChild(scoreItem);
  });
} else {
  const msg = document.createElement("h4");
  msg.textContent = "Scores history is empty.";
  mainBox.appendChild(msg);
}

highScoreBtnSection.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target.matches("#go-back")) {
    console.log(e.target);
    window.location.href = "./index.html";
  }

  if (e.target.matches("#clear-history")) {
    console.log(e.target);
    mainBox.innerHTML = "";
    localStorage.clear();
  }
});
