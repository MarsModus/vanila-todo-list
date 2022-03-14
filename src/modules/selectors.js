/**
 * LogIn/SignUp Page selectors
 */
//select main container to render todos after login/signup
const mainContainer = document.querySelector(".container");

//select log in username and password for validation
const enteredName = document.querySelector(".log-in-name");
const enteredPassword = document.querySelector(".log-in-password");

//select login and signup forms
const logInForm = document.querySelector(".log-in-form");
const signUpForm = document.querySelector(".sign-up-form");

//select sign up username and password
const newName = document.querySelector(".sign-up-name");
const newPass = document.querySelector(".sign-up-password");
const passwordConfirm = document.querySelector(".confirm-sign-up-password");

//select validation error message 
const logInMessage = document.querySelector(".log-in-message");
const signUpMessage = document.querySelector(".sign-up-message");
/**
 * Todo Page selectors
 */

//select todo-form
const todoForm = document.querySelector(".todo-form");

//select todo-title and todo-content
const todoTitle = document.querySelector(".todo-title");
const todoContent = document.querySelector(".todo-content");

//select header paragraph for username and log out link
const loggedUsername = document.querySelector('.loggedUser');
const logOutLink = document.querySelector(".log-out-link"); 

//select todo-items ul
const todoItemsList = document.querySelector(".todo-items");

//select edit modal
const editModal = document.querySelector(".edit-modal");

export {
  mainContainer,
  enteredName,
  enteredPassword,
  logInForm,
  signUpForm,
  logInMessage,
  signUpMessage,
  newName,
  newPass,
  passwordConfirm,
  todoForm,
  logOutLink,
  todoTitle,
  todoContent,
  loggedUsername,
  todoItemsList,
  editModal
};
