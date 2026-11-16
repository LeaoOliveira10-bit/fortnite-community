
const players = JSON.parse(
  localStorage.getItem("players") || "[]"
);

function renderPlayers() {
  const list = document.getElementById("players");

  if (!list) return;

  list.innerHTML = "";

  players.forEach((player, index) => {
    const item = document.createElement("li");
    item.textContent = player;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";

    removeButton.addEventListener("click", () => {
      players.splice(index, 1);
      savePlayers();
      renderPlayers();
    });

    item.appendChild(removeButton);
    list.appendChild(item);
  });
}

function savePlayers() {
  localStorage.setItem(
    "players",
    JSON.stringify(players)
  );
}

function addPlayer() {
  const input = document.getElementById("player");
  const name = input.value.trim();

  if (!name) {
    alert("Digite o nome do jogador!");
    return;
  }

  if (players.includes(name)) {
    alert("Esse jogador já está cadastrado!");
    return;
  }

  players.push(name);
  savePlayers();

  input.value = "";
  renderPlayers();
}

function connectDiscord() {
  alert(
    "A integração com Discord será implementada em uma próxima etapa."
  );
}

document.addEventListener("DOMContentLoaded", () => {
  renderPlayers();

  document
    .getElementById("addPlayer")
    ?.addEventListener("click", addPlayer);

  document
    .getElementById("connectDiscord")
    ?.addEventListener("click", connectDiscord);
});
