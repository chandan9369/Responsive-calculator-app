// toggle button functionality
const toggle_btn = document.querySelector(".indicator");
const body = document.querySelector("body");

toggle_btn.addEventListener("click", function () {
  body.classList.toggle("active");
});

// input container manipulation
const inputContainer = document.querySelector(".input-container");
const prev_exp = document.querySelector(".prev-expression");
const curr_exp = document.querySelector(".curr-expression");

let prev_exp_text = prev_exp.innerText;
let curr_exp_text = curr_exp.innerText;

// various buttons
const numBtns = document.querySelectorAll(".cell");
const operatorBtns = document.querySelectorAll(".operator");
const delBtn = document.querySelector("#delete");
const resetBtn = document.querySelector("#reset");
const evalBtn = document.querySelector("#evaluate");

// selected operator
let operator;

// reset function
const reset = () => {
  prev_exp_text = "";
  curr_exp_text = "";
  operator = undefined;
};

// delete function
const deleteOper = () => {
  curr_exp_text = curr_exp_text.slice(0, -1);
};

// display function
const display = () => {
  curr_exp.innerText = curr_exp_text;
  if (operator !== undefined) {
    prev_exp.innerText = `${prev_exp_text} ${operator}`;
  } else {
    prev_exp.innerText = prev_exp_text;
  }
};

// adding new button functionality
const addBtn = (num) => {
  // case where we found a decimal pointer which is already present
  if (num == "." && curr_exp_text.includes(".")) return;
  curr_exp_text += num;
};

// function to select operator
const selectOperator = (oper) => {
  // cases where we are putting a operator when there is no text
  if (curr_exp_text == "") return;
  if (prev_exp_text !== "") {
    calculate();
  }

  prev_exp_text = curr_exp_text;
  operator = oper;
  curr_exp_text = "";
};

// calculate function
const calculate = () => {
  let prev_val = parseFloat(prev_exp_text);
  let curr_val = parseFloat(curr_exp_text);

  if (isNaN(prev_val) || isNaN(curr_val)) return;
  let res;
  switch (operator) {
    case "+":
      res = prev_val + curr_val;
      break;
    case "/":
      res = prev_val / curr_val;
      break;
    case "x":
      res = prev_val * curr_val;
      break;
    case "-":
      res = prev_val - curr_val;
      break;

    default:
      return;
  }

  prev_exp_text = "";
  curr_exp_text = res;
  operator = undefined;
  prev_exp.innerText = "";
};

// reset button functionality
resetBtn.addEventListener("click", () => {
  reset();
  display();
});

// delete button functionality
delBtn.addEventListener("click", () => {
  deleteOper();
  display();
});

// evaluate button functionality
evalBtn.addEventListener("click", () => {
  calculate();
  display();
});

// all number button functionality
numBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    addBtn(btn.innerText);
    display();
  });
});

// all operator button functionality
operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectOperator(btn.innerText);
    display();
  });
});
