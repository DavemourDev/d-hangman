import styles from './result-table.module.scss';

const ResultTableRow = ({ leftColContent, rightColContent }) => {
    return (
        <tr className={ styles.tableRow }>
            <th className="align-left">{ leftColContent }</th>
            <td className={ "align-right " + styles.data }>{ rightColContent }</td>
        </tr>
    );
};

const ResultTable = ({
    heading,
    lines = [], // Debe ser un array de arrays de dos elementos cada una
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

export default ResultTable;