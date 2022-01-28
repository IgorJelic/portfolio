const terminalToggleBtn = document.querySelector(".terminal-toggle");
const terminalContainer = document.querySelector(".terminal-container");
const terminalInput = document.querySelector(".terminal-console textarea");

const contactToggleBtn = document.querySelector(".contact-toggle");
const socialNetworkDiv = document.querySelector(".social-network");

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
