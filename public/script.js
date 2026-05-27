const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
const ws = new WebSocket(`${protocol}//${window.location.host}`);

ws.onmessage = (event) => {
  const messages = JSON.parse(event.data);
  const messageContainer = document.getElementById("message-display");

  messageContainer.innerHTML = messages
    .map((m) => {
      const side =
        nameInputArea && m.user === nameInputArea.value ? "right" : "left";
      return `
        <div class="message ${side}">
          <div class="body">${m.message}</div>
          <div class="meta">${m.user} • ${m.time}</div>
        </div>
      `;
    })
    .join("");

  messageContainer.scrollTop = messageContainer.scrollHeight;
};

const sendMessageForm = document.getElementById("send-message-form");
sendMessageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const messageInput = document.getElementById("message-from-user");
  const message = messageInput.value.trim();
  if (!message) return;
  const user = nameInputArea.value || "Anonymous";
  const time = new Date(Date.now()).toLocaleString();

  ws.send(JSON.stringify({ message, user, time }));
  messageInput.value = "";
});

const submitName = document.getElementById("submit-name");
const firstPage = document.getElementById("first-page");
const chatPage = document.getElementById("chat-page");
const userName = document.getElementById("name-display");
const nameInputArea = document.getElementById("name-input");

submitName.addEventListener("click", (event) => {
  event.preventDefault();
  firstPage.style.display = "none";
  chatPage.style.display = "block";
  userName.textContent = `Chat — ${nameInputArea.value}`;

  const avatar = document.querySelector(".avatar");
  if (avatar)
    avatar.textContent = nameInputArea.value
      ? nameInputArea.value.charAt(0).toUpperCase()
      : "A";
});

function escapeHtml(unsafe) {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// const sendMessageForm = document.getElementById("send-message-form");

// sendMessageForm.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const message = document.getElementById("message-from-user").value;
//   const user = nameInputArea.value;
//   const time = new Date(Date.now()).toLocaleString();

//   const res = await fetch("/newmessage", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       message,
//       user,
//       time,
//     }),
//   });

//   const data = await res.text();
//   sendMessageForm.reset();
//   await displayMessage();

//   return data;
// });

// async function displayMessage() {
//   try {
//     const response = await fetch("/messages");
//     if (!response.ok) throw new Error("Server error");

//     const messages = await response.json();

//     const messageContainer = document.getElementById("message-display");
//     messageContainer.innerHTML = messages
//       .map(
//         (m) => `<div style="margin:8px;">
//               <p style="margin:0; padding:0; display:flex"><strong>${m.user}:</strong> ${m.message}</p>
//               <p style="font-size: 13px; margin:0; padding:0; display:flex">${m.time}</p>
//               </div>`,
//       )
//       .join("");
//   } catch (error) {
//     document.getElementById("message-display").textContent = "Connection error";
//   }
// }

// window.onload = () => {
//   displayMessage();
//   setInterval(displayMessage, 3000);
// };
