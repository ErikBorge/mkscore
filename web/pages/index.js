import Head from 'next/head'
import Link from 'next/link'
import {useState} from 'react'

import useSWR, { mutate } from "swr";
import client from '../utils/client';
import object from '../dataobject';
import defaultobject from '../defaultobject';
import {getWeek} from '../utils/helpers';

import Week from '../components/week';
import Profile from '../components/profile';

const query = `
{
  "data": *[_type == "data"] | order(week desc),
  "player": *[_type == "player"]
}`;



export default function Home() {

  const [stats, setStats] = useState({})
  const [newWeek, setNewWeek] = useState(false);
  const [players, setPlayers] = useState([]);

  const { data, error } = useSWR(query, query =>
    client.fetch(query)
  )

  if (error) {
    console.log(error);
    return <div className="App">I'm sorry, something wrong happened. </div>
  }
  // let data = object;

  const createNewWeek = () => {
    setNewWeek(true);
    // console.log(new Date);
    // console.log(getWeek(new Date));
  }

  const updateWeek = (object, id) => {
    const mutations = [{
     createOrReplace : {
       _type: 'data',
       _id: id ? id : null,
       week: object.week,
       object: JSON.stringify(object)
     }
    }]
    // console.log('mutations', mutations);
    // mutate(sanityClient, mutations);
    // try {
    //   const returnValue = mutate(sanityClient, mutations[0])
    // } catch (error) {
    //   // Handle an error while updating the user here
    //   console.log(error);
    // }
    fetch(`https://ckjx33ma.api.sanity.io/v1/data/mutate/production`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer skwa0Z6GpGwXULs744cC4XPZNuNYQqXcWYcaMWpYf5MPeI2zbsPNaUZLKZmUaqumyg9uzxrecwT9CE5dgXiDIeExvKrm9N74rr6T7myx0A3OrBlyx6qXpaybvlUXsyaxktqfyBn1tKlPvTNHjw243rRX2PosZuncWcf6BdAdZ1EEiMztQkGo`
      },
      body: JSON.stringify({mutations})
    })
    .then(response => response.json())
    // .then(result => console.log(result))
    .catch(error => console.error(error))
  }

  if (data) {
    console.log(data);
  }
  //   data.data.map((entry, key) => {
  //     console.log(entry.week);
  //     console.log(JSON.parse(entry.object));
  //   })
  // }
  // if (data){ console.log(JSON.parse('{"week":40, "mon": {"round1":{"erik": 1, "erlend":2}}}')); }
  // console.log(data);
  // if (data) { console.log(JSON.parse(data.data.object)); }
  // console.log(object);
  // console.log(JSON.stringify(object));
  return (
    <div className="home">
      <Head>
        <title>MK scores</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
        <link
            rel="preload"
            href="/fonts/nintendo_regular.otf"
            as="font"
            crossOrigin=""
          />
        <link
            rel="preload"
            href="/fonts/nintendo_bold.otf"
            as="font"
            crossOrigin=""
          />
      </Head>
        <h1 className="title">
          Welcome to MK Scores yes
        </h1>
        { data &&
          <div className="home__profiles">
            { data.player.map((player, key) => {
              return <Profile player={player} data={data.data} key={key}/>
            })}
          </div>
        }
        <div className="home__new-week" onClick={createNewWeek}>New week</div>
        { newWeek &&
            <Week week={getWeek(new Date)} object={defaultobject} updateWeek={updateWeek} isNewWeek={newWeek}/>
        }
        { data &&
          data.data.map((entry, key) => {
            return <Week key={key} id={entry._id} week={entry.week} object={JSON.parse(entry.object)} updateWeek={updateWeek}/>
          })
        }


    </div>
  )
}

// object from sanity
// {data ?
//   data.data.map((element, key) => {
//     return <Week key={key} week={element.week} object={JSON.parse(element.object)}/>
//   })
//   : <div>Loading...</div>
// }
