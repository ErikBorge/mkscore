import {useState, useEffect} from 'react';

const DayEditable = ({day, dayText, scores}) => {
  // console.log(day);
  // let rounds = [];
  const playerObj = [];
  const scoreObj = [];

  useEffect(() => {
    // updatePlayers();


  }, [day])

  for (let [player, value] of Object.entries(day)) {
    playerObj.push(player);
    scoreObj.push(value);
  }

  return(
    <div className="day">
      <span>{dayText}</span>
      <div className="day__players">
        <div className="day__player-names">
          { playerObj.map((player, key) => {
              return <div className="day__player" key={key}>{player}</div>
            })
          }
        </div>
          <div className="day__player-scores">
            {
              scoreObj.map((scores, key) => {
                let totalScore = 0;
                return (
                  <div className="day__player-scores-inner">
                    { scores.map((score, key2) => {
                        totalScore += score;
                        return <div className="day__player-score" key={key2}>{score}</div>
                      })
                    }
                    <div className="day__line"></div>
                    <span><b>{totalScore}</b></span>
                  </div>
                )
                })
            }
          </div>
      </div>

    </div>
  )
}

export default DayEditable;


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
