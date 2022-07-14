import Select,{ Props } from "react-select";

export default function SelectCoustom(props: Props<any>) {
    return (
      <Select    
        {...props}
        
        menuPortalTarget={document.body}   
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999}) }}
        noOptionsMessage={() => "No hay datos"}
        loadingMessage={() => "Cargando..."}      
        theme={(theme) => ({
          ...theme,        
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: "#f2dede",
            primary: "#dfb460",
          },
        })}
      />
    );
  }
  