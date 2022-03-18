const mainContainer = document.querySelector(".container");

const logInEmail = document.querySelector(".log-in-email");
const logInPassword = document.querySelector(".log-in-password");

const logInForm = document.querySelector(".log-in-form");
const signUpForm = document.querySelector(".sign-up-form");

const signUpEmail = document.querySelector(".sign-up-email");
const signUpPassword = document.querySelector(".sign-up-password");
const passwordConfirm = document.querySelector(".confirm-sign-up-password");

const logInMessage = document.querySelector(".log-in-message");
const signUpMessage = document.querySelector(".sign-up-message");

let users = [];

function modifyUsers(current) {
  users = current;
}

let userTodos = [];
function modifyTodos(current) {
  userTodos = current;
}

let index = "";
function modifyIndex(current) {
  index = current;
}

const todoForm = document.querySelector(".todo-form");

const todoTitle = document.querySelector(".todo-title");
const todoContent = document.querySelector(".todo-content");

const loggedUser = document.querySelector(".loggedUser");
const logOutLink = document.querySelector(".log-out-link");

const todoItemsList = document.querySelector(".todo-items");

const editModal = document.querySelector(".edit-modal");

export {
  mainContainer,
  logInEmail,
  logInPassword,
  logInForm,
  signUpForm,
  logInMessage,
  signUpMessage,
  signUpEmail,
  signUpPassword,
  passwordConfirm,
  users,
  modifyUsers,
  index,
  modifyIndex,
  userTodos,
  modifyTodos,
  todoForm,
  logOutLink,
  todoTitle,
  todoContent,
  loggedUser,
  todoItemsList,
  editModal,
};
