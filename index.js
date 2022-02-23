//select login and signup forms
  const logInForm = document.querySelector(".log-in-form");
  const signUpForm = document.querySelector(".sign-up-form");

  //switch to sign up if no account
  document.querySelector("#linkLogIn").addEventListener("click", (event) => {
    event.preventDefault();
    logInForm.classList.add("hidden-form");
    signUpForm.classList.remove("hidden-form");
  });

  //switch to log in if user has account
  document.querySelector("#linkSignUp").addEventListener("click", (event) => {
    event.preventDefault();
    logInForm.classList.remove("hidden-form");
    signUpForm.classList.add("hidden-form");
  });

  //select user details
  let users = [];

  //select sign up username and password
  const newName = document.querySelector(".sign-up-name");
  const newPass = document.querySelector(".sign-up-password");
  const passwordConfirm = document.querySelector(".confirm-sign-up-password");

  signUpForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addUser(newName.value, newPass.value, passwordConfirm.value);
  });

  function addUser(uname, pwd, pwdConfirm) {
    //check if username already exist
    let duplicate = users.some(
      (data) => data.username.toLowerCase() == uname.toLowerCase()
    );

    if (!duplicate) {
      //simple validation
      if (uname == "" || pwd == "" || pwdConfirm == "") {
        alert("Please fill in all inputs to create account.");
      } else if (pwd !== pwdConfirm) {
        alert("Password and confirmation password entered do not match.");
      } else {
        const user = {
          id: Date.now(),
          isLoged: false,
          username: uname,
          password: pwd,
          todos: []
        };

        users.push(user);
        addToLocalStorage(users);
        alert('Login Successfull!')
        window.location.href = './todo/todo.html';
      }
    } else {
      alert("Username already exist.");
    }
  }

  //Local storage setup
//add todos array to LS
function addToLocalStorage(users) {
  //convert array to string
  localStorage.setItem("users", JSON.stringify(users));
}

//Get users from Local Storage
function getUsersFromLocalStorage() {
  const reference = localStorage.getItem("users");
  if (reference) {
    //convert back into array
    users = JSON.parse(reference);
  }
}

getUsersFromLocalStorage();


//select log in username and password for validation
const enteredName = document.querySelector(".log-in-name");
const enteredPassword = document.querySelector(".log-in-password");

logInForm.addEventListener('submit', function(event) {
  event.preventDefault();
  users.forEach(data => data.isLoged = false);
  let success = users.some(data => data.username == enteredName.value && data.password == enteredPassword.value);
  if (success){
    alert('Loged in successfully');
    const index = users.findIndex(object => {
      return object.username == enteredName.value;
    });
    users[index].isLoged = true;
    addToLocalStorage(users);
    window.location.href = './todo/todo.html';
  }else {
    alert('Incorrect username or password');
  }
});