const terminalToggleBtn = document.querySelector(".terminal-toggle");
const terminalContainer = document.querySelector(".terminal-container");
const terminalInput = document.getElementById("terminal");

const contactToggleBtn = document.querySelector(".contact-toggle");
const socialNetworkDiv = document.querySelector(".social-network");

const contentContainer = document.querySelector(".content-container");
const contentRight = document.querySelector(".content-right");

// ! TERMINAL VARIABLES
// CV path
const pathCV = "../files/MyCV.pdf";

let actionHistory = [];

const DIRECTORIES = {
  home: 0,
  skills: 1,
  projects: 2,
  interests: 3,
};

// const AVAILABLE_DIRECTORIES = [
//   "home",
//   "my-skills",
//   "my-projects",
//   "my-interests",
// ];

let CURRENT_DIRECTORY = DIRECTORIES.home;

const help =
  "dir - show available directories\ncd <target> - change directory to <target>\nopen cv - open MyCV.pdf in new tab\ndownload cv - download MyCV.pdf\nquit - close portfolio\nclose - close terminal\n";

// ! END OF TERMINAL VARIABLES

contactToggleBtn.addEventListener("click", () => {
  socialNetworkDiv.classList.toggle("active");
});

terminalToggleBtn.addEventListener("click", () => {
  terminalContainer.classList.toggle("hidden");
  terminalToggleBtn.classList.toggle("hidden");

  terminalInput.focus();

  if (terminalContainer.classList.contains("hidden")) {
    document.activeElement.blur();
  }
});

terminalInput.addEventListener("keydown", (e) => {
  console.log(e.key);

  if (e.key === "Enter") {
    let actions = terminalInput.value.split("\n");
    let lastAction = actions[actions.length - 1];

    let actionReturn = executeAction(lastAction);

    actionHistory.push(lastAction);
    setTimeout(() => {
      terminalInput.value = actionReturn;
    }, 500);
  }
});

function executeAction(action) {
  const formattedAction = action.replace(/ /g, "");

  const link = document.createElement("a");

  switch (formattedAction.toLowerCase()) {
    case "dir":
      return "home\nskills\nprojects\ninterests\n";
    case "cdhome":
      slide(DIRECTORIES.home);
      return "";
    case "cdskills":
      slide(DIRECTORIES.skills);
      return "";
    case "cdprojects":
      slide(DIRECTORIES.projects);
      return "";
    case "cdinterests":
      slide(DIRECTORIES.interests);
      return "";

    case "opencv":
      window.open(pathCV, "_blank");
      return "";
    case "downloadcv":
      link.href = pathCV;
      link.download = "MyCv.pdf";
      link.dispatchEvent(new MouseEvent("click"));
      // link.remove();
      return "";
    case "close":
      terminalToggleBtn.dispatchEvent(new Event("click"));
      return "";
    case "help":
      return help;
    case "quit":
      window.close();
      break;
    default:
      return "";
  }
}

function slide(destination) {
  const sliderHeight = contentContainer.clientHeight;

  if (destination === CURRENT_DIRECTORY) return;
  // let movement = CURRENT_DIRECTORY - destination;
  contentRight.style.transform = `translateY(-${destination * sliderHeight}px)`;

  CURRENT_DIRECTORY = destination;
}
