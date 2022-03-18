import { modifyUsers } from "../todo/actions.js";

//Local storage setup

function addToLocalStorage(itemToBeStored, key) {
  //convert array to string
  localStorage.setItem(key, JSON.stringify(itemToBeStored));
}

//Get users from Local Storage
function getUsersFromLocalStorage(key) {
  const reference = localStorage.getItem(key);
  if (reference) {
    //convert back into array
    modifyUsers(JSON.parse(reference));
  }
}

export { addToLocalStorage, getUsersFromLocalStorage };
