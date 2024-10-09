const teamId = parseInt(localStorage.getItem("teamId"));
const teamName = localStorage.getItem("teamName");
const minScore = parseInt(localStorage.getItem("minScore"));
const maxScore = parseInt(localStorage.getItem("maxScore"));
const minGoals = parseInt(localStorage.getItem("minGoals"));
const maxGoals = parseInt(localStorage.getItem("maxGoals"));
const teamColor = localStorage.getItem("teamColor");

const playerTeam = document.getElementById("player-team");

playerTeam.innerHTML = teamName;
playerTeam.style.background = teamColor;

const match = new Match(0, 0, 0, 0);

const teamScoreAndGoals = match.getTeamScoreAndGoals(
  minScore,
  maxScore,
  minGoals,
  maxGoals
);
document.getElementById("goals-available-value").innerHTML =
  teamScoreAndGoals.goals;

const opponentGoalsAndScores = match.getOpponentGoalsAndScores(teams, teamName);

const championshipMatches = match.getChampionshipMatches(
  opponentGoalsAndScores
);

document.getElementById("opposing-team").innerHTML =
  championshipMatches[0].team;
document.getElementById("opposing-team").style.backgroundColor =
  championshipMatches[0].color;
