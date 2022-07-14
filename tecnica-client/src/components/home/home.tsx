import { Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { create } from "vest";
import { GetEnpoint } from "../../api/api-base";
import { GetValidationRequerid } from "../../helpers/validation-form";
import useFormCoustom from "../../hooks/useFormCoustom";
import useInit from "../../hooks/useInit";
import { ResponseServerType } from "../../models/Enums/ResponseType";
import InputLabel from "../../models/Generics/Inputs/InputLabel";
import PanelPrimary from "../generics/panels/panel-primary";

const Home = () =>{  

    useInit(async()=>{
        document.title = "Inicio";        
    });    

    const validationSuite = create((data:any) => {
        GetValidationRequerid(array, data);  
    });

    const array = [
        {
            className:"form-group col-sm-6", 
            name:"limit", 
            title:"Limit", 
            type:"number", 
            required:true
        },
        {
            className:"form-group col-sm-6", 
            name:"offset", 
            title:"Offset", 
            type:"number", 
            required:true
        }        
    ] as InputLabel[];

    const onSubmit = async (data:any) =>{
        const id = toast.loading("Cargando..."); 
        try {
            const limit = data.limit;
            const result = await GetEnpoint<boolean>(`/SyncUp/${limit}/${data.offset}`); 
            if(result.code === ResponseServerType.Succes){
                reset();
                toast.update(id, { render: result.message, type: "success", isLoading: false, autoClose:2000 });
            }          
            else{
                toast.update(id, { render: result?.message, type: "warning", isLoading: false, autoClose:5000 });
            }             
        } catch (error) {
            toast.update(id, { render: "Ocurrio un error de red, " + error, type: "error", isLoading: false, autoClose:5000 });            
        }          
    }

    const { reset, body } = useFormCoustom({
        validationSuite:validationSuite, 
        tittleButton:"Sincronizar",
        inputs:array,
        onSubmits:onSubmit,
        classButton:"col-lg-12 pl-lg-1 mt-4"
        
    });

    


    return (
        <Container className="h-100 d-flex flex-column justify-content-center">           
            <Row className="justify-content-center text-center">          
                <PanelPrimary size="w-auto">
                    <>
                        <h4 className="strong text-center">Sincronizar data</h4>            
                        {body}
                    </>
                    
                </PanelPrimary>     
           </Row>
        </Container>
        
           
        
    );
}

export default Home;