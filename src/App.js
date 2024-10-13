import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './components/PokemonList';
import SearchBar from './components/SearchBar';
import './App.css'

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
  
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const results = response.data.results;

        
        const detailedPokemon = await Promise.all(
          results.map(async (poke) => {
            const pokeData = await axios.get(poke.url);
            return pokeData.data;
          })
        );
        
        setPokemon(detailedPokemon);
        setFilteredPokemon(detailedPokemon);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {

    const filtered = pokemon.filter(poke =>
      poke.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [search, pokemon]);

  return (
    <div className="app">
      <h1 style={{}}>Pokémon List</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <PokemonList pokemon={filteredPokemon} />
    </div>
  );
};

export default App;
