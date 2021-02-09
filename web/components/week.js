import { useState, useRef, useEffect, useLayoutEffect } from 'react';

import Day2 from './day2';
import {  getDayAbbreviation,
          calculateTotalWeekScores
        } from '../utils/helpers';


const Week = ({week, object, updateWeek, id, isNewWeek}) => {
  // console.log(object);
  const [weekScores, setWeekScores] = useState({Erik: 0, Erlend: 0})
  const [newWeekObject, setNewWeekObject] = useState(object);
  const [isNewDay, setIsNewDay] = useState(false);
  // const [dayScores, setDayScores] = useState([]);
  const [totalWeekScores, setTotalWeekScores] = useState({});
  const [isOpen, setIsOpen] = useState(isNewWeek ? true : false);
  const firstUpdate = useRef(true);

  useEffect(() => {
    // console.log(document.querySelectorAll('form'));
    // console.log('newWeekObject', newWeekObject);
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return
    }
    updateWeek(newWeekObject, id);
    // isNewWeek && setIsOpen(true);
    console.log(isNewWeek);

  }, [newWeekObject]);

  useEffect(() => {
    setTotalWeekScores(calculateTotalWeekScores(object));
  }, [object]);

  useEffect(() => {
    const weekElement = document.getElementById(`week-days-${week}`);
    // weekElement.style.opacity = `${isOpen ? '1' : 0}`;
    // weekElement.style.visibility = `${isOpen ? 'visible' : 'hidden'}`;
    weekElement.style.display = `${isOpen ? 'flex' : 'none'}`;

  });

  // console.log(totalWeekScores);
  //Check if the first score is 0. then it's a new day
  const checkIsNewDay = (day) => {
    for (let [player, value] of Object.entries(newWeekObject.[getDayAbbreviation(day)])) {
      if (newWeekObject.[getDayAbbreviation(day)].[player][0] === 0) { return true }
      else { return false };
    }
  }

  const setDayScores = (object, day) => {
    setNewWeekObject(prevState => ({...prevState, [day]: object[day], week: week}));

    // console.log(object);
  }

  const renderWinner = () => {
    let winner = 'hey';
    let winnerScore = 10000;
    Object.entries(totalWeekScores).forEach(([player, score]) => {
      if (score < winnerScore){
        winnerScore = score;
        winner = `The winner is ${player}!`;
      }
      else if (score === winnerScore){
        winner = "it's a mo";
      }
    })
    return <div><h3>{winner}</h3></div>;
  }

  const toggleWeekView = () => {
    setIsOpen(!isOpen);
  }

  // console.log(weekScores);
  return(
    <div className={`week${isOpen ? ' open' : ''}`}>
      <div className="week__number" onClick={toggleWeekView}>
        Week {week}
      </div>
      <div className="week__days" id={`week-days-${week}`}>
        <Day2 day={newWeekObject.mon} dayText={"monday"} sendScores={setDayScores} isNewDay={checkIsNewDay("monday")}/>
        <Day2 day={newWeekObject.tue} dayText={"tuesday"} sendScores={setDayScores} isNewDay={checkIsNewDay("tuesday")}/>
        <Day2 day={newWeekObject.wed} dayText={"wednesday"} sendScores={setDayScores} isNewDay={checkIsNewDay("wednesday")}/>
        <Day2 day={newWeekObject.thu} dayText={"thursday"} sendScores={setDayScores} isNewDay={checkIsNewDay("thursday")}/>
        <Day2 day={newWeekObject.fri} dayText={"friday"} sendScores={setDayScores} isNewDay={checkIsNewDay("friday")}/>
      </div>
      <div className="week__stats">
        { totalWeekScores && renderWinner() }
        { totalWeekScores && Object.entries(totalWeekScores).map(([player, score]) => {
            return <span key={player}>{player}: {score}<br/></span>
          })
        }

      </div>
    </div>
  )
}

export default Week;



// {object.map((day, key) => {
//   return (
//     <div className="week__day">
//       {day}
//       <div className="week__day-round">
//       </div>
//     </div>
//   )
// })}
