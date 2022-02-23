//select todo-form
const todoForm = document.querySelector(".todo-form");

//select todo-title and todo-content
const todoTitle = document.querySelector(".todo-title");
const todoContent = document.querySelector(".todo-content");

//select todo-items ul
const todoItemsList = document.querySelector(".todo-items");

//Get users from Local Storage. !!PROBLEM using findindex twice.
function getUsersFromLocalStorage() {
  const reference = localStorage.getItem("users");
  if (reference) {
    //convert back into array and declare global variable
    window.users = JSON.parse(reference);
    //find index of active user and declare global variable
    window.index = users.findIndex((object) => {
      return object.isLoged == true;
    });
    renderTodos(users[index].todos);
  }
}

getUsersFromLocalStorage();

//Variable with active user todo list
let userTodos = users[index].todos;

//add event listener for submition
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo(todoTitle.value, todoContent.value);
});

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
    addToLocalStorage(users);

    //clear title and content inputs
    todoTitle.value = "";
    todoContent.value = "";
  }
}

function renderTodos(userTodos) {
  //clear placeholder todos
  todoItemsList.innerHTML = "";

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
    <input type="checkbox" class="checkbox" ${checked}>
    <div class="todo-text">
        <h3>${item.title}</h3>
        <p>${item.content}</p>
    </div>
    <i class="fa edit-btn">&#xf044;</i>
    <i class="delete-btn fa">&#xf00d;</i>
    `;
    //add li to ul
    todoItemsList.append(li);
  });
}

//Local storage setup
//add todos array to LS
function addToLocalStorage(users) {
  //convert array to string
  localStorage.setItem("users", JSON.stringify(users));

  renderTodos(userTodos);
}

//add click events for completion and deletion
todoItemsList.addEventListener("click", function (event) {
  //check if click comes from checkbox
  if (event.target.type === "checkbox") {
    toggle(event.target.parentElement.getAttribute("data-key"));
  }
  //check if click comes from edit button
  if (event.target.classList.contains("edit-btn")) {
    editTodo(event.target.parentElement.getAttribute("data-key"));
  }
  //check if click comes from delete button
  if (event.target.classList.contains("delete-btn")) {
    deleteTodo(event.target.parentElement.getAttribute("data-key"));
  }
});

//toggle completed based on item id
function toggle(id) {
  userTodos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(users);
}

//delete clicked todo item
function deleteTodo(id) {
  users[index].todos = userTodos.filter(function (item) {
    return item.id != id;
  });
  userTodos = users[index].todos;
  addToLocalStorage(users);
}

//edit clicked todo item
//select edit modal
const editModal = document.querySelector(".edit-modal");

//create editing form
function editTodo(id) {
  //clear existing modals
  editModal.innerHTML = '';
  userTodos.forEach(function (item) {
    if (item.id == id) {
      //create form element for edit
      const form = document.createElement("form");
      //add class edit-container
      form.setAttribute("class", "edit-form");
      //add unique id
      form.setAttribute("data-key", item.id);

      form.innerHTML = `
      <h1>Edit Todo</h1>
      <input type="text" class="edit-title" value="${item.title}">
      <textarea class="edit-content">${item.content}</textarea>
      <span>
      <button type="submit" class="save-edit-btn">Done</button>
      <button type="button" class="cancel-edit-btn">Cancel</button>
      </span>
      `;
      //add form to div
      editModal.append(form);

      //select edit btn
      const editForm = document.querySelector(".edit-form");
      const editTitle = document.querySelector(".edit-title");
      const editContent = document.querySelector(".edit-content");
      const cancelBtn = document.querySelector('.cancel-edit-btn');

      //add cancel button function
      cancelBtn.addEventListener('click', function(){
        editModal.innerHTML = '';
      });


      editForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const editId = event.target.getAttribute("data-key");
        saveEdits(editId, editTitle.value, editContent.value);
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
  editModal.removeChild(document.querySelector('.edit-form'));
  addToLocalStorage(users);
}
//try removing form from editModal: WORKED!
//add to local storage, style a bit and we are done.