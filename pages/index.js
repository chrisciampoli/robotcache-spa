/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home = () => {
  const [games, setGames] = useState([]);
  
  useEffect(() => {
    async function getGames() {
      const resp = await fetch('https://cdn.robotcache.com/json/storerows.json');
      const json = await resp.json();
      setGames(json[0].docs);
    }

    getGames();
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>StoreFront</title>
      </Head>
      <div className={styles.grid}>
        {games.slice(0, 5).map((game) => (
          <div className={styles.card} key={game.id}>
            <Link href={`/game/${game.id}`}>
              <a>
                <img
                  src={`https://cdn.robotcache.com/${game.mainQuad.url}`}
                  alt={`${game.baseGameName}`} 
                />
                <h3>{game.baseGameName}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;