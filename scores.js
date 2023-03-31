"use strict";

function displayScore() {
    const score = localStorage.getItem("score");
    console.log(localStorage.getItem("score"))
    const headerTag = document.querySelector("h2");

    for (var i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      console.log(key + ": " + value);
    }

    // headerTag.innerText = score.Key + score.Value;
}

displayScore();