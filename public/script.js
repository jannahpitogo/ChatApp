const submitName = document.getElementById("submit-name");
const firstPage = document.getElementById("first-page");
const chatPage = document.getElementById("chat-page");
const userName = document.getElementById("name-display");
const nameInputArea = document.getElementById("name-input");

submitName.addEventListener("click", (event) => {
  event.preventDefault();
  firstPage.style.display = "none";
  chatPage.style.display = "block";

  userName.textContent = `Welcome to the chat ${nameInputArea.value}`;
});

const sendMessageForm = document.getElementById("send-message-form");

sendMessageForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = document.getElementById("message-from-user").value;
  const user = nameInputArea.value;

  const res = await fetch("/newmessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      user,
    }),
  });

  const data = await res.text();
  sendMessageForm.reset();
  await displayMessage();

  return data;
});

async function displayMessage() {
  try {
    const response = await fetch("/messages");
    if (!response.ok) throw new Error("Server error");

    const messages = await response.json();

    const messageContainer = document.getElementById("message-display");
    messageContainer.innerHTML = messages
      .map((m) => `<p><strong>${m.user}:</strong> ${m.message}</p>`)
      .join("");
  } catch (error) {
    document.getElementById("message-display").textContent = "Connection error";
  }
}

window.onload = () => {
  displayMessage();
  setInterval(displayMessage, 3000);
};
