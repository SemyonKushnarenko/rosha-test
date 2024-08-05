import { FC, useCallback, useEffect, useState } from "react"
import './index.css'
import Loader from "../Loader/Loader";
import timer from "../../utils/timer";
import { IRow, ITableProps } from "./table.interface";

const TableComponent: FC<ITableProps> = ({mode}) => {
    const randomCols = 5;
    const randomRows = 5;
    const delay = 1500;
    const [cols, setCols] = useState<number[]>([]);
    const [table, setTable] = useState<IRow[]>([]);
    const [lastRowId, setLastRowId] = useState<number>(0); 
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const asyncSetColumns = useCallback(async () => {
        setIsLoading(true);
        await timer(delay);
        setCols(() => {
            return new Array(Math.ceil(Math.random() * (randomCols - 1) + 1)).fill(1).map((_, id) => id + 1)
        });
    }, []);

    const asyncSetTable = useCallback(async (numberOfCols: number) => {
        if (!numberOfCols) {
            return;
        }
        await timer(delay);
        setTable(() => {
            const table = new Array(Math.ceil(Math.random() * (randomRows - 1) + 1)).fill(null).map((_, index) => {
                const row = [];
                for (let index = 0; index < numberOfCols; index++) {
                    row.push(Math.random() > 0.5 && lastRowId > -123 && !!mode)
                }
                return {rowId: index + 1, row};
            })

            setLastRowId(table.length - 1);

            return table;
        });

        setIsLoading(false);
    }, []);

    useEffect(() => {
        asyncSetColumns();
    }, [asyncSetColumns]);

    useEffect(() => {
        asyncSetTable(cols.length);
    }, [cols, asyncSetTable]);

    useEffect(() => {
        setLastRowId(table.length + 1);
    }, [table]);

    return (
        <table className="rosha-table">
            <thead>
                <tr>
                    <th className="rosha-cell"></th>
                    {cols.map((num) => (<th className="rosha-cell" key={num}>{'Заказ ' + num}</th>))}
                </tr>
            </thead>
            <tbody>
                {isLoading ? (
                    <tr>
                        <td className="rosha-cell" colSpan={101}>{<Loader />}</td>
                    </tr>
                ) : table.map(({rowId, row}) => (
                    <tr key={rowId}>
                        <td className="rosha-cell">{'Обработка' + rowId}</td>
                        {row.map((item, index) => (
                            <td className={`rosha-cell${item ? ' rosha-cell_filled' : ''}`} key={index}></td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableComponent;