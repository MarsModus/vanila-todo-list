import {
  logInEmail,
  logInPassword,
  logInForm,
  signUpForm,
  logInMessage,
  signUpMessage,
  signUpEmail,
  signUpPassword,
  passwordConfirm,
  todoForm,
  logOutLink,
  todoTitle,
  todoContent,
  loggedUser,
  todoItemsList,
} from "./selectors.js";
import { addUser, logOut } from "../todo/actions.js";
import {
  addTodo,
  toggle,
  deleteTodo,
  editTodo,
} from "../todo/actions.js";



function addLogInClickEvents() {
  
  document.querySelector("#linkLogIn").addEventListener("click", (event) => {
    event.preventDefault();
    logInForm.classList.add("hidden-element");
    signUpForm.classList.remove("hidden-element");
    clearInputs();
  });

 
  document.querySelector("#linkSignUp").addEventListener("click", (event) => {
    event.preventDefault();
    logInForm.classList.remove("hidden-element");
    signUpForm.classList.add("hidden-element");
    clearInputs();
  });


  document.querySelector(".log-out-link").addEventListener("click", (event) => {
    event.preventDefault();
    logInForm.classList.remove("hidden-element");
    todoForm.classList.add("hidden-element");
    logOutLink.classList.add("hidden-element");
    loggedUser.innerHTML="Guest";
    todoItemsList.innerHTML = "";
    clearInputs();
    logOut();
  });

  signUpForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addUser(
      signUpEmail.value,
      signUpPassword.value,
      passwordConfirm.value
    );
  });

  function clearInputs(){
    logInMessage.innerHTML !== "" ? logInMessage.innerHTML= "" : "";
    signUpMessage.innerHTML !== "" ? signUpMessage.innerHTML= "" : "";
    signUpEmail.value !== "" ? signUpEmail.value = "" : "";
    signUpPassword.value !== "" ? signUpPassword.value = "" : "";
    passwordConfirm.value !== "" ? passwordConfirm.value = "" : "";
    logInEmail.value !== "" ? logInEmail.value= "" : "";
    logInPassword.value !== "" ? logInPassword.value= "" : "";
  }
}


function addTodoClickEvents(){
  
  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo(todoTitle.value, todoContent.value);
  });


  todoItemsList.addEventListener("click", function (event) {
    
    if (event.target.type === "checkbox") {
      toggle(event.target.parentElement.parentElement.getAttribute("data-key"));
    }
  
    if (event.target.classList.contains("edit-btn")) {
      editTodo(event.target.parentElement.parentElement.getAttribute("data-key"));
    }
    
    if (event.target.classList.contains("delete-btn")) {
      deleteTodo(event.target.parentElement.parentElement.getAttribute("data-key"));
    }
  });
}

function loggedIn(){
  if (!logInForm.classList.contains("hidden-element")){
    logInForm.classList.add("hidden-element");
  }
  if (!signUpForm.classList.contains("hidden-element")){
    signUpForm.classList.add("hidden-element");
  }
  todoForm.classList.remove("hidden-element");
  logOutLink.classList.remove("hidden-element");
      logInMessage.innerHTML = "";
      signUpMessage.innerHTML = "";
}

export { addLogInClickEvents, addTodoClickEvents, loggedIn };
