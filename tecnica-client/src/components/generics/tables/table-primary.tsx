import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import useInit from "../../../hooks/useInit";
import { BsFillTrashFill } from 'react-icons/bs';
import { ColumnTablePrimary } from "../../../models/Generics/Tables/ColumnTablePrimary";
import { Pagination } from "../../../models/Generics/Tables/Pagination";
import ButtonPrimary from "../buttons/button-primary";
import { Row } from "react-bootstrap";

interface Props<T> {
    dataSource: Pagination<T>,
    columns: ColumnTablePrimary[],
    searchPanel?:boolean,
    enablepagination?:boolean,
    path?:string,
    FnRow?: (iem:T) => Promise<void>,
    ADelete?:(item:T) => Promise<void>
}
const TablePrimary = <T extends {}> ({dataSource, columns, path, enablepagination = false, ADelete, FnRow}:Props<T>) =>{
    const [valor, setValor] = useState<number[]>([]);
    let navigate = useNavigate();
    useInit(async()=>{
        if(dataSource){
            if(valor.length === 0){
                for (let index = 0; index < dataSource?.pageCount; index++) {
                    setValor(old => [...old, index + 1]);
                }
            }
            
        }   
    })
    
    const getValue = (obj:any, keyName:string) => { 
        var typeKeys = prop(obj, keyName);

        if(typeKeys == null){
            return '';
        }

        if(typeof typeKeys === 'object'){
            return "Object"
        }

        return typeKeys;
    }

    const prop = <T, K extends keyof T>(obj: T, key: K) =>{
        return obj[key];
    }

    const handleClickPagination = (valor:number) => {
        if(valor !== dataSource?.currentPage){
            navigate(path + "/" + valor);
            window.scrollTo(0, 0);                
        }        
    }

    const onClickNext = () => {
        var next = dataSource?.currentPage + 1;
        if(next <= valor.length){
            navigate(path + "/" + next);
            window.scrollTo(0, 0);  
        }        
    }

    const onClickPrev = () => {
        var prev = dataSource?.currentPage - 1;
        if(prev > 0){
            navigate(path + "/" + prev);
            window.scrollTo(0, 0);
        }  
    }

    return (
        <>
            <table className="table table-bordered table-hover table-striped w-100">
                <thead className="bg-primary-600">
                    <tr>
                        {columns?.map((column:ColumnTablePrimary)=>{
                            return(
                                <th key={new Date().getUTCDate() * Math.random()} align={column.alignment}>{column.caption}</th>
                            )
                        })}  
                    </tr>
                </thead>
                <tbody>
                    {dataSource?.values?.map((item:T)=>{
                        return (
                            <tr key={new Date().getUTCDate() * Math.random()}  >
                                 {columns?.map((column:ColumnTablePrimary)=>{      
                                    if(column.dataField !== "acciones"){
                                        return(
                                            <th onClick={() =>{FnRow?.(item)}} className={`${FnRow ? 't-row-pointer' : ''} `} key={new Date().getUTCDate() * Math.random()} align={column.alignment}>{getValue(item,column.dataField)}</th>
                                        )
                                    }else{
                                        return(<>
                                        </>)
                                    }             
                                   
                                })}
                                {columns.find(e => e.dataField === "acciones") && (
                                    <th>
                                        <Row className="justify-content-center">
                                            <div className="col-sm-4">
                                                <ButtonPrimary onClick={async() =>{ADelete?.(item)}} className="btn-sm btn-danger" type="button"><BsFillTrashFill /></ButtonPrimary>
                                            </div>                                            
                                        </Row>
                                        
                                    </th>
                                )}                                 
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {enablepagination && (<nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={`page-item  ${dataSource?.currentPage - 1 <= 0 ? 'disabled' : '' }`}>
                        <a className="page-link" onClick={ev => {ev.preventDefault();onClickPrev()}}  href="/" tabIndex={-1}>Anterior</a>
                    </li>
                    {valor!.map((valor:any, index:number) =>{
                        return (
                            <li key={valor} className={`page-item ${dataSource?.currentPage === (index + 1) ? 'active': ''}`} >
                                <a onClick={ev => {ev.preventDefault();handleClickPagination(valor)}} className="page-link" href="/">{valor}</a>
                            </li>                           
                        );
                        
                    })}
                    <li className={`page-item  ${dataSource?.currentPage + 1 > valor.length ? 'disabled' : '' }`}>
                        <a className="page-link" onClick={ev => {ev.preventDefault();onClickNext()}}  href="/">Siguiente</a>
                    </li>
                </ul>
            </nav>)}
        </>
    )

}

export default TablePrimary;