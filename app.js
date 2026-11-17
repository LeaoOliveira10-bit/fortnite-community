
let players = JSON.parse(
  localStorage.getItem("players") || "[]"
);

// Compatibilidade com jogadores da versão anterior
players = players.map(player =>
  typeof player === "string"
    ? { name: player, points: 0 }
    : player
);

function savePlayers() {
  localStorage.setItem("players", JSON.stringify(players));
}

function render() {
  const list = document.getElementById("players");
  const ranking = document.getElementById("ranking");
  const select = document.getElementById("playerSelect");

  list.innerHTML = "";
  ranking.innerHTML = "";

  const previousSelection = select.value;
  select.innerHTML = '<option value="">Selecione um jogador</option>';

  players.forEach((player, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = player.name;
    select.appendChild(option);

    const item = document.createElement("li");
    item.textContent = `${player.name} — ${player.points} pontos`;

    const remove = document.createElement("button");
    remove.textContent = "Remover";
    remove.addEventListener("click", () => {
      players.splice(index, 1);
      savePlayers();
      render();
    });

    item.appendChild(remove);
    list.appendChild(item);
  });

  if (players[Number(previousSelection)]) {
    select.value = previousSelection;
  }

  const ordered = [...players].sort(
    (a, b) => b.points - a.points
  );

  ordered.forEach((player, index) => {
    const item = document.createElement("li");
    item.textContent =
      `${index + 1}º — ${player.name}: ${player.points} pontos`;
    ranking.appendChild(item);
  });
}

function addPlayer() {
  const input = document.getElementById("player");
  const name = input.value.trim();

  if (!name) {
    alert("Digite o nome do jogador!");
    return;
  }

  if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
    alert("Esse jogador já existe!");
    return;
  }

  players.push({ name, points: 0 });
  input.value = "";

  savePlayers();
  render();
}

function addPoints() {
  const select = document.getElementById("playerSelect");
  const pointsInput = document.getElementById("points");

  const index = Number(select.value);
  const points = Number(pointsInput.value);

  if (select.value === "" || !players[index]) {
    alert("Selecione um jogador!");
    return;
  }

  if (!Number.isInteger(points) || points < 1) {
    alert("Digite uma quantidade válida de pontos!");
    return;
  }

  players[index].points += points;

  pointsInput.value = "";
  savePlayers();
  render();
}

function connectDiscord() {
  alert("Integração com Discord em desenvolvimento!");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("addPlayer")
    .addEventListener("click", addPlayer);

  document.getElementById("addPoints")
    .addEventListener("click", addPoints);

  document.getElementById("connectDiscord")
    .addEventListener("click", connectDiscord);

  render();
});
