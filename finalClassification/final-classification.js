let finalScore = JSON.parse(localStorage.getItem("finalScore"));

finalScore.sort((a, b) => {
  return b.score - a.score;
});

// Updates team names in the standings
document.getElementById("first-team").innerHTML = finalScore[0].teamName;
document.getElementById("second-team").innerHTML = finalScore[1].teamName;
document.getElementById("third-team").innerHTML = finalScore[2].teamName;
document.getElementById("fourth-team").innerHTML = finalScore[3].teamName;
document.getElementById("fifth-team").innerHTML = finalScore[4].teamName;
document.getElementById("sixth-team").innerHTML = finalScore[5].teamName;
document.getElementById("seventh-team").innerHTML = finalScore[6].teamName;
document.getElementById("eighth-team").innerHTML = finalScore[7].teamName;
document.getElementById("ninth-team").innerHTML = finalScore[8].teamName;
document.getElementById("tenth-team").innerHTML = finalScore[9].teamName;
document.getElementById("eleventh-team").innerHTML = finalScore[10].teamName;
document.getElementById("twelfth-team").innerHTML = finalScore[11].teamName;
document.getElementById("thirteenth-team").innerHTML = finalScore[12].teamName;
document.getElementById("fourteenth-team").innerHTML = finalScore[13].teamName;
document.getElementById("fifteenth-team").innerHTML = finalScore[14].teamName;
document.getElementById("sixteenth-team").innerHTML = finalScore[15].teamName;
document.getElementById("seventeenth-team").innerHTML = finalScore[16].teamName;
document.getElementById("eighteenth-team").innerHTML = finalScore[17].teamName;
document.getElementById("nineteenth-team").innerHTML = finalScore[18].teamName;
document.getElementById("twentieth-team").innerHTML = finalScore[19].teamName;

// Updates team scores in the standings
document.getElementById("first-score").innerHTML = finalScore[0].score;
document.getElementById("second-score").innerHTML = finalScore[1].score;
document.getElementById("third-score").innerHTML = finalScore[2].score;
document.getElementById("fourth-score").innerHTML = finalScore[3].score;
document.getElementById("fifth-score").innerHTML = finalScore[4].score;
document.getElementById("sixth-score").innerHTML = finalScore[5].score;
document.getElementById("seventh-score").innerHTML = finalScore[6].score;
document.getElementById("eighth-score").innerHTML = finalScore[7].score;
document.getElementById("ninth-score").innerHTML = finalScore[8].score;
document.getElementById("tenth-score").innerHTML = finalScore[9].score;
document.getElementById("eleventh-score").innerHTML = finalScore[10].score;
document.getElementById("twelfth-score").innerHTML = finalScore[11].score;
document.getElementById("thirteenth-score").innerHTML = finalScore[12].score;
document.getElementById("fourteenth-score").innerHTML = finalScore[13].score;
document.getElementById("fifteenth-score").innerHTML = finalScore[14].score;
document.getElementById("sixteenth-score").innerHTML = finalScore[15].score;
document.getElementById("seventeenth-score").innerHTML = finalScore[16].score;
document.getElementById("eighteenth-score").innerHTML = finalScore[17].score;
document.getElementById("nineteenth-score").innerHTML = finalScore[18].score;
document.getElementById("twentieth-score").innerHTML = finalScore[19].score;

function restartGame() {
  window.location.href = "../teamSelection/team-selection.html";
}
