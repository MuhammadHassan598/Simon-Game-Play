let gameseq = [];
let userseq = [];
let btns = ["red", "green", "yellow", "purple"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started");
    started = true;

    levelUp();
    highScore();
  }
});
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 150);
}
function levelUp() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randnum = Math.floor(Math.random() * 3);
  let ranClr = btns[randnum];
  let randBtn = document.querySelector(`.${ranClr}`);
  gameseq.push(ranClr);
  gameFlash(randBtn);
}

let allBtn = document.querySelectorAll(".btn");
for (let Btn of allBtn) {
  Btn.addEventListener("click", btnPress);
}

function btnPress() {
  let btn = this;
  usercolor = btn.getAttribute("id");
  userseq.push(usercolor);
  userFlash(btn);
  checkAns(userseq.length - 1);
}
function checkAns(idx) {
  if (userseq[idx] == gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      levelUp();
    }
  } else {
    h2.innerHTML = `Game Over. Your score was <b>${level}</b> <br>Press any key to restart the game`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}
function reset() {
  userseq = [];
  gameseq = [];
  started = false;
  highScore();
  level = 0;
}
let value = 0;
function highScore() {
  //   let h3 = document.querySelector("h3");

  //   if (value <= level) {
  //     value = level;
  //     h3.innerText = `Highest Score=${value}`;
  //   } else {
  //     h3.innerText = `Highest Score=${value}`;
  //   }
  // }

  let h3 = document.querySelector("h3");
  let highestScore = localStorage.getItem("highestScore") || 0;

  if (level > highestScore) {
    highestScore = level;
    localStorage.setItem("highestScore", highestScore);
  }

  h3.innerText = `Highest Score: ${highestScore}`;
}
