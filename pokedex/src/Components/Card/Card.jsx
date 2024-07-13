import React, { useEffect, useState } from 'react';
import "./Card.css";
import { usePokedex } from '../../Context/Context';
import axios from "axios";
import Search from '../Search/Search';

const Card = () => {
    const { pokemonData } = usePokedex();
    const [pokemonList, setPokemonList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);

    // filtering the data from the nested api
    const downloadData = async () => {
        if (pokemonData && pokemonData.results) {
            const pokemonResults = pokemonData.results;
            const pokeData = pokemonResults.map((p) => axios.get(p.url));
            const pokemonDataResults = await Promise.all(pokeData);

            const neededPokemonData = pokemonDataResults.map((p) => {
                const pokemon = p.data;
                return {
                    name: pokemon.name,
                    image: pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default,
                    types: pokemon.types,
                    id: pokemon.id
                };
            });
            setPokemonList(neededPokemonData);
        }
    };

    //running the filtering of data function whenver the main source of data variable changes to restrict any unnecessary behaviour.
    useEffect(() => {
        downloadData();
    }, [pokemonData]);


    // filtering the data based on the input and validating it.
    useEffect(() => {
        setFilteredPokemonList(
            pokemonList.filter(pokemon =>
                pokemon.name.toLowerCase().includes(searchTerm)
            )
        );
    }, [searchTerm, pokemonList]);

    return (
        <>
            <div className='main-div'>
                {/* sending the data to search component */}
                <Search setSearchTerm={setSearchTerm} />

                {/* rendering the data */}
                <div className='card-div'>
                    {filteredPokemonList.length > 0 ? (
                        filteredPokemonList.map((item, index) => (
                            <div key={index} className='card'>
                                <img src={item.image} alt={item.name} />
                                <h2>{item.name}</h2>
                            </div>
                        ))
                    ) : (
                        <p>No Pokémon found</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Card;
