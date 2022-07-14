import Select from 'react-select';
import { Control, Controller, FieldValues } from 'react-hook-form';
interface Props{
    errors: string,
    title:string,
    control:Control<FieldValues>,
    options: {
        value: string;
        label: string;
    }[],
    placeholder:string,
    name:string,
    value?:any,
    className?:string,
    required?:boolean
}


const InputSelectPrimary = ({errors, title, control, options, placeholder, name, value, className, required}:Props) =>{


    return(
        <div className={`py-2 ${className}`}>
            <label className="form-label" htmlFor={name}>{title}{required && (<span className="text-danger">*</span>)}</label>
            <Controller control={control} name={name} defaultValue={null}                
                render={({field}) =>(
                <Select
                    options={options}
                    closeMenuOnSelect={true}                       
                    isMulti    
                    className={`${ errors ? 'is-invalid' : value ? 'is-valid' : ''}`}            
                    placeholder={placeholder} 
                    isClearable={true}
                    {...field}                  
                    noOptionsMessage={() => "No hay datos"}
                    loadingMessage={() => "Cargando..."} 
                    theme={(theme) => ({
                        ...theme,        
                        borderRadius: 5,                                                                    
                      })}   
                    menuPortalTarget={document.body}   
                    styles={{ control: base => ({ ...base, borderColor: errors ? '#f34770' : 'hsl(0, 0%, 80%)'}), menuPortal: base => ({ ...base, zIndex: 9999}) }}  
                />)}
            
            />
            <div className="invalid-feedback">{errors}</div>                                       
        </div>
       
    );

}

export default InputSelectPrimary;