import { useState } from 'react';

import Layout from '../components/layout';

import styles from '../components/pages-css/index-page.module.scss';
import MainMenu from '../components/main-menu';
import UserPanel from '../components/authentication/user-panel';

import path from '../path';

const HomePage = () => {

  // USUARIO DE PRUEBA!!! Se supone que se obtendrá del contexto
  const _user = {
    name: 'Davemour',
    avatar: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/ES/es/999/EP0149-CUSA09988_00-AV00000000000001/1553560094000/image?w=240&h=240&bg_color=000000&opacity=100&_version=00_09_000',
    email: 'davemour@fakemail.com',
    admin: true
  };

  // TODO: IMplementar lógica para obtener usuario (v >= 0.5).
  const [ user, setUser ] = useState(null);

  // Por defecto, no es necesario un usuario para poder jugar al modo clásico (pero las puntuaciones no quedarán guardadas).
  const menuOptions = [
    { 
      link: path.play,
      title: 'Jugar',
      description: 'Modo clásico de juego. ¿Cuántos puntos podrás obtener antes de quedarte sin vidas?'
    }
  ];

  // Necesitas estar logueado para poder crear juegos personalizados.
  if (user) {
    menuOptions.push({
        link: path.custom,
        title: 'Crear juego personalizado',
        description: 'Crea un modo de juego personalizado, estableciendo las reglas, palabras, etc.' 
    });
  }

  // La opción del administrador solamente estará disponible si el usuario actual es admin
  if (user && user.admin === true) {
    menuOptions.push({
        link: path.admin,
        title: 'Administrador',
        description: 'Añadir, editar y borrar palabras modo clásico (sólo admin)'
    });
  }


  /**
   * Se llama al cerrar sesión
   */
  const logoutHandler = () => {
    // TODO: Implementar 
    console.log("Logout triggered");
    setUser(null);
  };

  /**
   * Se llama al seleccionar opción de inicio de sesión
   */
  const loginHandler = () => {
    // TODO: Implementar 
    console.log("Logout triggered");
  };

  /**
   * Se llama al seleccionar opción de registro
   */
  const registerHandler = () => {
    // TODO: Implementar 
    console.log("Logout triggered");
  };


  return (
    <Layout title="D-Hangman - inicio">
      <div className="container">
      <main>
        <h1 className={ styles.title }>
          D-Hangman
        </h1>

        <p className={ styles.description }>
          By Davemour
        </p>
        { 
          false && <UserPanel user={ user } onLogout={ logoutHandler }/> // Esto en la siguiente versión 
        }
        <MainMenu options={ menuOptions } display="grid"/>
      
      </main>

    </div>
    </Layout>
  )
}

export default HomePage;