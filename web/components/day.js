import {useState, useEffect} from 'react';

const Day = ({day, dayText, scores}) => {
  // console.log(day);
  // let rounds = [];
  const [players, setPlayers] = useState(['Erik', 'Erlend']);
  const [dayScores, setDayScores] = useState({Erik: day.Erik, Erlend: day.Erlend});
  const [totalDayScores, setTotalDayScores] = useState({});

  useEffect(() => {
    // updatePlayers();
    updateScores();
    players.forEach((player, i) => {
      scores(player, totalDayScores[player]);
    });
  }, [day])

  const updateScores = () => {
    let totalScores = {};
    players.forEach((player) => {
      // setDayScores(prevState => ({...prevState, [player]: day[player]}));

      let totalScore = 0;
      dayScores[player].forEach((score, key) => {
        totalScore += score;
      })
      // console.log(totalScore);
      totalScores[player] = totalScore;
      // setTotalDayScores(prevScores => ({...prevScores, totalScore}));
    })
    setTotalDayScores(totalScores);
    // console.log(totalScores);
  }


  // console.log(totalDayScores);
  // console.log(dayScores);
  // console.log(players);
  return(
    <div className="day">
      <span>{dayText}</span>
      <div className="day__players">
        { dayScores &&
          players.map((player, key) => {
            return (
              <div key={key} className="day__player">
                <span>{player}</span>
                {dayScores[player].map((score, key) => {
                  return <span key={key}><br/>{score}</span>
                })}
                <div className="day__line"></div>
                <span><b>{totalDayScores[player]}</b></span>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default Day;


// const updatePlayers = () => {
//
//   for (let [player, value] of Object.entries(day)) {
//     // console.log(player);
//     if (!players.includes(player)) {
//       setPlayers(prevState => [...prevState, player]);
//     }
//
//   }
// }
// const renderScores = () => {
//   for (let [key, value] of Object.entries(day)) {
//     // rounds.push(value);
//     return (
//       <>
//         <span>{key}</span>
//         {players.map((score) => {
//           return <span>{score}</span>
//         })}
//       </>
//     )
//   }
// }

// {
//   day.map((round, key) => {
//     console.log(round);
//   })
// }

// {rounds.map((element, key) => {
//   console.log(element);
//   return(
//     <>
//     </>
//   )
// })}
