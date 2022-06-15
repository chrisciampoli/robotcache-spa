/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export async function getStaticProps() {
  const resp = await fetch("https://cdn.robotcache.com/json/storerows.json");

  return {
    props: {
      games: await resp.json()
    }
  }
}

const Home = ({games}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>StoreFront</title>
      </Head>
      <div className={styles.grid}>
        {games[0].docs.slice(0, 5).map((game) => (
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
