import { users, signUpMessage, signUpEmail } from "../ui-model/selectors.js";
import { getFromLocalStorage } from "./localStorage.js";

getFromLocalStorage("users");
var error = signUpMessage.innerHTML;

function validateNewUser(uemail, pwd, pwdConfirm) {
  error = "false";
  let errorMessage = "";

  if (signUpEmail.value) {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(uemail)) {
      errorMessage = "You have entered an invalid email address.";
      error = true;
      return (signUpMessage.innerHTML = errorMessage);
    }
  }
  let duplicate = users.some(
    (data) => data.userEmail.toLowerCase() == uemail.toLowerCase()
  );

  if (duplicate) {
    errorMessage = "The email you have entered already exists.";
    error = true;
    return (signUpMessage.innerHTML = errorMessage);
  }

  if (uemail == "" || pwd == "" || pwdConfirm == "") {
    errorMessage = "You need to fill all inputs.";
    error = true;
    return (signUpMessage.innerHTML = errorMessage);
  }

  if (pwd !== pwdConfirm) {
    errorMessage = "Your passwords do not match.";
    error = true;
    return (signUpMessage.innerHTML = errorMessage);
  }
  signUpMessage.innerHTML = "";
}
export { validateNewUser, error };
