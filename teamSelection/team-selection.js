const teamSelectiontForm = document.getElementById("team-selection-form");
let idSelected = 0;
let nameSelected = "América Mineiro";
let teamSelected = { id: 1, name: "América Mineiro" };

teamSelectiontForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(event.target);
  const dataEntries = [...data.entries()];

  idSelected = dataEntries[0][1];
  teamSelected = teams.filter((team) => team.id == idSelected);
  nameSelected = teamSelected[0].name;

  localStorage.setItem("teamId", idSelected);
  localStorage.setItem("teamName", nameSelected);
});
