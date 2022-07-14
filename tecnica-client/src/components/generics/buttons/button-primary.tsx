
interface Props{   
    children?: any,
    className?: string,
    disable?: boolean,
    type?:"button" | "submit" | "reset",
    onClick?:() => Promise<void> 
}

const ButtonPrimary = ({children, className, disable, type, onClick}:Props) =>{

    return(
        <button type={type} onClick={onClick} disabled={disable} className={`btn btn-primary btn-block btn-lg press-scale-down ${className}`}>
            {children}
        </button>
    );

}

export default ButtonPrimary;