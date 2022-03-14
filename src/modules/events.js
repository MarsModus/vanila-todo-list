import * as selectors from "./selectors.js";
import { addUser, logOut } from "./business.js";
import {
  addTodo,
  toggle,
  deleteTodo,
  editTodo,
} from "./business.js";

/**
 * LogIn/SignUp Page events
 */

function addLogInClickEvents() {
  //switch to sign up if no account
  document.querySelector("#linkLogIn").addEventListener("click", (event) => {
    event.preventDefault();
    selectors.logInForm.classList.add("hidden-element");
    selectors.logInMessage.innerHTML = "";
    selectors.signUpForm.classList.remove("hidden-element");
    selectors.newName.value = "";
    selectors.newPass.value = "";
  });

  //switch to log in if user has account
  document.querySelector("#linkSignUp").addEventListener("click", (event) => {
    event.preventDefault();
    selectors.logInForm.classList.remove("hidden-element");
    selectors.signUpMessage.innerHTML = "";
    selectors.signUpForm.classList.add("hidden-element");
    selectors.enteredName.value = "";
    selectors.enteredPassword.value = "";
  });

  //switch to log in when user logs out
  document.querySelector(".log-out-link").addEventListener("click", (event) => {
    event.preventDefault();
    selectors.logInForm.classList.remove("hidden-element");
    selectors.todoForm.classList.add("hidden-element");
    selectors.logOutLink.classList.add("hidden-element");
    selectors.loggedUsername.innerHTML="Guest";
    selectors.todoItemsList.innerHTML = "";
    selectors.enteredName.value = "";
    selectors.enteredPassword.value = "";
    selectors.passwordConfirm.value= "";
    logOut();
  });

  selectors.signUpForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addUser(
      selectors.newName.value,
      selectors.newPass.value,
      selectors.passwordConfirm.value
    );
  });
}

/**
 * Todo Page events
 */

function addTodoClickEvents(){
  //add event listener for submition
  selectors.todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo(selectors.todoTitle.value, selectors.todoContent.value);
  });

  //add click events for completion and deletion
  selectors.todoItemsList.addEventListener("click", function (event) {
    //check if click comes from checkbox
    if (event.target.type === "checkbox") {
      toggle(event.target.parentElement.parentElement.getAttribute("data-key"));
    }
    //check if click comes from edit button
    if (event.target.classList.contains("edit-btn")) {
      editTodo(event.target.parentElement.parentElement.getAttribute("data-key"));
    }
    //check if click comes from delete button
    if (event.target.classList.contains("delete-btn")) {
      deleteTodo(event.target.parentElement.parentElement.getAttribute("data-key"));
    }
  });
}

export { addLogInClickEvents, addTodoClickEvents };
