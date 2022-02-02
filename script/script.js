const terminalToggleBtn = document.querySelector(".terminal-toggle");
const terminalContainer = document.querySelector(".terminal-container");
const terminalInput = document.getElementById("terminal");

const contactToggleBtn = document.querySelector(".contact-toggle");
const socialNetworkDiv = document.querySelector(".social-network");

// CV path
const pathCV = "../files/MyCV.pdf";

let actionHistory = [];

const help =
  "dir - show current directory path\ncd <path> - change directory to <path>\nopen cv - open MyCV.pdf in new tab\ndownload cv - download MyCV.pdf\nquit - close portfolio\nclose - close terminal\n";

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

// todo Add shortcut for Terminal pop-up
// window.addEventListener("keypress", (e) => {
//   console.log(e.key);
// });

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

  console.log(formattedAction.toLowerCase());
  switch (formattedAction) {
    case "opencv":
      window.open(pathCV, "_blank");
      return "";
    case "downloadcv":
      const link = document.createElement("a");
      link.href = pathCV;
      link.download = "MyCv.pdf";
      link.dispatchEvent(new MouseEvent("click"));
      link.remove();
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
