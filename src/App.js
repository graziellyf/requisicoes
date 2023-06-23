import React from 'react'; 
import axios from 'axios';

import './App.css';

function App() {

  const [pokemons, alteraPokemons ] = React.useState( [] );
  const [txtPokemon, alteratxtPokemon ] = React.useState("");

  function buscaPokemon(){

    if (txtPokemon == "") {
      buscaTodosPokemons();
      return;
    }


    axios.get("https://pokeapi.co/api/v2/pokemon/"+txtPokemon)
    .then( response => {
      console.log("Requisição bem sucedida!");
      alteraPokemons ( [ response.data ] );
    } ) 
    .catch( response => {
      alert ("Esse pokemon não existe");
      console.log("Deu ruim na requisição");
      console.log(response);
    })
  }
  

  function buscaTodosPokemons(){
    axios.get("https://pokeapi.co/api/v2/pokemon")
    .then( response => {
      console.log("Requisição bem sucedida!");
      alteraPokemons (response.data.results);
    } ) 
    .catch( response => {
      console.log("Deu ruim na requisição");
      console.log(response);
    })

  }

  React.useEffect( ()=>{
    buscaTodosPokemons();
  }, [] );
  
  return (
    <div>

        <h1> Graxeta PokéDex </h1>
        <p> Conheça os Pokémons mais famosos </p>

        <input onChange={ (e)=> alteratxtPokemon ( e.target.value ) } placeholder="Digite o nome de um Pokémon"/> 
        <button onClick={ ()=> buscaPokemon() }> Buscar </button>

        {
          pokemons.map( (pokemon, index) =>
            <div>
              <p> { pokemon.name }</p>   
              <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"+( pokemon.id ? pokemon.id : index + 1)+".gif"} />
            </div>
          )
        }

    </div>
  );
}

export default App;
