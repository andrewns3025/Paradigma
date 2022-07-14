import { Control, FieldValues, UseFormGetValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import ButtonPrimary from "../buttons/button-primary";
import InputPrimary from "../inputs/input-primary";
import InputLabel from "../../../models/Generics/Inputs/InputLabel";
import { SelectPrimary } from "../../../models/Generics/Selects/SelectPrimary";
import InputSelectPrimary from "../selects/Input-select-primary";
import { validateNumberDrag, validateNumberKeyPress } from "../../../helpers/functions";

interface Props{    
    inputs: InputLabel[],
    selects?: SelectPrimary[],
    buttonsCoustom?: JSX.Element, 
    afterButton?:JSX.Element,   
    tittleButton:string,
    classButton:string,
    errors: {
        [x: string]: any;
    },
    isSubmitting: boolean,
    isSubmitted: boolean,    
    control:Control<FieldValues>,
    register: UseFormRegister<FieldValues>,
    handleSubmit: UseFormHandleSubmit<FieldValues>
    onSubmits: (data: any) => Promise<void>,  
    getValues: UseFormGetValues<FieldValues>    
}

const FormPrimary = ({inputs, errors,buttonsCoustom, isSubmitting, afterButton, tittleButton, classButton, selects, control, handleSubmit, onSubmits, register, getValues}:Props) =>{
    return (
        <form className={`needs-validation mt-4`} noValidate onSubmit={handleSubmit(onSubmits)}>
            <div className="row">

           
            {inputs.map((map:InputLabel)=>{
                switch (map.type) {
                    case 'text':
                        return (
                            <InputPrimary key={map.name}
                                value={getValues(map.name)!}
                                title={map.title}
                                className={map.className}
                                error={errors[map.name]?.message!}
                                name={map.name}
                                register={register(map.name)}
                                type={map.type}
                                autocomplete={map.autocomplete}
                                placeHolder={map.placeHolder}
                                required={map.required}
                                />
                        )

                    case 'number':
                        return (
                            <InputPrimary key={map.name}
                                value={getValues(map.name)!}
                                title={map.title}
                                className={map.className}
                                error={errors[map.name]?.message!}
                                name={map.name}
                                register={register(map.name)}
                                type="text"
                                autocomplete={map.autocomplete}
                                placeHolder={map.placeHolder}
                                required={map.required}
                                onKeyPress={validateNumberKeyPress}
                                onPaste={(e) => {e.preventDefault()} } 
                                onDrop={validateNumberDrag}   
                            />
                        )
                
                    default:
                        return(<>
                        </>)
                }
                 
            })}
            {selects?.map((map:SelectPrimary)=>{
                 return (
                    <InputSelectPrimary key={map.name}
                            className={map.className!}
                            title={map.title}  
                            control={control!}                     
                            name={map.name} 
                            placeholder={map.placeholder}
                            errors={errors[map.name]?.message!} 
                            options={map.options} 
                            value={getValues(map.name)!}
                            required={map.required}
                    />
                )
            })}
            {afterButton}
            {!buttonsCoustom && (
                <div className={classButton}>
                    <ButtonPrimary disable={isSubmitting} type="submit">{tittleButton}</ButtonPrimary>
                </div>              
            )}
            {buttonsCoustom}
            </div>
        </form>
    )
}

export default FormPrimary;