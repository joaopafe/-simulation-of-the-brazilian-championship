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
    let finalOffset = offset;

    if (offset === 4) finalOffset = 3;
    if (offset === 3) finalOffset = 2;
    if (offset === 2) finalOffset = 1;

    if (matchLocal === "Em casa") {
      if (finalOffset > 0) {
        return finalOffset + this.getRandomGoals([-1, 0, 1]);
      }
      return finalOffset + this.getRandomGoals([1, 2, 3, 4]);
    }

    if (matchLocal === "Fora de casa") {
      if (finalOffset > 0) {
        return finalOffset + this.getRandomGoals([0, 1, 2]);
      }
      return finalOffset + this.getRandomGoals([1, 2, 3, 4, 5]);
    }
  }

  offsetGoalsCalculation(teamGoals, opponentGoals, teamScore, opponentScore) {
    const goalsDifference = teamGoals / opponentGoals;
    const scoreDifference = teamScore / opponentScore;

    let goalsOffset = 0;
    let scoreOffset = 0;

    if (goalsDifference >= 0.8 && goalsDifference < 1.2) goalsOffset = 0;

    if (goalsDifference < 0.8 && goalsDifference >= 0.5) goalsOffset = 1;

    if (goalsDifference < 0.5) goalsOffset = 2;

    if (goalsDifference >= 1.2 && goalsDifference < 1.5) goalsOffset = -1;

    if (goalsDifference >= 1.5) goalsOffset = -2;

    if (scoreDifference >= 0.8 && scoreDifference < 1.2) scoreOffset = 0;

    if (scoreDifference < 0.8 && scoreDifference >= 0.5) scoreOffset = 1;

    if (scoreDifference < 0.5) scoreOffset = 2;

    if (scoreDifference >= 1.2 && scoreDifference < 1.5) scoreOffset = -1;

    if (scoreDifference >= 1.5) scoreOffset = -2;

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
    if (this.nextMatch === true)
      window.alert("Você já jogou esta partida, por favor clique em 'Próximo'");

    const teamGoalsOnTheMatch = parseInt(
      document.getElementById("player-team-score").value
    );

    const goalsAvailable = parseInt(
      document.getElementById("goals-available-value").innerHTML
    );

    if (teamGoalsOnTheMatch < 0) {
      window.alert("Você só pode informar um número positivo de gols");
    }

    if (teamGoalsOnTheMatch > goalsAvailable) {
      window.alert(
        `Você não pode marcar ${teamGoalsOnTheMatch} gols, pois possui somente ${goalsAvailable} gols disponíveis.`
      );
    }

    if (this.nextMatch === false && teamGoalsOnTheMatch < goalsAvailable) {
      this.getOpponentGoals(opponentGoalsAndScores);

      const opponentGoals = this.opponentGoals;

      if (teamGoalsOnTheMatch >= 0) {
        document.getElementById("opposing-team-score").innerHTML =
          opponentGoals;

        if (teamGoalsOnTheMatch < opponentGoals) {
          this.matchesPlayed++;

          this.updateChampionshipInformation(0, teamGoalsOnTheMatch);
        }

        if (teamGoalsOnTheMatch === opponentGoals) {
          this.matchesPlayed++;

          this.updateChampionshipInformation(1, teamGoalsOnTheMatch);
        }

        if (teamGoalsOnTheMatch > opponentGoals) {
          this.matchesPlayed++;

          this.updateChampionshipInformation(3, teamGoalsOnTheMatch);
        }

        this.nextMatch = true;
      }
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
    if (this.matchesPlayed === 38) {
      const finalTeamScore = parseInt(
        document.getElementById("current-score-value").innerHTML
      );

      this.redirectToFinalClassification(
        finalTeamScore,
        opponentGoalsAndScores
      );
    }

    if (this.matchesPlayed < 38) {
      const opponent = championshipMatches[this.matchesPlayed].team;
      const color = championshipMatches[this.matchesPlayed].color;
      const matchLocal = championshipMatches[this.matchesPlayed].matchLocal;

      document.getElementById("opposing-team-score").innerHTML = "?";
      document.getElementById("opposing-team").innerHTML = opponent;
      document.getElementById("opposing-team").style.backgroundColor = color;
      document.getElementById("place-match-value").innerHTML = matchLocal;

      this.nextMatch = false;
    }
  }

  redirectToFinalClassification(finalTeamScore, opponentGoalsAndScores) {
    let finalScore = [];

    opponentGoalsAndScores.filter((team) => {
      finalScore.push({
        teamName: team.teamName,
        score: team.score,
      });
    });

    finalScore.push({
      teamName: localStorage.getItem("teamName"),
      score: finalTeamScore,
    });

    localStorage.setItem("finalScore", JSON.stringify(finalScore));

    window.location.href = "../finalClassification/final-classification.html";
  }
}
