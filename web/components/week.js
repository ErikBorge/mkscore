import { useState, useEffect } from 'react';

import Day2 from './day2';
import { getDayAbbreviation } from '../utils/helpers';


const Week = ({week, object}) => {
  // console.log(object);
  const [weekScores, setWeekScores] = useState({Erik: 0, Erlend: 0})
  const [newWeekObject, setNewWeekObject] = useState(object);
  const [isNewDay, setIsNewDay] = useState(false);
  // const [dayScores, setDayScores] = useState([]);

  useEffect(() => {
    // console.log(document.querySelectorAll('form'));
    console.log(object);
    console.log(newWeekObject);

  });

  //Check if the first score is 0. then it's a new day
  const checkIsNewDay = (day) => {
    for (let [player, value] of Object.entries(newWeekObject.[getDayAbbreviation(day)])) {
      if (newWeekObject.[getDayAbbreviation(day)].[player][0] === 0) { return true }
      else { return false };
    }
  }

  const setDayScores = (object, day) => {
    setNewWeekObject(prevState => ({...prevState, [day]: object[day]}));
    // console.log(object);
  }
  // console.log(weekScores);
  return(
    <div className="week">
      <div className="week__number">
        Week {week}
      </div>
      <div className="week__days">
        <Day2 day={newWeekObject.mon} dayText={"monday"} sendScores={setDayScores} isNewDay={checkIsNewDay("monday")}/>
        <Day2 day={newWeekObject.tue} dayText={"tuesday"} sendScores={setDayScores} isNewDay={checkIsNewDay("tuesday")}/>
        <Day2 day={newWeekObject.wed} dayText={"wednesday"} sendScores={setDayScores} isNewDay={checkIsNewDay("wednesday")}/>
        <Day2 day={newWeekObject.thu} dayText={"thursday"} sendScores={setDayScores} isNewDay={checkIsNewDay("thursday")}/>
        <Day2 day={newWeekObject.fri} dayText={"friday"} sendScores={setDayScores} isNewDay={checkIsNewDay("friday")}/>
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
