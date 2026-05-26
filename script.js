const submitName = document.getElementById("submit-name");
const firstPage = document.getElementById("first-page");
const chatPage = document.getElementById("chat-page");
const userName = document.getElementById("name-display");

submitName.addEventListener("click", (event) => {
  event.preventDefault();
  firstPage.style.display = "none";
  chatPage.style.display = "block";

  const nameInputArea = document.getElementById("name-input").value;
  userName.textContent = `Welcome to the chat ${nameInputArea}`;
});
