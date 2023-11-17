import { useEffect, useState } from "react";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [nextUrl, setNextUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [prevUrl, setPrevUrl] = useState(0);

  const loadPokemon = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPokemon(data.results);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPokemon("https://pokeapi.co/api/v2/pokemon");
  }, []);

  const handlePrevious = () => {
    if (prevUrl) {
      loadPokemon(prevUrl);
    }
  };

  const handleNext = () => {
    if (nextUrl) {
      loadPokemon(nextUrl);
    }
  };

  return (
    <main>
      <button type="button" onClick={handlePrevious} disabled={!prevUrl}>Previous Page</button>
      <button type="button" onClick={handleNext} disabled={!nextUrl}>Next Page</button>
      <ul>
        {pokemon.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </main>
  );
}
