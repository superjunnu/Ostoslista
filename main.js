import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const inputField = document.querySelector("#input-field");
const addBtn = document.querySelector("#add-button");
const removeBtn = document.querySelector("#remove-button");

const appSettings = {
  databaseURL:
    "https://cartapp-667f5-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

addBtn.addEventListener("click", () => {
  let inputValue = inputField.value;
  push(shoppingListInDB, inputValue);
});
