import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// DOM Elements

const inputField = document.querySelector("#input-field");
const addBtn = document.querySelector("#add-button");
const removeBtn = document.querySelector("#remove-button");
const shoppingList = document.querySelector("#shopping-list");

// Firebase setup

const appSettings = {
  databaseURL:
    "https://cartapp-667f5-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.val()) {
    let shoppingListArr = Object.entries(snapshot.val());
    shoppingList.innerHTML = "";

    for (let item of shoppingListArr) {
      renderShoppingListItem(item);
    }
  } else {
    clearShoppingList();
  }
});

// Functions

function renderShoppingListItem(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  newEl.setAttribute("tabindex", "0");
  shoppingList.appendChild(newEl);

  newEl.addEventListener("click", () => {
    let deleteClickedItem = ref(database, `shoppingList/${itemID}`);
    remove(deleteClickedItem);
  });
}

function clearInputField() {
  inputField.value = "";
}

function clearShoppingList() {
  remove(shoppingListInDB);
  shoppingList.innerHTML = "Lista on tyhjä 😫";
}

// Button's Behaviour

addBtn.addEventListener("click", () => {
  let inputValue = inputField.value;
  inputValue === "" ? "" : push(shoppingListInDB, inputValue);
  clearInputField();
});

removeBtn.addEventListener("click", () => {
  clearShoppingList();
});
