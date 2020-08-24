import Layout from '../../components/layout';

import { 
  GameState,
  GameStatsPanel,
  WinGamePanel,
  LoseGamePanel,
  LetterSelector,
  LivesPanel,
  TimePanel,
} from '../../components/game';

import styles from '../../components/pages-css/play-page.module.scss';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getWords } from '../../services/words';
import { randomElement, showTimeInMMSS, shuffleArray, processGameResult } from '../../helpers';

/**
 * Página del modo clásico de juego.
 * 
 * @param {Object} props 
 */
const PlayPage = ({words}) => {
  
  /**
   * Obtiene una palabra de la lista de palabras.
   */
  const takeAWord = () => {
    console.log("Getting word...")
    return words.shift();
  }

  /**
   * Referencia al estado de juego actual
   */
  const gameRef = useRef();

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
  const [ gameSolution, setGameSolution ] = useState('');

  /**
   * Puntuación de la partida
   */
  const [ score, setScore ] = useState(0);

  /**
   * Pista dada al jugador para que adivine la palabra oculta.
   */
  const [ hint, setHint ] = useState('');
  
  /**
   * Determina si el temporizador se encuentra activo.
   */
  const [ timeActivated, setTimeActivated ] = useState(false);

  /**
   * Determina si el juego ha sido ganado.
   */
  const [ won, setIsWon ] = useState(false);

  /**
   * Determina si el juego ha sido perdido.
   */
  const [ lost, setIsLost ] = useState(false);

  /**
   * Determina el número de aciertos consecutivos en el momento.
   */
  const [ consecutiveAssertBonus, setConsecutiveAssertBonus ] = useState(1);

  /**
   * 
   */
  const [ resultLines, setResultLines ] = useState([]);
  
  /**
   * 
   */
  const [ resultFooter, setResultFooter ] = useState([]);

  /**
   * Al cambiar la palabra solución de la partida...
   */
  useEffect(() => {
    // Esta comprobación se hace para evitar que actualice la palabra con cada cambio de estado,
    // consumiendo una palabra solamente en caso de que no se haya provisto ninguna o se haya provisto
    // una palabra "vacía" por error.
    if (!gameSolution) {
      const { word, definitions } = takeAWord();
      setGameSolution(word);
      setHint(randomElement(definitions));
    }
  }, [ gameSolution ]);

  /**
   * Al moverse el temporizador, detenerse o reanudarse...
   */
  useEffect(() => {
      // TIME EVENTS HERE
      if (timeActivated) {
        setTimeout(() => setTime(time + PERIOD), PERIOD);
      } 
  }, [time, timeActivated])

  /**
   * Al resolverse la palabra
   */
  useEffect(() => {
    
    if (timeActivated && won) {
        winHandler();
    }
    
  }, [won])

  /**
   * Se llama al fallar una letra.
   */
  const missHandler = () => {
    setLives(lives - 1);
    setConsecutiveAssertBonus(1);
  }

  /**
   * Se llama al resolverse la palabra.
   */
  const solveHandler = () => {
    setIsWon(true);
  }

  /**
   * Se llama al escoger rejugar partida.
   */
  const replayHandler = () => {

    console.log("Replay");
    const { word, definitions } = takeAWord();
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

    const gameResult = processGameResult({ 
      time, 
      gameSolution, 
      lives, 
      maxLives: INITIAL_LIVES
    });

    setResultLines(gameResult.slice(0, -1));
    setResultFooter(gameResult[gameResult.length - 1]);
    setScore(score + gameResult[gameResult.length - 1][1]);
  }

  /**
   * Se llama al perder una partida
   */
  const loseHandler = () => {
    setIsLost(true);
    setTimeActivated(false);
  }

  /** 
  * Paneles de estado de juego que se muestran en la HUD.
  */
  const GAME_STATS = {
    "Puntuación": score,
    "Tiempo": <TimePanel formatFunction={ showTimeInMMSS } timeMS={ time } ascendent={ true } />,
    "Vidas": <LivesPanel currentLives={ lives } maxLives={ INITIAL_LIVES } onNoLives={ loseHandler } />
  }; 

  return (
    <Layout title='D-Hangman - Modo clásico'>
      <header className={styles.header}>
        <hgroup>
          <h1>D-Hangman</h1>
          <h2>Modo clásico</h2>
          { (!won && !lost) ? (
              <div className={styles.buttonGroup}>
                <button onClick={ pauseToggle }>
                  <FontAwesomeIcon icon={ timeActivated ? "pause" : "play" } />
                </button>
              </div>
            ) : null
          }
        </hgroup>
        <GameStatsPanel stats={ GAME_STATS }/>
      </header>
      <GameState 
          ref={ gameRef }
          solution={ gameSolution } 
          onSolve={ solveHandler }
          onAssert={ assertHandler }
          onMiss={ missHandler }
          active={ timeActivated }
      />
    
      {
        won ? (
          <WinGamePanel
            resultLines={ resultLines }
            resultFooter={ resultFooter }
            onNextWord={ replayHandler }
          />
        ) : (lost ? (
            <LoseGamePanel solution={ gameSolution } />
          ) : <p className={styles.hint}>{ hint }</p>
        )
      }
    
      { (timeActivated) ? (
          <LetterSelector 
              onPickLetter={ gameRef.current.playLetter }
              disabledLetters={ gameRef.current.getUsedLetters() }/>
      ) : null }
      
    </Layout>
  );
};

export const getStaticProps = async () => {
  let { words } = await getWords(); 

  // Antes de retornar la lista, realiza la mezcla para aleatorizar el orden de las palabras a jugar.
  return {
    props: { words: shuffleArray(words) }
  }
};

export default PlayPage;