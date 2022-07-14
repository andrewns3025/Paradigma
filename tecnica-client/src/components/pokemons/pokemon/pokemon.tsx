import { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PokemonContext from "../../../context/pokemon/PokemonContext";
import { getYouTubeVideoIdFromUrl } from "../../../helpers/functions";
import useInit from "../../../hooks/useInit";
import { PokemonDto } from "../../../models/Dtos/Pokemons/PokemonDto";
import { Pagination } from "../../../models/Generics/Tables/Pagination";
import ButtonPrimary from "../../generics/buttons/button-primary";
import PanelPrimary from "../../generics/panels/panel-primary";
import TablePrimary from "../../generics/tables/table-primary";
import VideoYoutube from "../../video-youtube/video-youtube";

const Pokemon = () =>{
    const { pokemon, listPokemons,getPokemon, setPokemon } =  useContext(PokemonContext);
    let urlParams = useParams();
    const navigate = useNavigate();
    const [info, setInfo] = useState<Pagination<{}>>({} as Pagination<{}>);

    useEffect(() =>{         
        if(pokemon){
            var array = [
                {key: "Name", value:pokemon.name},
                {key: "Height", value:pokemon.height},
                {key: "Weight", value:pokemon.weight},
                {key: "Locations", value:pokemon.locations},
                {key: "Moves", value:pokemon.moves},
                {key: "Abilities", value:pokemon.abilities},
            ];


            const newObj = {} as Pagination<{}>;
            newObj.values = [];
            newObj.values = array;
            newObj.currentPage = 1;
            setInfo(newObj);
        }
    }, [pokemon]);

    const { state } = useLocation();

    useInit(async()=>{   
        setPokemon({} as PokemonDto);
        const item = state as PokemonDto;   
        if(item !== null){
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
    });

    const backNavigation = async () =>{
        const pageCurrent = listPokemons !== null ? listPokemons.currentPage : 1;
        navigate("/pokemons/"+ pageCurrent);
    }

    return (       
        <Container className="p-menu h-100 d-flex flex-column justify-content-center">            
            <Row className="justify-content-center "> 
                               
                <div className="col-sm-6 d-flex flex-column justify-content-center">
                    <PanelPrimary size="w-auto">
                        <>
                            <h4 className="strong text-center">Pokemon: {pokemon?.name}</h4>  
                            <TablePrimary key={"pokemons"}
                                dataSource={info!} 
                                columns={[{dataField:"key", caption:"", alignment:"left"},{dataField:"value", caption:"Valor",alignment:"left"}]}
                            />                    
                        </>
                    </PanelPrimary> 
                </div>
                <div className="col-sm-6 d-flex flex-column justify-content-center text-center">
                    
                    <PanelPrimary size="w-auto">
                        <>
                        <img src={pokemon?.urlImage} />
                        {pokemon?.videoId && (<VideoYoutube videoId={getYouTubeVideoIdFromUrl(pokemon?.videoId)!}/>)}
                        <div className="col-sm-12 mt-3">
                            <Row>
                                <div className="col-sm-6">
                                    <ButtonPrimary onClick={backNavigation}>Atras</ButtonPrimary>
                                </div>
                                <div className="col-sm-6">
                                    <ButtonPrimary onClick={async() =>{navigate(`/pokemons/pokemon/edit/${pokemon.name}`, {state:pokemon});}}>Editar</ButtonPrimary>
                                </div>
                            </Row>
                            
                            
                        </div>  
                    </>
                    </PanelPrimary>  
                    
                </div>
               
            </Row>
          
        </Container>
           
    )

}

export default Pokemon;