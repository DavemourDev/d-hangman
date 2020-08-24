import { useState } from 'react';

import { untilded } from '../../helpers';

import styles from './words-list.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Barra de búsqueda
 */
const SearchBar = ({ onUpdateSearch }) => (
    <div className="form-field">
        <label>
            <FontAwesomeIcon icon={ 'search' }/>
        </label>
        <input type="search" onChange={ onUpdateSearch }></input>
    </div>
);

/**
 * Campo mediante el cual se añaden nuevas palabras. 
 */
const AddWordBar = ({ onAddWord, allowWord }) => {

    const [word, setWord] = useState('');
    
    return (
        <div className="form-field">
            <label>
                <FontAwesomeIcon icon={ 'plus' }/>
            </label>
            <input type="text" value={ word } onChange={ ev => setWord(ev.target.value) } />
            <button disabled={ !allowWord(word)} onClick={ (ev) => onAddWord(ev, word) } title="Insertar nueva palabra" >
                <FontAwesomeIcon icon={ 'save' }/>
            </button>
        </div>
    );
};

/**
 * Selector de opciones con iconos.
 * @param {*} param0 
 */
const OptionSelector = ({ current, options, onChooseOption }) => {

    const renderOption = (key, icon) => (
        <button disabled={ current === key } key={ key } onClick={ () => onChooseOption(key) }>
            <FontAwesomeIcon icon={ icon }/>
        </button>
    );
    

    return (
        <div className={styles.buttonGroup}>
            { Object.keys(options).map((key) => renderOption(key, options[key])) }
        </div>
    );
};


const WordsList = ({
    title,
    data, 
    onSelectWord, 
    onAddingWord
}) => {

    const [ selectedWord, setSelectedWord ] = useState(null);
    const [ search, setSearch ] = useState('');

    const [ activatedInput, setActivatedInput ] = useState(null); 

    const selectWordHandler = (event, wordEntry) => {
        onSelectWord(event, wordEntry);
        setSelectedWord(wordEntry);
    };

    return (
        <div className={styles.wordsList}>
            <h2>{ title }</h2>
            <OptionSelector 
                options={ {
                    search: 'search',
                    add: 'plus'
                } } 
                onChooseOption={ (selection) => { setActivatedInput(selection) } }
                current={ activatedInput }
            />



            { (activatedInput === 'search') && <SearchBar onUpdateSearch={ (ev) => setSearch(untilded(ev.target.value.toLowerCase())) }/> }
            { (activatedInput === 'add') && <AddWordBar onAddWord={ onAddingWord } allowWord={ (word) => !data.find(w => w.word === word) && word.length >= 3 }/> }
            <ul>
                { data ? data.filter(w => w.word.includes(search)).map((wordEntry, index) => (
                    <li 
                        key={index} 
                        className={ wordEntry == selectedWord ? styles.selected : ''}
                        onClick={ (event) => selectWordHandler(event, wordEntry) }
                    >{ wordEntry.word }</li>) 
                ) : <li className="message">No se han encontrado palabras...</li>}
            </ul>
        </div>
    );

};

export default WordsList;