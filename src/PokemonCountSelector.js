// PokemonCountSelector.js
import React from 'react';
import './PokemonCountSelector.css';

const PokemonCountSelector = ({ count, onChange }) => {
  const options = [10, 20, 25, 50, 100, 9999];

  return (
    <div className="count-selector">
      <label htmlFor="pokemon-count" className="count-label">Nombre de Pokémon à afficher :</label>
      <div className="select-wrapper">
        <select id="pokemon-count" value={count} onChange={(e) => onChange(e.target.value)} className="pokemon-select">
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PokemonCountSelector;
