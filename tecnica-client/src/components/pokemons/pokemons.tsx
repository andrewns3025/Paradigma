import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PokemonContext from "../../context/pokemon/PokemonContext";
import useInit from "../../hooks/useInit";
import { PokemonDto } from "../../models/Dtos/Pokemons/PokemonDto";
import { ResponseServerType } from "../../models/Enums/ResponseType";
import { Pagination } from "../../models/Generics/Tables/Pagination";
import PanelPrimary from "../generics/panels/panel-primary";
import TablePrimary from "../generics/tables/table-primary";

const Pokemons = () =>{
    const pageSize = 10;
    const { getAllPokemons, listPokemons, setPokemon, setPokemons, deletePokemon } =  useContext(PokemonContext);
    let navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const {page} = useParams();
    const pageRef = useRef<number>();

    const init = async () =>{
        setPokemon({} as PokemonDto);
        setPokemons({} as Pagination<PokemonDto>);
        const id = toast.loading("Cargando..."); 
        await getAllPokemons(Number(page!), pageSize).then((result) =>{
            if(result.code === ResponseServerType.Succes){
                toast.update(id, { render: result.message, type: "success", isLoading: false, autoClose:2000 });
            }else{
                toast.update(id, { render: result?.message, type: "warning", isLoading: false, autoClose:5000 });
            }
            setLoad(true);
        }).catch((e)=>{
            toast.update(id, { render: "Ocurrio un error de red, " + e, type: "error", isLoading: false, autoClose:5000 });   
        })
    }

    useEffect(() => {
        if(pageRef.current !== Number(page)){
            pageRef.current = Number(page);
            init();
        }        
    });


    const handleClickRow = async (item:PokemonDto) =>{
        navigate(`/pokemons/pokemon/${item.name}`,{state:item});
    }

    const handleDeletePokemon = async (item:PokemonDto) =>{
        const id = toast.loading("Eliminando registro..."); 
        await deletePokemon(item.pokemonId).then((result)=>{
            if(result.code === ResponseServerType.Succes){
                getAllPokemons(pageRef.current!,pageSize);
                toast.update(id, { render: result.message, type: "success", isLoading: false, autoClose:2000 });
            }else{
                toast.update(id, { render: result?.message, type: "warning", isLoading: false, autoClose:5000 });
            }
        }).catch((e)=>{
            toast.update(id, { render: "Ocurrio un error de red, " + e, type: "error", isLoading: false, autoClose:5000 });   
        });

        
    }

    return (
        <Container className="h-100 d-flex flex-column justify-content-center">
           
                <Row className="justify-content-center text-center">
                    <div className="col-sm-6">
                    <PanelPrimary size="w-auto">
                        <>
                            <h4 className="strong text-center">Lista de Pokemons</h4>  
                            {load && (<TablePrimary key={"pokemons"}
                                dataSource={listPokemons} 
                                columns={[{dataField:"pokemonId", caption:"Id", alignment:"left"},{dataField:"name", caption:"Nombre",alignment:"left"}, {dataField:"acciones", caption:"acciones",alignment:"center"}]}
                                enablepagination={true}
                                path="/pokemons"
                                FnRow={handleClickRow}
                                ADelete={handleDeletePokemon}
                            />)}
                        </>                         
                    </PanelPrimary>    
                    </div>
                    
                </Row>            
            
        </Container>
       
    )
}

export default Pokemons;