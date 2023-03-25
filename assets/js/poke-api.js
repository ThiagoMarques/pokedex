
const pokeApi = {}
const cacheList = [];

function convertPokeApiDetailToPokemon(pokeDetail) {
    console.log("🚀 ~ file: poke-api.js:6 ~ convertPokeApiDetailToPokemon ~ pokeDetail:", pokeDetail)
    
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    
    const abilities = pokeDetail.abilities.map((Abilities) => Abilities.ability.name)
    const [abilitie] = abilities

    pokemon.abilities = abilities
    pokemon.abilitie = abilitie

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    cacheList.push(pokemon)
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
