
//Gets day abbreviation from full day name, e.g. "monday" -> "mon"
export const getDayAbbreviation = (day) => {
  switch (day) {
    case 'monday':
      return 'mon';
    case 'tuesday':
      return 'tue';
    case 'wednesday':
      return 'wed';
    case 'thursday':
      return 'thu';
    case 'friday':
      return 'fri';
    case 'extra':
      return 'ext';
    default:
      break;
  }
}

//calculates a total score for a given player (string) on a given day (object with scores for all players in arrays)
export const calculateTotalDayScoreForPlayer = (day, player) => {
  return day[player].reduce((pv, cv) => pv + cv, 0);
}

//Sums an array of scores
export const calculateTotalDayScore = (arr) => {
  return arr.reduce((pv, cv) => pv + cv, 0);
}

export const didPlayerWinWeek = (weekObj, player) => {
  let win = false;
  let players = ['Erik', 'Erlend'];
  const weekScores = calculateTotalWeekScores(weekObj);
  for (let [innerPlayer, weekScore] of Object.entries(weekScores)) {
    if (innerPlayer !== player){
      if (weekScore > weekScores.[player]){
        win = true;
      }
    }
  }
  return win;
}

export const calculateTotalWeekScores = (obj) => {
  var returnObj = {};
  for (let [day, scores] of Object.entries(obj)) {
    if (day !== 'week'){
      for (let [player, playerScores] of Object.entries(scores)) {
        if (!returnObj.hasOwnProperty(player)){
          returnObj.[player] = 0;
        }
        playerScores.forEach((score, i) => {
          returnObj.[player] += score;
        });
      }
    }
  }
  return returnObj;
}

export const calculateTotalWeekScoreForPlayer = (weekObj, player) => {
  // console.log(weekObj);
  let score = 0;
  for (let [day, scores] of Object.entries(weekObj)) {
    if (day !== 'week'){
      for (let [innerPlayer, playerScores] of Object.entries(scores)) {
        if (innerPlayer === player){
          score += calculateTotalDayScore(playerScores);
        }
      }
    }
  }
  return score;
}

export const calculateFirstPlacesInWeek = (weekObj, player) => {
  let firstPlaces = 0;
  for (let [day, scores] of Object.entries(weekObj)) {
    if (day !== 'week'){
      for (let [innerPlayer, playerScores] of Object.entries(scores)) {
        if (innerPlayer === player){
          playerScores.forEach((score, i) => {
            if (score === 1){
              firstPlaces += 1;
            }
          });
        }
      }
    }
  }
  return firstPlaces;
}

export const calculateBlundersInWeek = (weekObj, player) => {
  let blunders = 0;
  for (let [day, scores] of Object.entries(weekObj)) {
    if (day !== 'week'){
      for (let [innerPlayer, playerScores] of Object.entries(scores)) {
        if (innerPlayer === player){
          playerScores.forEach((score, i) => {
            if (score > 2){
              blunders += 1;
            }
          });
        }
      }
    }
  }
  return blunders;
}

// Returns the ISO week of the date.
export const getWeek = (date) => {
  var newDate = new Date(date.getTime());
  newDate.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  newDate.setDate(newDate.getDate() + 3 - (newDate.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(newDate.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((newDate.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}

//returns the URL for multiplayer grade badge
export const getMultiplayerPicture = (grade) => {
  switch (grade) {
    case "A":
      return 'https://www.mariowiki.com/images/a/aa/MKT_000PB.png';
    case "B":
      return 'https://www.mariowiki.com/images/c/c4/MKT_001PB.png';
    case "C":
      return 'https://www.mariowiki.com/images/e/ee/MKT_002PB.png';
    case "D":
      return 'https://www.mariowiki.com/images/7/7a/MKT_003PB.png';
    case "E":
      return 'https://www.mariowiki.com/images/9/97/MKT_004PB.png';
  }
}
