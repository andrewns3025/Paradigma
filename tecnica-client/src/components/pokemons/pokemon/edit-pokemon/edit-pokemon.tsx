import { Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { create, enforce, test } from "vest";
import { GetEnpoint } from "../../../../api/api-base";
import { GetValidationRequerid } from "../../../../helpers/validation-form";
import useInit from "../../../../hooks/useInit";
import { ResponseServerType } from "../../../../models/Enums/ResponseType";
import InputLabel from "../../../../models/Generics/Inputs/InputLabel";
import PanelPrimary from "../../../generics/panels/panel-primary";
import useFormCoustom from "../../../../hooks/useFormCoustom";
import { useContext, useEffect, useState } from "react";
import PokemonContext from "../../../../context/pokemon/PokemonContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PokemonDto } from "../../../../models/Dtos/Pokemons/PokemonDto";
import { SelectPrimary } from "../../../../models/Generics/Selects/SelectPrimary";
import { ValidateUrlYoutube } from "../../../../helpers/functions";

const EditPokemon = () =>{   
    const { pokemon, getPokemon, setPokemon, getLocations, getMoves, getAbilities, editPokemon } =  useContext(PokemonContext);
    let urlParams = useParams();
    const navigate = useNavigate();
    const [locations, setLocations] = useState<{
        value: string;
        label: string;
    }[]>();

    const [moves, setMoves] = useState<{
        value: string;
        label: string;
    }[]>();

    const [abilities, setAbilities] = useState<{
        value: string;
        label: string;
    }[]>();

    const { state } = useLocation();

    useInit(async()=>{
        const item = state as PokemonDto;   
       
        document.title = "Editar " + item.name;        
        if(item !== undefined){
            setPokemon(item);           
            
        }else{
            const id = toast.loading("Consultando registro..."); 
            await getPokemon(urlParams.id!).then((result)=>{
                setPokemon(result.result);

                toast.update(id, { render: result.message, type: "success", isLoading: false, autoClose:2000 });
            }).catch((error)=>{
                toast.update(id, { render: "Ocurrio un error de red, " + error, type: "error", isLoading: false, autoClose:5000 });   
            });
        }    
        
        await getLocations().then((result)=>{
            setLocations(result?.results?.map((item:any) =>{
                return {value: item.name, label: item.name};
            }));
        });
        
        await getMoves().then((result)=>{
            setMoves(result?.results?.map((item:any) =>{
                return {value: item.name, label: item.name};
            }));
        });

        await getAbilities().then((result)=>{
            setAbilities(result?.results?.map((item:any) =>{
                return {value: item.name, label: item.name};
            }));
        });

        mapDataForm(item);
    });

    const mapDataForm = (data:PokemonDto) =>{
        setValue("height", data.height);
        setValue("weight", data.weight);    
        setValue("videoId", data.videoId);    
    }

    useEffect(()=>{
        if(locations){
            setValue("locations", locations?.filter(x => pokemon.locations.split(', ').indexOf(x.value) >-1));
        }

        if(moves){
            setValue("moves", moves?.filter(x => pokemon.moves.split(', ').indexOf(x.value) >-1));
        }

        if(abilities){
            setValue("abilities", abilities?.filter(x => pokemon.abilities.split(', ').indexOf(x.value) >-1));
        }
    },[locations, moves, abilities])

    const validationSuite = create((data:any) => {
        GetValidationRequerid(array, data);  

        test('locations', 'Campo ' + "locations".toLowerCase() + ' es obligatorio', () => {
            if(data.locations.length > 0){
                return true;
            }else{
                return false;
            }
        });

        test('moves', 'Campo ' + "Moves".toLowerCase() + ' es obligatorio', () => {
            if(data.moves.length > 0){
                return true;
            }else{
                return false;
            }
        });

        test('abilities', 'Campo ' + "abilities".toLowerCase() + ' es obligatorio', () => {
            if(data.abilities.length > 0){
                return true;
            }else{
                return false;
            }
        });

        test('videoId', 'Url no es valida', () => {
            return ValidateUrlYoutube(data.videoId!);
        });        
    });

    const array = [
        {
            className:"form-group col-sm-6", 
            name:"height", 
            title:"Height", 
            type:"number", 
            required:true
        },
        {
            className:"form-group col-sm-6", 
            name:"weight", 
            title:"Weight", 
            type:"number", 
            required:true
        },
        {
            className:"form-group col-sm-6", 
            name:"videoId", 
            title:"Url Video Youtube", 
            type:"text", 
            required:true
        },          
    ] as InputLabel[];

    const select = [
        {
            className:"form-group col-sm-6",
            name:"locations",
            title:"Locations",
            placeholder:"Seleccionar",
            required:true,
            options:locations
        },
        {
            className:"form-group col-sm-6",
            name:"moves",
            title:"Moves",
            placeholder:"Seleccionar",
            required:true,
            options:moves
        },
        {
            className:"form-group col-sm-6",
            name:"abilities",
            title:"Abilities",
            placeholder:"Seleccionar",
            required:true,
            options:abilities
        }
    ] as SelectPrimary[];

    const onSubmit = async (data:any) =>{
        const id = toast.loading("Cargando..."); 
        var obj = {} as PokemonDto;
        obj.height = data.height;
        obj.weight = data.weight;
        obj.locations = data.locations.map((item:any) => item.value).join(', ');
        obj.moves = data.moves.map((item:any) => item.value).join(', ');
        obj.abilities = data.abilities.map((item:any) => item.value).join(', ');
        obj.videoId = data.videoId;
        await editPokemon(pokemon.pokemonId, obj).then((result)=> {
            toast.update(id, { render: result.message, type: "success", isLoading: false, autoClose:2000 });
            navigate(`/pokemons/pokemon/${pokemon.name}`);
        }).catch((error)=>{
            toast.update(id, { render: "Ocurrio un error de red, " + error, type: "error", isLoading: false, autoClose:5000 });    
        });          
    }

    const { setValue, body } = useFormCoustom({
        validationSuite:validationSuite, 
        tittleButton:"Guardar",
        inputs:array,
        selects:select,
        onSubmits:onSubmit,
        classButton:"col-lg-12 pl-lg-1 mt-4"
        
    });
    

    return (
        <Container className="p-menu h-100 d-flex flex-column justify-content-center">           
            <Row className="justify-content-center">          
                <PanelPrimary size="w-auto">
                    <>
                        <h4 className="strong text-center">Pokemon: {pokemon?.name}</h4>   
                        {body}
                    </>
                    
                </PanelPrimary>     
           </Row>
        </Container>
        
           
        
    );
}

export default EditPokemon;