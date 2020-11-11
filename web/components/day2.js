import Fragment, {useState, useEffect} from 'react';
import { getDayAbbreviation } from '../utils/helpers';

const Day2 = ({day, dayText, sendScores, isNewDay}) => {
  // console.log(day);
  // let rounds = [];

  const [newDay, setNewDay] = useState(false);
  const [dayScores, setDayScores] = useState({});

  const playerObj = [];
  const scoreObj = [];

  const rounds = [0,0,0,0,0];

  useEffect(() => {
    // updatePlayers();
    scoreObj.map((scores, key) => {
      if (scores[0] === 0){ setNewDay(true)}
      else { setNewDay(false) };
    })
  }, [day])

  useEffect(() => {
    // console.log(document.querySelectorAll('form'));
    // console.log(dayScores);
  });

  for (let [player, value] of Object.entries(day)) {
    playerObj.push(player);
    scoreObj.push(value);
  }


  const calculateTotalDayScore = (player) => {
    return day[player].reduce((pv, cv) => pv + cv, 0);
  }

  const getInputDayScoresForPlayer = (day, player) => {
    const searchString = `score-${player}-${day}`;
    const arr = [];
    document.querySelectorAll(`[id^=${searchString}]`).forEach((item, i) => {
      arr.push( !Number.isNaN(parseInt(item.value)) ? parseInt(item.value) : 0 );
    })
    return arr;
  }

  const calculateTotalNewDayScore = (event, player) => {
    // console.log(event.target, player);
    let idString = event.target.id.slice(event.target.id.search('-')+1, event.target.id.length-2);
    // let playerString = idString.slice(0, idString.search('-'));
    let dayString = idString.slice(idString.search('-')+1, idString.length);

    let score = 0;
    getInputDayScoresForPlayer(dayString, player).forEach((item, i) => {
      score += item;
    });
    setDayScores(prevScores => ({...prevScores, [player]: score}));
  }

  const handleSubmit = () => {
    let submitObj = {};
    const dayAbbr = getDayAbbreviation(dayText);
    submitObj.[dayAbbr] = {};
    playerObj.forEach((player, i) => {
      submitObj.[dayAbbr].[player] = getInputDayScoresForPlayer(dayText, player);
    });

    sendScores(submitObj, dayAbbr);
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
            { !isNewDay ?
              <>
                {
                rounds.map((element, round) => {
                  let totalScore = 0;
                  return (
                    <div className="day__round" key={round}>
                      { playerObj.map((player, key2) => {
                          //totalScore += score;
                          return <div className="day__player-score" key={key2}>{day[player][round]}</div>
                        })
                      }


                    </div>
                  )
                  })
                }
                <div className="day__line"></div>
                <div className="day__round">

                  {
                    playerObj.map((player, key) => {
                      return (
                        <div className="day__player-score" key={key}>
                          <b>{calculateTotalDayScore(player)}</b>
                        </div>
                      )
                    })
                  }
                </div>
              </>
              : <>
              {
                rounds.map((element, key) => {
                  return (
                    <div className="day__round" key={key}>
                      {/*<form id={`score-form-${playerObj[key]}-${dayText}`}>*/}
                      { playerObj.map((player, key2) => {
                          return(
                            <div className="day__player-score" key={key2}>
                              <input
                                type="text"
                                name="score"
                                id={`score-${playerObj[key2]}-${dayText}-${key+1}`}
                                placeholder="0"
                                onChange={e => calculateTotalNewDayScore(e, player)}
                              />
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                })
              }
              <div className="day__line"></div>
                <div className="day__round">
                {
                  playerObj.map((player, key) => {
                    return (
                      <span><b>{dayScores[`${playerObj[key]}`] ? dayScores[`${playerObj[key]}`] : '0'}</b></span>
                    )
                  })
                }
              </div>
              </>
            }
            { isNewDay &&
              <div className="day__submit-button" onClick={handleSubmit}>Save</div>
            }
          </div>
      </div>

    </div>
  )
}

export default Day2;


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
