const terminalToggleBtn = document.querySelector(".terminal-toggle");
const terminalContainer = document.querySelector(".terminal-container");
const terminalInput = document.getElementById("terminal");

const contactToggleBtn = document.querySelector(".contact-toggle");
const socialNetworkDiv = document.querySelector(".social-network");

const contentContainer = document.querySelector(".content-container");
const contentRight = document.querySelector(".content-right");

const currentDirContainer = document.querySelector(".current-dir-container");
const nextProjectBtn = document.getElementById("next-project");
const prevProjectBtn = document.getElementById("prev-project");

// ? GITHUB API

const APIURL = "https://api.github.com/users/IgorJelic/repos?sort=created";

// ? END OF GITHUB API

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

let CURRENT_DIRECTORY = DIRECTORIES.home;

const help =
  "dir - show available directories\ncd <dir> - change directory to <dir>\nopen cv - open MyCV.pdf in new tab\ndownload cv - download MyCV.pdf\nclose - close terminal\nquit - close portfolio\n<Enter> - clear console\n";

// ! END OF TERMINAL VARIABLES

// let repos = [];
let repoIndex = 0;
getRepo(0);

nextProjectBtn.addEventListener("click", () => {
  repoIndex++;
  getRepo(repoIndex);
});

prevProjectBtn.addEventListener("click", () => {
  repoIndex--;
  getRepo(repoIndex);
});

contactToggleBtn.addEventListener("click", () => {
  socialNetworkDiv.classList.toggle("active");
});

updateCurrentDirContainer(CURRENT_DIRECTORY);

terminalToggleBtn.addEventListener("click", () => {
  terminalContainer.classList.toggle("hidden");
  terminalToggleBtn.classList.toggle("hidden");
  currentDirContainer.classList.toggle("active");

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
    case "?":
      return help;
    case "quit":
      window.close();
      break;
    case "":
      return "";
    default:
      return "Unknown Command...\n";
  }
}

function slide(destination) {
  const sliderHeight = contentContainer.clientHeight;

  if (destination === CURRENT_DIRECTORY) return;
  // let movement = CURRENT_DIRECTORY - destination;
  contentRight.style.transform = `translateY(-${destination * sliderHeight}px)`;

  updateCurrentDirContainer(destination);

  CURRENT_DIRECTORY = destination;
}

function updateCurrentDirContainer(destination) {
  switch (destination) {
    case 0:
      currentDirContainer.innerText = "/home";

      break;
    case 1:
      currentDirContainer.innerText = "/skills";
      break;
    case 2:
      currentDirContainer.innerText = "/projects";
      break;
    case 3:
      currentDirContainer.innerText = "/interests";
      break;

    default:
      break;
  }
}

/* GET REPOS FROM GITHUB API */
async function getRepo(index) {
  try {
    const { data } = await axios(APIURL);

    if (index < 0) {
      repoIndex = data.length - 1;
      addRepoCard(data[repoIndex]);
    } else {
      repoIndex = index % data.length;
      addRepoCard(data[repoIndex]);
    }
  } catch (err) {
    alert("Problem fetching repos");
  }
}

function addRepoCard(repo) {
  const repoTitle = document.getElementById("project-title");
  const repoDescription = document.getElementById("description");
  const repoLink = document.getElementById("project-git-link");

  repoTitle.innerHTML = repo.name;
  repoTitle.innerHTML = `
              ${repo.name}
              
  `;
  repoDescription.innerText = repo.description;
  repoLink.href = repo.html_url;
  getLanguages(`/${repo.name}/languages`);
}

async function getLanguages(url) {
  const repoLanguages = document.getElementById("language");
  repoLanguages.innerText = "";
  // repoLanguages.innerText = "Languages: ";
  try {
    const { data } = await axios(
      "https://api.github.com/repos/IgorJelic" + url
    );

    // keys vraca niz kljuceva
    repoLanguages.innerText =
      Object.keys(data) == "" ? "No code" : Object.keys(data);
  } catch (err) {
    alert("Problem fetching repos");
  }
}
