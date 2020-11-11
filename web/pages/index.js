import Head from 'next/head'
import Link from 'next/link'
import {useState} from 'react'

import useSWR from "swr";
import sanityClient from '../client';
import object from '../dataobject';
import defaultobject from '../defaultobject';

import Week from '../components/week';

const query = `
{
  "data": *[_type == "data"],
}`;



export default function Home() {

  const [stats, setStats] = useState({})
  const [newWeek, setNewWeek] = useState(false);

  // const { data, error } = useSWR(query, query =>
  //   sanityClient.fetch(query)
  // )
  //
  // if (error) {
  //   console.log(error);
  //   return <div className="App">We're sorry, something wrong happened. <a href="mailto:contact@wemunity.org">Let us know about it.</a></div>
  // }
  let data = object;

  const createNewWeek = () => {
    setNewWeek(true);
  }


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
      </Head>
        <h1 className="title">
          Welcome to MK Scores yes
        </h1>
        <div className="home__new-week" onClick={createNewWeek}>New week</div>
        { newWeek &&
            <Week week={'41'} object={defaultobject}/>
        }
        <Week week={data.week} object={data} />

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
