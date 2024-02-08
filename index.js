let text = ["", "", "", "", ""];
let word = 0;
let row = 1;
document.addEventListener("keyup", (e) => {
  if (e.key === "Backspace" || e.key === "Delete") {
    deleteWord();
  }
  if (word > 4) {
    return;
  }
  if (e.key.length === 1) {
    clickWord(e.key);
  }
});

async function getDataAndAction() {
  const data = await fetch("https://words.dev-apis.com/word-of-the-day");
  const fetchData = await data.json();
  document.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && !text.includes("")) {
      enterClick(fetchData);
    }
  });
  document.querySelectorAll(".keyboard-cell").forEach((item) => {
    item.addEventListener("click", () => {
      if (item.textContent === "Delete") {
        deleteWord();
      }
      if (item.textContent.length === 1) {
        clickWord(item.textContent);
      }

      if (item.textContent === "Enter" && !text.includes("")) {
        enterClick(fetchData);
      }
    });
  });
}
getDataAndAction();

function deleteWord() {
  if (word <= 0) {
    return;
  }
  word--;
  text[word] = "";
  document.querySelector(` .row${row} .cell${word}`).textContent = text[word];
  return;
}
function clickWord(event) {
  text[word] = event;
  document.querySelector(` .row${row} .cell${word}`).textContent = text[word];
  word++;
}
let alphabetArray = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  "Delete",
  "Enter",
];
let html = "";
for (let i = 0; i < 28; i++) {
  const htmlElement = `<button class="keyboard-cell">${alphabetArray[i]}</button>`;
  html += htmlElement;
}
document.querySelector(".keyboard").innerHTML = html;

function enterClick(fetchData) {
  let string = fetchData.word;
  let stringArray = fetchData.word.split("");
  let text1 = text.join("");
  if (string === text1) {
    alert("win");
    document.querySelectorAll(`.row${row} div`).forEach((item) => {
      item.style.backgroundColor = "rgb(31, 255, 42)";
    });
    document.querySelector("h2").textContent =
      "Comeback tomorrow for the new Word!";
    return;
  }
  if (row >= 5) {
    alert(`lose the answer is ${fetchData.word}`);
    text = ["", "", "", "", ""];
    word = 0;
    row = 1;
    document.querySelectorAll(".row div").forEach((item) => {
      item.textContent = "";
      item.style.backgroundColor = "";
    });
    return;
  }

  stringArray.map((item) => {
    for (let i = 0; i < text.length; i++) {
      if (item === text[i]) {
        console.log(text[i]);
        console.log(i, "i");
        console.log(item, "item");
        document.querySelector(` .row${row} .cell${i}`).style.backgroundColor =
          "red";
        if (stringArray[i] === text[i]) {
          document.querySelector(
            ` .row${row} .cell${i}`
          ).style.backgroundColor = "rgb(31, 255, 42)";
        }
      }
    }
  });
  text.fill("");
  word = 0;
  row++;
}
