import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemon }) => {
  return (
    <div className="pokemon-list">
      {pokemon.length > 0 ? (
        pokemon.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))
      ) : (
        <p>No Pokémon found.</p>
      )}
    </div>
  );
};

export default PokemonList;
