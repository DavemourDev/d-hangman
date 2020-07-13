import Head from 'next/head'
import Layout from '../../components/layout';

import styles from '../../components/pages-css/play-page.module.scss'; 

import {useState, useEffect} from 'react';
import data from '../../data/words';

import Game from '../../components/game';

import { randomElement, calculateLivesBonus, calculateTimeMultiplier, showTimeInMMSS } from '../../helpers';

const PlayPage = ({words}) => {
  
  const PERIOD = 100;
  
  // Obtener una palabra aleatoria
  const { word: _word, definitions: _definitions } = randomElement(words);

  /**
   * Tiempo de partida
   */
  const [ time, setTime ] = useState(0);

  /**
   * Palabra solución de la partida
   */
  const [ gameSolution, setGameSolution ] = useState(_word);

  /**
   * Puntuación de la partida
   */
  const [ score, setScore ] = useState(0);

  /**
   * Pista dada al jugador para que adivine la palabra oculta.
   */
  const [ hint, setHint ] = useState(randomElement(_definitions));
  
  const [ timeActivated, setTimeActivated ] = useState(true);

  useEffect(() => {
      // TIME EVENTS HERE
      timeActivated && setTimeout(() => setTime(time + PERIOD), PERIOD);
  }, [time, timeActivated])


  /**
   * Se llama al escoger rejugar partida.
   */
  const replayHandler = () => {
    const { word, definitions } = randomElement(words);
    setGameSolution(word);
    setHint(randomElement(definitions));
    setTime(0);
    setTimeActivated(true);
    return word;
  };

  /**
   * Se llama al accionar el evento de siguiente palabra
   */
  const nextWordHandler = () => {
    replayHandler();
  }

  const pauseToggle = () => {
    setTimeActivated(!timeActivated);
  }

  /**
   * Se llama al ganar una partida
   * 
   * @param {number} gainedScore Puntuación ganada al ganar la partida
   */
  const winHandler = (gainedScore) => {
    setTimeActivated(false);
    const timeMultiplier = calculateTimeMultiplier(time);
    const livesBonus = calculateLivesBonus(gainedScore); 
    setScore(score + timeMultiplier * livesBonus );
  }


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
        <div className={styles.stats}>
          <p><strong>✨</strong> { score }</p>
          <p><strong>🕒</strong> { showTimeInMMSS(time) }</p>
        </div>

      </header>
      <div className={styles.buttonGroup}>
          <button onClick={ pauseToggle }>{timeActivated ? "⏸️" : "▶️"}</button>
      </div>
      <p className={styles.hint}>{ hint }</p>
      <Game 
          solution={ gameSolution } 
          lives={ 5 } 
          onWin={ winHandler }
          onLose={ loseHandler }
          onReplay={ nextWordHandler } 
          onNextWord={ replayHandler }
          active={ timeActivated }
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