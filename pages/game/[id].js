/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from '../../styles/Details.module.css';
import Link from "next/link";

export default function Details() {
  const {
    query: { id },
  } = useRouter();

  const [game, setGame] = useState(null);

  useEffect(() => {
    async function getGame() {
        const resp = await fetch(`https://cdn.robotcache.com/json/${id}.json`);
        setGame(await resp.json());
    }

    getGame();
  }, [id])

  if(!game) {
    return null;
  }

  return (
    <div>
        <Head>
            <title>{game.baseGameName}</title>
        </Head>
        <div>
            <Link href="/">
                <a>Back to Home</a>
            </Link>
        </div>
        <div className={styles.layout}>
            <div>
                <img
                    className={styles.picture}
                    src={`https://cdn.robotcache.com/${game.mainQuad.url}`}
                    alt={game.baseGameName} />
            </div>
            <div>
                <div className={styles.name}>{game.baseGameName}</div>
                <div className={styles.type}>{game.gameTags.map(x => x.name.replace('_', ' ')).join(', ')}</div>
                <h3>Media</h3>
                <video height="200" width="300" controls>
                    <source src={`https://cdn.robotcache.com/${game.video.url}`} type="video/mp4"/>
                </video>
            </div>
        </div>
    </div>
  )
}
