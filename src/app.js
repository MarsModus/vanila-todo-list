/**
 * MODULES
 */

//Business
import { setUp, userValidate} from "./modules/business.js";

//Events
import { addLogInClickEvents } from "./modules/events.js";

window.addEventListener("load", () => {
  setUp();
})
  addLogInClickEvents();
  userValidate();




  

