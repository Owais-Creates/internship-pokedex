import { useContext, createContext, useEffect, useState } from "react";
import { FetchApiUrl } from "../utils/api.js";

// creation of context.
const PokedexContext = createContext();

// custom hook for context values.
export const usePokedex = () => {
    return useContext(PokedexContext);
};


// provider of context.
export const PokedexProvider = ({ children }) => {
    const [pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
        const FetchData = async () => {
            const data = await FetchApiUrl();
            setPokemonData(data);
        };
        FetchData();
    }, []);

    return (
        <PokedexContext.Provider value={{ pokemonData, setPokemonData }}>
            {children}
        </PokedexContext.Provider>
    );
};
