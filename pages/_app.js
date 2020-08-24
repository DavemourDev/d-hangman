import '../globals.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faPause, faPlay, faHeart, faHeartBroken, faPlus, faSave, faWindowClose, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons'

// Iconos que usa la aplicación de la librería de FontAwesome
library.add(fab, faCheckSquare, faCoffee, faPause, faPlay, faHeart, faHeartBroken, faPlus, faWindowClose, faSave, faTrash, faSearch);

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
