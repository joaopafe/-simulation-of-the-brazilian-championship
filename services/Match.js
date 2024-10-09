class Match {
  constructor() {
    this.teamPontuation = 0;
    this.teamScore = 0;
    this.teamGoals = 0;
    this.matchesPlayed = 0;
    this.nextMatch = false;
    this.opponentGoals = 0;
  }

  getTeamScoreAndGoals(minScore, maxScore, minGoals, maxGoals) {
    this.teamScore = getRandomValue(maxScore, minScore);
    this.teamGoals = getRandomValue(maxGoals, minGoals);

    localStorage.setItem("teamScore", this.teamScore);
    localStorage.setItem("teamGoals", this.teamGoals);

    return { score: this.teamScore, goals: this.teamGoals };
  }

  getOpponentGoalsAndScores(teams, teamName) {
    let opponentGoalsAndScores = [];

    for (const team of teams) {
      if (team.name === teamName) continue;

      opponentGoalsAndScores.push({
        teamId: team.id,
        teamName: team.name,
        score: getRandomValue(team.maxScore, team.minScore),
        goals: getRandomValue(team.maxGoals, team.minGoals),
        color: team.color,
      });
    }

    return opponentGoalsAndScores;
  }

  getChampionshipMatches(opponentGoalsAndScores) {
    let championshipMatches = [];

    for (let index = 0; index < opponentGoalsAndScores.length; index++) {
      let matchLocal = "Em casa";

      if (index % 2 === 0) {
        matchLocal = "Em casa";
      }

      if (index % 2 !== 0) {
        matchLocal = "Fora de casa";
      }

      championshipMatches.push({
        team: opponentGoalsAndScores[index].teamName,
        score: opponentGoalsAndScores[index].score,
        goals: opponentGoalsAndScores[index].goals,
        color: opponentGoalsAndScores[index].color,
        matchLocal: matchLocal,
      });

      if (index === opponentGoalsAndScores.length - 1) {
        for (let index = 0; index < opponentGoalsAndScores.length; index++) {
          let matchLocal = "Fora de casa";

          if (index % 2 === 0) {
            matchLocal = "Fora de casa";
          }

          if (index % 2 !== 0) {
            matchLocal = "Em casa";
          }

          championshipMatches.push({
            team: opponentGoalsAndScores[index].teamName,
            score: opponentGoalsAndScores[index].score,
            goals: opponentGoalsAndScores[index].goals,
            color: opponentGoalsAndScores[index].color,
            matchLocal: matchLocal,
          });
        }
      }
    }

    return championshipMatches;
  }

  getRandomGoals(possibleValues) {
    return possibleValues[Math.floor(Math.random() * possibleValues.length)];
  }

  getOpponentInformations(opponentGoalsAndScores, opponentTeam) {
    let opponentInformations = {};

    opponentGoalsAndScores.filter((team) => {
      if (team.teamName == opponentTeam.team) {
        opponentInformations.score = team.score;
        opponentInformations.goals = team.goals;
      }
    });

    return opponentInformations;
  }

  calculateGoalsByMatchLocal(offset, matchLocal) {
    if (matchLocal === "Em casa") {
      return offset + this.getRandomGoals([-1, 0, 1]);
    }

    if (matchLocal === "Fora de casa") {
      return offset + this.getRandomGoals([0, 1, 2]);
    }
  }

  offsetGoalsCalculation(teamGoals, opponentGoals, teamScore, opponentScore) {
    const goalsDifference = teamGoals / opponentGoals;
    const scoreDifference = teamScore / opponentScore;

    let goalsOffset = 0;
    let scoreOffset = 0;

    if (goalsDifference >= 0.8 && goalsDifference < 1.2) goalsOffset = 0;

    if (goalsDifference < 0.8 && goalsDifference >= 0.6) goalsOffset = 1;

    if (goalsDifference < 0.6) goalsOffset = 2;

    if (goalsDifference >= 1.2 && goalsDifference < 1.4) goalsOffset = -1;

    if (goalsDifference >= 1.4) goalsOffset = -2;

    if (scoreDifference >= 0.8 && scoreDifference < 1.2) scoreOffset = 0;

    if (scoreDifference < 0.8 && scoreDifference >= 0.6) scoreOffset = 1;

    if (scoreDifference < 0.6) scoreOffset = 2;

    if (scoreDifference >= 1.2 && scoreDifference < 1.4) scoreOffset = -1;

    if (scoreDifference >= 1.4) scoreOffset = -2;

    return goalsOffset + scoreOffset;
  }

  getOpponentGoals(opponentGoalsAndScores) {
    const opponentTeam = championshipMatches[this.matchesPlayed];

    const opponentInformations = this.getOpponentInformations(
      opponentGoalsAndScores,
      opponentTeam
    );

    const offset = this.offsetGoalsCalculation(
      teamScoreAndGoals.goals,
      opponentInformations.goals,
      teamScoreAndGoals.score,
      opponentInformations.score
    );

    const matchLocal = document.getElementById("place-match-value").innerHTML;

    const opponentGoals = this.calculateGoalsByMatchLocal(offset, matchLocal);

    if (opponentGoals < 0) this.opponentGoals = 0;

    if (opponentGoals >= 0) this.opponentGoals = opponentGoals;
  }

  runMatch() {
    this.getOpponentGoals(opponentGoalsAndScores);

    const opponentGoals = this.opponentGoals;

    const teamGoalsOnTheMatch = parseInt(
      document.getElementById("player-team-score").value
    );

    document.getElementById("opposing-team-score").innerHTML = opponentGoals;

    if (teamGoalsOnTheMatch < opponentGoals) {
      this.updateChampionshipInformation(0, teamGoalsOnTheMatch);
    }

    if (teamGoalsOnTheMatch === opponentGoals) {
      this.updateChampionshipInformation(1, teamGoalsOnTheMatch);
    }

    if (teamGoalsOnTheMatch > opponentGoals) {
      this.updateChampionshipInformation(3, teamGoalsOnTheMatch);
    }
  }

  updateChampionshipInformation(earnedScores, teamGoalsOnTheMatch) {
    this.teamPontuation += earnedScores;
    const goalsAvailable = parseInt(
      document.getElementById("goals-available-value").innerHTML
    );

    document.getElementById("matches-played-value").innerHTML =
      this.matchesPlayed;

    document.getElementById("current-score-value").innerHTML =
      this.teamPontuation;

    document.getElementById("goals-available-value").innerHTML =
      goalsAvailable - teamGoalsOnTheMatch;
  }

  updateMatch() {
    this.matchesPlayed++;

    const opponent = championshipMatches[this.matchesPlayed].team;
    const color = championshipMatches[this.matchesPlayed].color;
    const matchLocal = championshipMatches[this.matchesPlayed].matchLocal;

    document.getElementById("opposing-team-score").innerHTML = "?";
    document.getElementById("opposing-team").innerHTML = opponent;
    document.getElementById("opposing-team").style.backgroundColor = color;
    document.getElementById("place-match-value").innerHTML = matchLocal;
  }
}
