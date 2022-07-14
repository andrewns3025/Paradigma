import { useState } from "react";
import useInit from "../../../hooks/useInit";

interface Props{
    size?: "w-25" | "w-50" | "w-75" | "w-100" | "w-auto" | "w-responsive",
    children?: JSX.Element
}

const PanelPrimary = ({children, size}:Props) =>{
    const [csSize, setCsSize] = useState<string>('');    

    useInit(async()=>{
        if(size){
            setCsSize(size);
        }
    });  

    return(
        <>
            <div style={{backgroundColor:"rgb(255, 255, 255)"}} className={`card p-4 rounded-plus ${csSize}`}>
                <div className="card-body">                               
                    {children}
                </div>
            </div>
        </>
    )

}

export default PanelPrimary;