import socketio from "socket.io-client";
const io = socketio(window.location.toString(), {});

let connectionStatusElement: HTMLSpanElement =
  document.querySelector(".connection-status");
let changeStatusButton: HTMLButtonElement = document.querySelector(
  ".connection-change-button"
);

io.on("connect", () => {
  connectionStatusElement.innerHTML = "Connected";
});

io.on("disconnect", (reason) => {
  connectionStatusElement.innerHTML = "Disconnected";
});

changeStatusButton.addEventListener("click", () => {
  if (io.connected) {
    io.disconnect();
  } else {
    io.connect();
  }
});
