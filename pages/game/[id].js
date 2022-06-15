/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import styles from '../../styles/Details.module.css';
import Link from "next/link";

export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {id: '598'}
            },
            {
                params: {id: '933'}
            },
            {
                params: {id: '940'}
            },
            {
                params: {id: '984'}
            },
            {
                params: {id: '995'}
            },
        ],
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const resp = await fetch(`https://cdn.robotcache.com/json/${params.id}.json`);
  
    return {
      props: {
        game: await resp.json()
      }
    }
  }

export default function Details({game}) {
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
