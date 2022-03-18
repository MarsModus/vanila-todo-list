/**
 * MODULES
 */

//Business
import { setUp, validateExistingUser} from "./models/todo/actions.js";

//Events
import { addLogInClickEvents } from "./models/ui-model/actions.js";

window.addEventListener("load", () => {
  setUp();
})
  addLogInClickEvents();
  validateExistingUser();




  

