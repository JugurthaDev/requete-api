import React, { useState, useEffect } from 'react';
import './APIComponent.css';
import Pagination from './Pagination';
import PokemonCountSelector from './PokemonCountSelector';

const APIComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageUrl, setPageUrl] = useState({ next: null, previous: null });
  const [pokemonCount, setPokemonCount] = useState(10); 

  useEffect(() => {
    fetchData(0, pokemonCount); 
  }, [pokemonCount]); 

  const fetchData = async (offset, count) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${count}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      const detailedPokemonData = [];

      for (const pokemon of data.results) {
        const response = await fetch(pokemon.url);
        const details = await response.json();
        detailedPokemonData.push({ name: pokemon.name, imageUrl: details.sprites.front_default });
      }

      setData(detailedPokemonData);
      setPageUrl({ next: data.next, previous: data.previous });
      setLoading(false);
    } else {
      console.error('Error fetching data:', data);
      setLoading(true);
    }
  };

  const fetchPage = async (url) => {
    if (url) {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        const detailedPokemonData = [];

        for (const pokemon of data.results) {
          const response = await fetch(pokemon.url);
          const details = await response.json();
          detailedPokemonData.push({ name: pokemon.name, imageUrl: details.sprites.front_default });
        }

        setData(detailedPokemonData);
        setPageUrl({ next: data.next, previous: data.previous });
      } else {
        console.error('Error fetching data:', data);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">Données API Pokémon</h1>
      <p className="description">Liste des Pokémon</p>

      <PokemonCountSelector count={pokemonCount} onChange={setPokemonCount} />

      <Pagination 
        next={pageUrl.next} 
        previous={pageUrl.previous} 
        onNext={() => fetchPage(pageUrl.next)} 
        onPrevious={() => fetchPage(pageUrl.previous)} 
      />

      {loading ? (
        <div className="loading">Chargement en cours...</div>
      ) : (
        <div className="card-container">
          {data.map((pokemon, index) => (
            <div className="pokemon-card" key={index}>
              <img src={pokemon.imageUrl} alt={pokemon.name} className="pokemon-image" />
              <h3 className="pokemon-name">{pokemon.name}</h3>
            </div>
          ))}
        </div>
      )}

      <Pagination 
        next={pageUrl.next} 
        previous={pageUrl.previous} 
        onNext={() => fetchPage(pageUrl.next)} 
        onPrevious={() => fetchPage(pageUrl.previous)} 
      />
    </div>
  );
};

export default APIComponent;