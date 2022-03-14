import { modifyUsers } from "./business.js";

//Local storage setup

function addToLocalStorage(users) {
  //convert array to string
  localStorage.setItem("users", JSON.stringify(users));
}

//Get users from Local Storage
function getUsersFromLocalStorage() {
  const reference = localStorage.getItem("users");
  if (reference) {
    //convert back into array
    modifyUsers(JSON.parse(reference));
  }
}

export { addToLocalStorage, getUsersFromLocalStorage };
