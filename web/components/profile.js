import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import useSWR from "swr";
import urlFor from '../utils/imageUrl';
import Image from 'next/image'

import Day2 from './day2';
import {  calculateTotalDayScoreForPlayer,
          calculateTotalWeekScoreForPlayer,
          calculateFirstPlacesInWeek,
          calculateBlundersInWeek,
          didPlayerWinWeek,
          getMultiplayerPicture
          } from '../utils/helpers';


const Profile = ({player, data}) => {
  // console.log(object);
  // console.log(player, data);

  useEffect(() => {

  });


  // console.log(playerdata);
  //Number of wins
  const calculateWins = () => {
    let wins = 0;
    data.forEach((item, i) => {
      const week = JSON.parse(item.object);
      wins += didPlayerWinWeek(week, player.name) ? 1 : 0;
    })
    return wins;
  }

  //total score ever
  const calculateTotalScoreEver = () => {
    let totalScoreEver = 0;
    data.forEach((item, i) => {
      const week = JSON.parse(item.object);
      // console.log(week);
      for (let [day, scores] of Object.entries(week)) {
        if (day !== 'week'){
          totalScoreEver += calculateTotalDayScoreForPlayer(scores, player.name);
        }
      }
    });
    return totalScoreEver;
  }


  //All time low
  const calculateAllTimeLow = () => {
    let allTimeLow = 10000;
    data.forEach((item, i) => {
      const week = JSON.parse(item.object);
      let weekScore = calculateTotalWeekScoreForPlayer(week, player.name);
      if ( weekScore < allTimeLow) {
        allTimeLow = weekScore;
      }
    });
    return allTimeLow;
  }

  //First places
  const calculateFirstPlaces = () => {
    let firstPlaces = 0;
    data.forEach((item, i) => {
      const week = JSON.parse(item.object);
      firstPlaces += calculateFirstPlacesInWeek(week, player.name);
    })
    return firstPlaces;
  }

  //Blunders
  const calculateBlunders = () => {
    let blunders = 0;
    data.forEach((item, i) => {
      const week = JSON.parse(item.object);
      blunders += calculateBlundersInWeek(week, player.name);
    })
    return blunders;
  }


  useEffect(() => {


  });

  const renderStat = (name, value) => {
    return (
      <div className="profile__single-stat">
        <div className="profile__single-stat-text">{name}</div>
        <div className="profile__single-stat-value">{value}</div>
      </div>
    )
  }




  return(
    <div className="profile">
      <img className="profile__pic" src={urlFor(player.image).width(200).url()} />
      {player.name}<br/>
      <i>"{player.nick}"</i>
      <div className="profile__stats">
        <div className="profile__ranks">
          <div>Level: {player.level}</div>
          <div className="profile__tier">
            Tier:
            <Image
              src="/images/tier-background.png"
              alt={player.tier}
              width={120}
              height={56}
            />
              <div className="profile__tier-text">{player.tier}</div>

          </div>
          <div>Grade:
            <Image
              src={getMultiplayerPicture(player.multiplayerGrade)}
              alt={player.multiplayerGrade}
              width={60}
              height={60}
            />
          </div>
        </div>
        <div className="profile__main-stat">
          <h1>{calculateWins()}</h1>&nbsp;<h3>wins</h3>
        </div>
        { renderStat('Total score ever', calculateTotalScoreEver()) }
        { renderStat('All time low', calculateAllTimeLow()) }
        { renderStat('First places', calculateFirstPlaces()) }
        { renderStat('Blunders', calculateBlunders()) }
        { renderStat('Clean shits', '20') }
        { renderStat('Spotify minutes 2020', '67 901') }
        { renderStat('Spotify top artist 2020', 'Flyte') }
      </div>

    </div>
  )
}

export default Profile;
