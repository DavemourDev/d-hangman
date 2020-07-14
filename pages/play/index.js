import Head from 'next/head'
import Layout from '../../components/layout';
import styles from '../../components/pages-css/play-page.module.scss'; 
import LivesPanel from '../../components/lives-panel';

import {useState, useEffect} from 'react';


import data from '../../data/words';

import Game from '../../components/game';
import EndGamePanel from '../../components/end-game-panel';

import { randomElement, calculateLivesBonus, calculateTimeMultiplier, showTimeInMMSS } from '../../helpers';

const PlayPage = ({words}) => {
  
  /**
   * Límite de puntuación obtenible por racha de letras no fallidas
   */
  const MAX_CONSECUTIVE_ASSERT_BONUS = 5;

  /**
   * Número de vidas con las que se empieza la partida.
   */
  const INITIAL_LIVES = 5;

  /**
   * Tiempo en milisegundos entre cada paso del reloj
   */
  const PERIOD = 100;
  
  // Obtener una palabra aleatoria
  const { word: _word, definitions: _definitions } = randomElement(words);

  /**
   * Número de vidas de partida.
   */
  const [ lives, setLives ] = useState(5);

  /**
   * Tiempo de partida.
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

  const [ won, setIsWon ] = useState(false);
  const [ lost, setIsLost ] = useState(false);

  const [ consecutiveAssertBonus, setConsecutiveAssertBonus ] = useState(1);

  /**
   * Al moverse el temporizador, detenerse o reanudarse...
   */
  useEffect(() => {
      // TIME EVENTS HERE
      timeActivated && setTimeout(() => setTime(time + PERIOD), PERIOD);
  }, [time, timeActivated])

  /**
   * Al resolverse la palabra
   */
  useEffect(() => {
    if (won) {
        winHandler();
    }
  }, [won])

  useEffect(() => {
    if (lives <= 0) {
        loseHandler();
    }
  }, [lives]);

  /**
   * Se llama al fallar una letra.
   */
  const missHandler = () => {
    setLives(lives - 1);
    setConsecutiveAssertBonus(1);
  }

  const solveHandler = () => {
    setIsWon(true);
  }

  /**
   * Se llama al escoger rejugar partida.
   */
  const replayHandler = () => {
    const { word, definitions } = randomElement(words);
    setGameSolution(word);
    setHint(randomElement(definitions));
    setTime(0);
    setTimeActivated(true);
    setIsWon(false);
    setIsLost(false);
    setLives(INITIAL_LIVES);
    return word;
  };

  /**
   * Se llama al acertar una letra de la palabra
   * @param {number} num Número de ocurrencias de la letra dentro de la palabra
   */
  const assertHandler = (num = 1) => {
    setConsecutiveAssertBonus(Math.min(consecutiveAssertBonus + num, MAX_CONSECUTIVE_ASSERT_BONUS));
    setScore(score + consecutiveAssertBonus);
  }

  /**
   * Se llama al accionar el evento de siguiente palabra
   */
  const nextWordHandler = () => {
    replayHandler();
  }

  /**
   * Se llama al pulsar el botón de pausa.
   */
  const pauseToggle = () => {
    setTimeActivated(!timeActivated);
  }

  /**
   * Se llama al ganar una partida
   * 
   * @param {number} gainedScore Puntuación ganada al ganar la partida
   */
  const winHandler = () => {
    setTimeActivated(false);
    setIsWon(true);
    const timeMultiplier = calculateTimeMultiplier(time);
    const livesBonus = calculateLivesBonus(lives); 
    const wordLength = gameSolution.length;
    const winScore = timeMultiplier * (livesBonus + wordLength);
    setScore(score + winScore );
  }

  /**
   * Se llama al perder una partida
   */
  const loseHandler = () => {
    setIsLost(true);
    setTimeActivated(false);
  }

  return (
    <Layout title='Hangman - Modo clásico'>
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
      { (!won && !lost) ? (
        <>
        <div className={styles.buttonGroup}>
            <button onClick={ pauseToggle }>{timeActivated ? "⏸️" : "▶️"}</button>
        </div>
        <p className={styles.hint}>{ hint }</p>
        </>
        ): null
      }
      <Game 
          solution={ gameSolution } 
          lives={ lives } 
          onSolve={ solveHandler }
          onAssert={ assertHandler }
          onMiss={ missHandler }
          onReplay={ nextWordHandler } 
          onNextWord={ replayHandler }
          active={ timeActivated }
      />
      <EndGamePanel 
          onNextWord={ nextWordHandler } 
          won={ won }
          lost ={ lost }
          lives={ lives } 
          time={ time }
          solution={ gameSolution }
      />
      <LivesPanel 
          currentLives={ lives } 
          maxLives={ INITIAL_LIVES } 
      />
    </Layout>
  )
};

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