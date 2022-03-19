import { modifyUsers } from "../todo/actions.js";

//Local storage setup

function addToLocalStorage(itemToBeStored, key) {
  
  localStorage.setItem(key, JSON.stringify(itemToBeStored));
}


function getFromLocalStorage(key) {
  const reference = localStorage.getItem(key);
  if (reference) {
    
    modifyUsers(JSON.parse(reference));
  }
}

export { addToLocalStorage, getFromLocalStorage };
