/*html요소 가지고 오기*/
let result = document.querySelector("#result");
let chanceImgs = document.querySelectorAll("#chance img");
let user = document.querySelector("#user");
let playBtn = document.querySelector("#play");
let resetBtn = document.querySelector("#reset");
let imgBox = document.querySelector(".basic");
let computerNum;
let chances = 5;
let history = [];
let intro = document.querySelector(".intro");
let game = document.querySelector(".game");
let start = document.querySelector(".start");
let run = document.querySelector(".run");
let way = document.querySelector(".way");
let food = document.querySelector(".foods");
let full = document.querySelector(".full");
let runPosition = 30;

//random 수
function randomNum() {
  computerNum = Math.floor(Math.random() * 100 + 1);
  console.log(computerNum);
}
randomNum();

//play 함수
function play() {
  //   console.log("클릭");
  let userNum = user.value;
  //   console.log(userNum);
  way.classList.add("on");

  if (history.includes(userNum)) {
    result.textContent = "이미 입력했던 숫자입니다. 다른 수를 입력해 주세요.";
    return;
  }
  history.push(userNum);
  console.log(history);

  if (userNum < 1 || userNum > 100) {
    result.textContent = "1부터 100까지의 수를 입력해 주세요.";
  } else if (computerNum > userNum) {
    result.textContent = "up";
    imgBox.src = "img/up.png";
    chances--;
    chanceImgs[chances].style.display = "none";
    runPosition += 80;
    run.style.left = `${runPosition}px`;
  } else if (computerNum < userNum) {
    result.textContent = "down";
    imgBox.src = "img/down.png";
    chances--;
    chanceImgs[chances].style.display = "none";
    runPosition += 80;
    run.style.left = `${runPosition}px`;
  } else if (computerNum == userNum) {
    result.textContent = "bingo";
    imgBox.src = "img/bingo.png";
    food.src = "img/food.png";
    full.classList.add("active");
    run.classList.remove("active");
    playBtn.disabled = true;
    user.disabled = true;
  } else {
    result.textContent = "숫자를 입력해 주세요";
  }

  if (chances <= 0) {
    result.textContent = "게임 오버!";
    imgBox.src = "img/over.png";
    playBtn.disabled = true;
    user.disabled = true;
    run.classList.remove("active");
    history = [];
  }
}

playBtn.addEventListener("click", play);

user.addEventListener("focus", () => {
  user.value = "";
});

resetBtn.addEventListener("click", reset);

function reset() {
  history = [];
  chances = 5;
  imgBox.src = "img/cat_basic.png";
  result.textContent = "결과화면 : up/down/bingo";
  playBtn.disabled = false;
  user.disabled = false;
  user.value = "";
  chanceImgs.forEach((img) => {
    img.style.display = "inline-block";
  });
  runPosition = 30;
  run.style.left = "30px";
  randomNum();
}

start.addEventListener("click", () => {
  start.classList.add("on");
  game.classList.add("on");
  intro.classList.add("on");
  run.classList.add("active");
});
