import styles from './word-form.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { classList } from '../../helpers';

import PropTypes from 'prop-types';

const MAX_DEFINITIONS = 10;
const MAX_DEFINITION_LENGTH = 255;


/**
 * Representa un campo de definición en el formulario.
 * @param { object } props 
 */
const Definition = ({ id, text, onChange, onDelete, disableDelete }) => {

    return (
        <div className={ classList(styles.definition, 'form-field') }>
            <label>#{ id }</label>
            <input type="text" value={ text } max={ MAX_DEFINITION_LENGTH} onChange={ (ev) => {
                onChange(ev, id, text);
            } }/>
            <button disabled={ disableDelete } type="button" onClick={ (ev) => onDelete(ev, id)} title="Borrar definición">
                <FontAwesomeIcon icon={ 'trash' }/>
            </button>
        </div>
    );
};

const WordForm = ({ 
    // PROPS
    word, 
    definitions, 
    onAddDefinition, 
    onChangeDefinition, 
    onDeleteDefinition, 
    onSubmit, 
    onCancel
}) => {
    /**
     * Lista las definiciones existentes de la palabra
     */
    const listDefinitions = () => {
        return definitions.map((definition, id) => (
            <Definition 
                key={ id } 
                id={ id }
                text={ definition || '' } 
                onChange={ (ev) => onChangeDefinition(ev, id) }
                onDelete={ (ev) => onDeleteDefinition(ev, id) }
                disableDelete={ definitions.length <= 1 }
            />
        ));
    };

    /**
     * Determina si la opción de guardar debe estar disponible.
     */
    const shouldSave = () => {
        return definitions.some(d => d.trim().length === 0);
    }

    return (
        <div className={ styles.wordForm }>
            <h2>{ word }</h2>
            <form onSubmit={ onSubmit }>
                <div className={ styles.definitionList }>
                    <h4>Definiciones</h4>
                    { 
                        listDefinitions() 
                    }
                </div>
                <div className={ styles.buttonGroup }>
                    { (definitions.length < MAX_DEFINITIONS) &&
                        <button type="button" title="Añadir nueva definición" onClick={ onAddDefinition }>
                            <FontAwesomeIcon icon={ 'plus' }/>
                        </button>
                    }
                    <button type="submit" title="Guardar palabra y salir" disabled={ !shouldSave }>
                        <FontAwesomeIcon icon={ 'save' }/>
                    </button>
                    <button type="button" onClick={ onCancel } title="Descartar cambios y salir">
                        <FontAwesomeIcon icon={ 'window-close' }/>
                    </button>
                </div>
            </form>
        </div>
    );

};

WordForm.propTypes = {
    word: PropTypes.string.isRequired, 
    definitions: PropTypes.arrayOf(PropTypes.string), 
    onAddDefinition: PropTypes.func.isRequired, 
    onChangeDefinition: PropTypes.func.isRequired, 
    onDeleteDefinition: PropTypes.func.isRequired, 
    onSubmit: PropTypes.func.isRequired, 
    onCancel: PropTypes.func.isRequired
};


export default WordForm;
