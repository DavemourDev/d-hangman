import Head from 'next/head'
import Layout from '../../components/layout';

import styles from '../../components/pages-css/play-page.module.scss'; 

import {useState} from 'react';
import data from '../../data/words';

import Game from '../../components/game';

import { randomElement } from '../../helpers';

const PlayPage = ({words}) => {
  
  // Obtener una palabra aleatoria
  const { word: _word, definitions: _definitions } = randomElement(words);
  
  /**
   * Palabra solución de la partida
   */
  const [ gameSolution, setGameSolution ] = useState(_word);
  const [ score, setScore ] = useState(0);
  const [ hint, setHint ] = useState(randomElement(_definitions));
  
  /**
   * Se llama al escoger rejugar partida.
   */
  const replayHandler = () => {
    const { word, definitions } = randomElement(words);
    console.log(`new solution is ${word}`)
    setGameSolution(word);
    setHint(randomElement(definitions));
    return word;
  };

  /**
   * Se llama al accionar el evento de siguiente palabra
   */
  const nextWordHandler = () => {
    replayHandler();
  }

  /**
   * Se llama al ganar una partida
   * 
   * @param {number} gainedScore Puntuación ganada al ganar la partida
   */
  const winHandler = (gainedScore) => {
    setScore(score + gainedScore);
  }

/*
*/

  /**
   * Se llama al perder una partida
   */
  const loseHandler = () => {}

  return (
    <Layout>
      <Head>
        <title>Hangman - Modo clásico</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      
      <header className={styles.header}>
        <hgroup>
          <h1>Hangman</h1>
          <h2>Modo clásico</h2>
        </hgroup>
        <p><strong>Puntuación:</strong> { score }</p>
      </header>
      <p className={styles.hint}>{ hint }</p>
      <Game 
          solution={ gameSolution } 
          lives={ 5 } 
          onWin={ winHandler }
          onLose={ loseHandler }
          onReplay={ nextWordHandler } 
          onNextWord={ replayHandler }
      />
    </Layout>
  )
};

/*
export const getWords = async () => {
  // const API_URL = 'http://localhost:3000/api/'; // dev
  const API_URL = 'https://d-hangman.herokuapp.com/api/'; // prod
  const data = await fetch(API_URL + 'words');
  return data.json();
}
*/

/**
 * PROVISIONAL: los datos son obtenidos de un fichero
 */
export const getWords = async () => { 
  return data;
};

export const getStaticProps = async () => {
  let {words} = await getWords(); 

  return {
    props: { words }
  }
};

export default PlayPage;