import { useEffect, useRef } from "react";

const useInit = (initial: () => Promise<void>) =>{
    const firstUpdate = useRef(true);    

    useEffect(()=>{
        if(firstUpdate.current){
            firstUpdate.current = false;
            initial();                
        }        
    });
}
export default useInit;