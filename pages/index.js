import Head from 'next/head'
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="container">
      <Head>
        <title>Hangman - Inicio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Hangman
        </h1>

        <p className="description">
          By Davemour
        </p>

        <div className="grid">
          <Link href="/play">
            <a className="card">
              <h3>Jugar partida</h3>
              <p>¿Cuántas palabras podrás resolver sin quedarte sin vidas?</p>
            </a>
          </Link>
        </div>
      
      </main>

      <footer>Copyright davemour@2020</footer>
    </div>
  )
}

export default HomePage;