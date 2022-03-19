import {
  logInEmail,
  logInPassword,
  logInForm,
  logInMessage,
  signUpMessage,
  users,
  modifyUsers,
  index,
  modifyIndex,
  userTodos,
  modifyTodos,
  todoTitle,
  todoContent,
  loggedUser,
  todoItemsList,
  editModal,
} from "../ui-model/selectors.js";

import {
  addToLocalStorage,
  getFromLocalStorage,
} from "../utils/localStorage.js";

import { addTodoClickEvents, loggedIn } from "../ui-model/actions.js";

import { validateNewUser} from "../utils/auth.js";

getFromLocalStorage("users");

function setUp() {
  const activeUser = users.some((element) => {
    if (element.isLoged === true) {
      return true;
    }
  });
  if (activeUser) {
    getCurrentUser();
    loadCurrentUser();
  } else {
    logInForm.classList.remove("hidden-element");
  }
}

function getCurrentUser() {
  modifyIndex(
    users.findIndex((object) => {
      return object.isLoged == true;
    })
  );
}

function loadCurrentUser() {
  modifyTodos(users[index].todos);
  renderTodos(userTodos);
  loggedIn();
  loggedUser.innerHTML = users[index].userEmail;
}

function logOut() {
  users.forEach((data) => (data.isLoged = false));
  addToLocalStorage(users, "users");
}

function addUser(uemail, pwd, pwdConfirm) {

  validateNewUser(uemail, pwd, pwdConfirm);

  if (signUpMessage.innerHTML == "") {
    const user = {
      id: Date.now(),
      isLoged: true,
      userEmail: uemail,
      password: pwd,
      todos: [],
    };

    users.push(user);
    getCurrentUser();
    loadCurrentUser();
  }
}

function validateExistingUser() {
  logInForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let success = users.some(
      (data) =>
        data.userEmail == logInEmail.value &&
        data.password == logInPassword.value
    );
    if (!success) {
      logInMessage.innerHTML = "Incorrect email or password";
    }

    if (success) {
      modifyIndex(
        users.findIndex((object) => {
          return object.userEmail == logInEmail.value;
        })
      );

      users[index].isLoged = true;
      loadCurrentUser();
    }
  });
}

/**
 * Todo page scripts: All Todo functionality for resusability
 */

function renderTodos(userTodos) {
  todoItemsList.innerHTML = "";

  userTodos.forEach(function (item) {
    const checked = item.completed ? "checked" : null;

    const li = document.createElement("li");

    li.setAttribute("class", "item");

    li.setAttribute("data-key", item.id);

    if (item.completed === true) {
      li.classList.add("checked");
    }

    li.innerHTML = `
    <div class="todo-header">
    <input type="checkbox" class="checkbox" ${checked}>
    <h3 class="todo-title">${item.title}</h3>
    <i class="fa edit-btn">&#xf303;</i>
    <i class="delete-btn fa">&#xf1f8;</i>
    </div>
    ${
      item.content
        ? `
     <div class="todo-text">
        <p>${item.content}</p>
      </div>`
        : ""
    }
    `;

    todoItemsList.append(li);
  });
  addToLocalStorage(users, "users");
}

addTodoClickEvents();

function addTodo(title, content) {
  if (title !== "") {
    const todo = {
      id: Date.now(),
      title: title,
      content: content,
      completed: false,
    };

    users[index].todos.push(todo);

    renderTodos(userTodos);

    todoTitle.value = "";
    todoContent.value = "";
  }
}

function toggle(id) {
  userTodos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  renderTodos(userTodos);
}

function deleteTodo(id) {
  users[index].todos = userTodos.filter(function (item) {
    return item.id != id;
  });
  modifyTodos(users[index].todos);
  renderTodos(userTodos);
}

//edit clicked todo item

//create editing form
function editTodo(id) {
  //clear existing modals
  editModal.innerHTML = "";
  userTodos.forEach(function (item) {
    if (item.id == id) {
      //create form element for edit
      const form = document.createElement("form");
      //add class edit-container
      form.setAttribute("class", "edit-form");
      //add unique id
      form.setAttribute("data-key", item.id);

      form.innerHTML = `
      <h2>Edit Todo</h2>
      <p class="edit-message"></p>
      <input type="text" class="edit-title" value="${item.title}" >
      <textarea class="edit-content">${item.content}</textarea>
      <span>
      <button type="submit" class="save-edit-btn">Done</button>
      <button type="button" class="cancel-edit-btn">Cancel</button>
      </span>
      `;
      //add form to div
      editModal.append(form);

      //select form, title, textarea and button
      const editForm = document.querySelector(".edit-form");
      const editTitle = document.querySelector(".edit-title");
      const editMessage = document.querySelector(".edit-message");
      const editContent = document.querySelector(".edit-content");
      const cancelEditBtn = document.querySelector(".cancel-edit-btn");

      editModal.style.display = "block";

      cancelEditBtn.addEventListener("click", function () {
        editModal.innerHTML = "";
        editModal.style.display = "none";
      });

      window.onclick = function (event) {
        if (event.target == editModal) {
          editModal.innerHTML = "";
          editModal.style.display = "none";
        }
      };

      editForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const editId = event.target.getAttribute("data-key");
        if (editTitle.value == "") {
          editMessage.innerHTML = "This todo needs a title.";
        } else {
          saveEdits(editId, editTitle.value, editContent.value);
          editModal.style.display = "none";
        }
      });
    }
  });
}

function saveEdits(id, title, content) {
  userTodos.forEach(function (item) {
    if (item.id == id) {
      item.title = title;
      item.content = content;
    }
  });

  editModal.removeChild(document.querySelector(".edit-form"));
  renderTodos(users[index].todos);
}

export {
  setUp,
  users,
  modifyUsers,
  addUser,
  validateExistingUser,
  logOut,
  renderTodos,
  addTodo,
  toggle,
  deleteTodo,
  editTodo,
};
