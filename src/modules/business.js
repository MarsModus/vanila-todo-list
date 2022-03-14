import * as selectors from "./selectors.js";
import { addToLocalStorage, getUsersFromLocalStorage } from "./localStorage.js";
import { addTodoClickEvents } from "./events.js";
/**
 * Log in page scripts
 */

//Maintain todo page on refresh if a user is logged in
function setUp() {
  const activeUser = users.some((element) => {
    if (element.isLoged === true) {
      return true;
    }
  });
  if (activeUser) {
    getCurrentUser();
    selectors.logInForm.classList.add("hidden-element");

    loggedIn();
  } else {
    selectors.logInForm.classList.remove("hidden-element");
  }
}

//select user details
let users = [];
//work arround immutable exported values
function modifyUsers(current) {
  users = current;
}

let userTodos = [];

let index = "";

//create new account
function addUser(uname, pwd, pwdConfirm) {
  //check if username already exist
  let duplicate = users.some(
    (data) => data.username.toLowerCase() == uname.toLowerCase()
  );
  if (!duplicate) {
    //simple validation
    if (uname == "" || pwd == "" || pwdConfirm == "") {
      selectors.signUpMessage.innerHTML = "Please fill in all inputs to create account.";
    } else if (pwd !== pwdConfirm) {
      selectors.signUpMessage.innerHTML = "Password and confirmation password entered do not match.";
    } else {
      const user = {
        id: Date.now(),
        isLoged: true,
        username: uname,
        password: pwd,
        todos: [],
      };

      users.push(user);

      getCurrentUser();
      selectors.signUpForm.classList.add("hidden-element");

      loggedIn();
      //window.location.href = "./todo.html";
    }
  } else {
    selectors.signUpMessage.innerHTML = "Username already exists.";;
  }
}

getUsersFromLocalStorage();

//Log in with existing account
function userValidate() {
  selectors.logInForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let success = users.some(
      (data) =>
        data.username == selectors.enteredName.value &&
        data.password == selectors.enteredPassword.value
    );
    if (success) {
      index = users.findIndex((object) => {
        return object.username == selectors.enteredName.value;
      });

      selectors.logInForm.classList.add("hidden-element");

      loggedIn();
      //window.location.href = "./todo.html";
    } else {
      selectors.logInMessage.innerHTML = "Incorrect username or password";    
    }
  });
}

//Reser isLoged to false on log out
function logOut() {
  users.forEach((data) => (data.isLoged = false));
  addToLocalStorage(users);
}

/**
 * Todo page scripts: All Todo functionality for resusability
 */

function renderTodos(userTodos) {
  //clear placeholder todos
  selectors.todoItemsList.innerHTML = "";

  //for each item
  userTodos.forEach(function (item) {
    //check if completed is true
    const checked = item.completed ? "checked" : null;

    //create li element
    const li = document.createElement("li");
    //add class item
    li.setAttribute("class", "item");
    //add unique id
    li.setAttribute("data-key", item.id);
    //check if is checked
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
    ${item.content ? `
     <div class="todo-text">
        <p>${item.content}</p>
      </div>` : "" }
    `;
    //add li to ul
    selectors.todoItemsList.append(li);
  });
  addToLocalStorage(users);
}

addTodoClickEvents();

//Set up on log in
function loggedIn() {
  //Hide login form and display todo
  selectors.todoForm.classList.remove("hidden-element");
  selectors.loggedUsername.innerHTML = users[index].username;
  selectors.logOutLink.classList.remove("hidden-element");
  selectors.logInMessage.innerHTML = "";
  selectors.signUpMessage.innerHTML = "";
  //Declare index and user todos
  users[index].isLoged = true;
  userTodos = users[index].todos;
  addToLocalStorage(users);
  renderTodos(userTodos);
}

//Assign current user index
function getCurrentUser() {
  index = users.findIndex((object) => {
    return object.isLoged == true;
  });
}

//Adding Todo on submit
function addTodo(title, content) {
  //Check if title is not empty, content not required
  if (title !== "") {
    const todo = {
      id: Date.now(),
      title: title,
      content: content,
      completed: false,
    };

    //add to todos array
    userTodos.push(todo);
    //render todo array
    renderTodos(users[index].todos);

    //clear title and content inputs
    selectors.todoTitle.value = "";
    selectors.todoContent.value = "";
  }
}

//toggle completed based on item id
function toggle(id) {
  userTodos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  renderTodos(users[index].todos);
}

//delete clicked todo item
function deleteTodo(id) {
  users[index].todos = userTodos.filter(function (item) {
    return item.id != id;
  });
  userTodos = users[index].todos;
  renderTodos(users[index].todos);
}

//edit clicked todo item

//create editing form
function editTodo(id) {
  //clear existing modals
  selectors.editModal.innerHTML = "";
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
      <input type="text" class="edit-title" value="${item.title}" >
      <textarea class="edit-content">${item.content}</textarea>
      <span>
      <button type="submit" class="save-edit-btn">Done</button>
      <button type="button" class="cancel-edit-btn">Cancel</button>
      </span>
      `;
      //add form to div
      selectors.editModal.append(form);

      //select form, title, textarea and button
      const editForm = document.querySelector(".edit-form");
      const editTitle = document.querySelector(".edit-title");
      const editContent = document.querySelector(".edit-content");
      const cancelBtn = document.querySelector(".cancel-edit-btn");

      selectors.editModal.style.display = "block";

      //add cancel button function
      cancelBtn.addEventListener("click", function () {
        selectors.editModal.innerHTML = "";
        selectors.editModal.style.display = "none";
      });

      window.onclick = function(event){
        if (event.target == selectors.editModal){
          selectors.editModal.innerHTML = "";
          selectors.editModal.style.display = "none";
        }
      } 

      editForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const editId = event.target.getAttribute("data-key");
        saveEdits(editId, editTitle.value, editContent.value);
        selectors.editModal.style.display = "none";
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
  selectors.editModal.removeChild(document.querySelector(".edit-form"));
  renderTodos(users[index].todos);
}

export {
  setUp,
  users,
  modifyUsers,
  addUser,
  userValidate,
  logOut,
  renderTodos,
  addTodo,
  toggle,
  deleteTodo,
  editTodo,
};
