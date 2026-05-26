const submitName = document.getElementById("submit-name");
const firstPage = document.getElementById("first-page");
const chatPage = document.getElementById("chat-page");

submitName.addEventListener("click", (event) => {
  event.preventDefault();
  firstPage.style.display = "none";
  chatPage.style.display = "block";
});
