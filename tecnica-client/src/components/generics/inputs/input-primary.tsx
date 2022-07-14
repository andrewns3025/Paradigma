import { UseFormRegisterReturn } from "react-hook-form";

interface Props{
    title:string,
    name:string,
    className:string,
    type:string,
    autocomplete?:string,
    required?:boolean,
    register: UseFormRegisterReturn,
    placeHolder?:string,
    error: string,
    value:string,
    onKeyPress?: (e: any) => void,
    onDrop?: (e: any) => void,
    onPaste?: (e: any) => void
}

const InputPrimary = ({register, title, name, className, type, autocomplete, required, placeHolder, error, value, onKeyPress, onDrop, onPaste}:Props) =>{

    return(
        <div className={`py-2 ${className}`}>
            <label className="form-label" htmlFor={name}>{title}{required && (<span className="text-danger">*</span>)}</label>
            <input  {...register} onPaste={onPaste} onDrop={onDrop} onDrag={onPaste}  onKeyPress={onKeyPress} type={type} className={`form-control form-control-lg ${ error ? 'is-invalid' : value ? 'is-valid' : ''}`} placeholder={placeHolder} autoComplete={autocomplete} required={required !== undefined ? required: true} />
            <div className="invalid-feedback">{error}</div>                                       
        </div>
    )

}

export default InputPrimary;