const teamId = localStorage.getItem("teamId");
const teamName = localStorage.getItem("teamName");
const minScore = localStorage.getItem("minScore");
const maxScore = localStorage.getItem("maxScore");
const minGoals = localStorage.getItem("minGoals");
const maxGoals = localStorage.getItem("maxGoals");
const teamColor = localStorage.getItem("teamColor");

const playerTeam = document.getElementById("player-team");

playerTeam.innerHTML = teamName;
playerTeam.style.background = teamColor;
