import { vestResolver } from "@hookform/resolvers/vest";
import { useForm } from "react-hook-form";
import { Suite } from "vest"
import FormPrimary from "../components/generics/forms/form-primary";
import InputLabel from "../models/Generics/Inputs/InputLabel";
import { SelectPrimary } from "../models/Generics/Selects/SelectPrimary";

interface Props{    
    validationSuite: Suite<(data: any) => void>,
    inputs: InputLabel[],
    selects?: SelectPrimary[],
    buttonsCoustom?: JSX.Element, 
    afterButton?:JSX.Element,   
    tittleButton:string,
    classButton:string
    onSubmits: (data: any) => Promise<void>,  
}

const useFormCoustom = ({validationSuite, inputs, selects, onSubmits, buttonsCoustom, afterButton, tittleButton, classButton}:Props) =>{
    const { register, handleSubmit, setError, setValue,clearErrors, getValues, control, reset, formState: { errors, isSubmitted, isSubmitting } } = useForm({
        mode: "all",
        resolver: vestResolver(validationSuite)
    });

    const body = (
        <FormPrimary
            isSubmitted={isSubmitted}
            buttonsCoustom={buttonsCoustom}
            tittleButton={tittleButton}
            inputs={inputs}
            selects={selects}
            handleSubmit={handleSubmit}
            onSubmits={onSubmits}
            classButton={classButton}
            afterButton={afterButton}
            register={register}
            getValues={getValues}
            errors={errors}
            isSubmitting={isSubmitting}
            control={control}
        />    
    )

    return { setError, clearErrors, reset, setValue ,body}

}

export default useFormCoustom;