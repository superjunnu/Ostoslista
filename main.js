const inputField = document.querySelector("#input-field");
const addBtn = document.querySelector("#add-button");
const removeBtn = document.querySelector("#remove-button");

addBtn.addEventListener("click", () => {
  let inputValue = inputField.value;
  console.log(inputValue);
});
