const teamSelectiontForm = document.getElementById("team-selection-form");
let idSelected = 1;
let nameSelected = "América Mineiro";
let teamSelected = {
  id: 1,
  name: "América Mineiro",
  estimatedScore: 34,
  minScore: 23,
  maxScore: 45,
  estimatedGoals: 40,
  minGoals: 32,
  maxGoals: 48,
  color: "#1f981d",
};
let minScore = 23;
let maxScore = 45;
let minGoals = 32;
let maxGoals = 48;
let teamColor = "#1f981d";

teamSelectiontForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(event.target);
  const dataEntries = [...data.entries()];

  idSelected = dataEntries[0][1];
  teamSelected = teams.filter((team) => team.id == idSelected);
  nameSelected = teamSelected[0].name;
  minScore = teamSelected[0].minScore;
  maxScore = teamSelected[0].maxScore;
  minGoals = teamSelected[0].minGoals;
  maxGoals = teamSelected[0].maxGoals;
  teamColor = teamSelected[0].color;

  console.log(JSON.stringify(teamSelected));

  localStorage.setItem("teamId", idSelected);
  localStorage.setItem("teamName", nameSelected);
  localStorage.setItem("minScore", minScore);
  localStorage.setItem("maxScore", maxScore);
  localStorage.setItem("minGoals", minGoals);
  localStorage.setItem("maxGoals", maxGoals);
  localStorage.setItem("teamColor", teamColor);
});
