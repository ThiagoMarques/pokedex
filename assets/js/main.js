const pokemonList = document.getElementById('pokemonList')
const pokemonDiv = document.getElementById('pokemonDiv')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function hideList() {
    pokemonDiv.hidden = false;
    pokemonContainer.hidden = true;
}

function convertPokemonToDiv(pokemon) {
    return `
    <div id="pokemonSelected">
    <div class="contentDetails-main ${pokemon.type}">
    <div class="contentDetails">
      <div class="contentDetails-button">
        <button id="showListPokemon">Voltar</button>
      </div>
      <div class="contentDetails-box">
        <div class="pokemonHeader">
          <div class="pokemonHeader-text">
            <h1>${pokemon.name}</h1>
            <span>#${pokemon.number}</span>
          </div>
          <div class="pokemonHeader-badge">
          ${pokemon.types.map((type) => `<span class="pokemonHeader-type ${type}">${type}</span>`).join('')}
          </div>
        </div>
        <div class="pokemonImage">
          <img
            src="${pokemon.photo}"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
  <div class="contentDetails-info">
    <div class="pokemonInfo">
      <div class="pokemonInfo-about">
        <div class="pokemonInfo-title">
          <span>About</span>
        </div>
        <div class="infoDetails">
          <div class="infoDetails-name">
            <span>Height</span>
          </div>
          <div class="infoDetails-info">
            <span>${pokemon.height}</span>
          </div>
        </div>
        <div class="infoDetails">
          <div class="infoDetails-name">
            <span>Weight</span>
          </div>
          <div class="infoDetails-info">
            <span>${pokemon.weight}</span>
          </div>
        </div>
        <div class="infoDetails">
          <div class="infoDetails-name">
            <span>Abilities</span>
          </div>
          <div class="infoDetails-info">
            <span>${pokemon.abilities}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
    `
}

function convertPokemonToLi(pokemon) {
    return `
        <li id="pokemon-item-${pokemon.number}" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')

        pokemonList.innerHTML += newHtml
        
    }).then(() => {
        let elements = document.getElementsByClassName("pokemon");
        for(let index in elements) {
            if(index <= elements.length) {
                elements[index].addEventListener('click', () => {
                    const findPokemon = [];
                    findPokemon.push(cacheList[index])
                    const newHtml = findPokemon.map(convertPokemonToDiv).join('')
                    pokemonDiv.innerHTML += newHtml
                    const showListButton = document.getElementById('showListPokemon')
                    const pokemonContainer = document.getElementById('pokemonContainer')
                    const pokemonDetailAdded = document.getElementById('pokemonSelected')
                    showListButton.addEventListener('click', () => {
                        pokemonDiv.removeChild(pokemonDetailAdded)
                        pokemonContainer.hidden = false;
                        pokemonDetails.hidden = true;
 
                    })
                    hideList()
                })
            }
        }

    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

