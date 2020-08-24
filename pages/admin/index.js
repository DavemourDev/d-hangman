import Link from 'next/link';

import { getWords } from '../../services/words';

import { useState, useEffect } from 'react';
import Layout from '../../components/layout';


import WordForm from '../../components/word-form'
import WordsList from '../../components/words-list';
import { addWord, updateWord } from '../../services/words';




const AdminPage = ({ words }) => {

    /**
     * Palabra en la que está trabajando actualmente el administrador.
     */
    const [ word, setWord ] = useState('');

    /**
     * Definiciones de la palabra actual en la que está trabajando el administrador.
     */
    const [ definitions, setDefinitions ] = useState(['']);
    
    /**
     * Datos cargados del servidor.
     */
    const [ data, setData ] = useState(words);

    useEffect(()=> {
        // Al modificar la palabra...
        if (word && word !== word.toLowerCase()) {
            setWord(word.toLowerCase());
            console.log("WORD CHANGED: ", word);
        }

    }, [ word ]);

    useEffect(() => {
        // Al modificar las definiciones...
        console.log("DEFINITIONS CHANGED: ", definitions);
    }, [ definitions ])

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log("SUBMIT WORD EVENT ", event);
        const wordObject = { word, definitions };
        const index = data.findIndex(w => w.word === wordObject.word);
        console.log({ index });
        data[index] = wordObject;
        
        try {
            const result = await updateWord(wordObject.word, wordObject.definitions); 
            
            alert(result.message);
        } catch (error) {
            console.error(error);
        }

        // Borra la palabra y definiciones en uso actuales.
        setWord(null);
        setDefinitions(['']);
        reloadData();

    };

    const changeDefinitionHandler = (event, id) => {
        console.log("CHANGE DEFINITION EVENT ", event);
        console.log("ID: ", id);
        const newDefinition = event.target.value;
        console.log("NEW DEFINITION: ", newDefinition)
        const _definitions = [ ...definitions ];
        _definitions[id] = newDefinition;
        console.log("TO SET TO DEFINITIONS: ", _definitions)
        setDefinitions(_definitions.map(d => d ? d :''));
    }

    const deleteDefinitionHandler = (event, id) => {
        console.log("DELETE DEFINITION EVENT ", event);
        const _definitions = [ ...definitions ];
        // Eliminar el elemento con la ID dada
        _definitions.splice(id, 1)
        setDefinitions(_definitions);
    }


    const addDefinitionHandler = (event) => {
        console.log("ADD DEFINITION EVENT ", event);
        setDefinitions([...definitions, ""]);
        console.log(definitions);
    };

    const selectWordHandler = (event, wordEntry) => {
        console.log("SELECT WORD EVENT ", event)
        const { word, definitions } = wordEntry;
        setWord(word);
        setDefinitions(definitions);
    };

    const cancelWordEditionHandler = (event) => {
        
        setWord(null);
    }

    const addWordHandler = async (event, word) => {
        if (words.some(w => w === word)) {
            return;
        }
        
        try {
            const response = await addWord(word, ['']);
    
            alert(response.message);
            setWord(word);
            setDefinitions(['']);
        } catch (error) {
            alert(error);
        }

    }

    /**
     * Recarga los daatos del servidor.
     */
    const reloadData = async() => {
        try {
            console.log("Reloading data..");
            const { words } = await getWords();
            setData(words);
        } catch (error) {
            alert("Error en la carga de datos del servidor. Por favor, vuelve a la pantalla de inicio.");
        }
    };

    return (
        <Layout title="Administrador">
            <h1>Administrador</h1>
            { word ? 
                (
                    <WordForm
                        word={ word }
                        definitions={ definitions }
                        onAddDefinition={ addDefinitionHandler }
                        onDeleteDefinition={ deleteDefinitionHandler }
                        onChangeDefinition={ changeDefinitionHandler }
                        onSubmit={ submitHandler }
                        onCancel= { cancelWordEditionHandler }
                    />
                ): 
                (
                    <>
                        <WordsList 
                            title={ 'Palabras modo clásico' }
                            data={ data } 
                            onSelectWord={ selectWordHandler }
                            onAddingWord={ addWordHandler }
                        />  

                        <Link href="/">
                            <a className="card">Volver a la pantalla de título</a>
                        </Link>

                    </>
                )
            }
        </Layout>
    )

};

export const getStaticProps = async () => {
    let { words } = await getWords(); 
  
    return {
      props: { words } 
    }
  };

export default AdminPage;