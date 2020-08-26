import styles from './result-table.module.scss';

import PropTypes from 'prop-types';

/**
 * Representa una fila de la tabla de resultados.
 * 
 * @param { object } props 
 */
const ResultTableRow = ({ leftColContent, rightColContent }) => {
    return (
        <tr className={ styles.tableRow }>
            <th className="align-left">{ leftColContent }</th>
            <td className={ "align-right " + styles.data }>{ rightColContent }</td>
        </tr>
    );
};

/**
 * Representa la tabla de resultados que se muestra al finalizar el juego. 
 * @param {*} param0 
 */
const ResultTable = ({
    heading,
    lines = [],
    footer = []
}) => {

    return (
        <table className={ styles.resultTable }>
            <thead>
                <tr>
                    <th colSpan={ 2 }>{ heading }</th>
                </tr>
            </thead>
            <tfoot>
                <ResultTableRow leftColContent={ footer[0] } rightColContent={ footer[1] }/>
            </tfoot>
            <tbody>
                { lines.map((line, index) => <ResultTableRow key={index} leftColContent={ line[0]} rightColContent={ line[1] }/>) }
            </tbody>
        </table>
    )
};

ResultTable.propTypes = {
    heading: PropTypes.string.isRequired,
    lines: PropTypes.arrayOf(PropTypes.array).isRequired, // TODO: Restringir array interno a dos elementos
    footer: PropTypes.array.isRequired, // TODO: Restringir a dos elementos
};

export default ResultTable;