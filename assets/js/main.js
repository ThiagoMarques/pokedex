const pokemonList = document.getElementById('pokemonList')
const pokemonDiv = document.getElementById('pokemonDiv')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonContainer = document.getElementById('pokemonContainer');


const maxRecords = 151
const limit = 16
let offset = 0;

let listApiPokemons = [];

function hideList() {
    pokemonDiv.hidden = !pokemonDiv.hidden;
    pokemonContainer.hidden = !pokemonContainer.hidden;
}

function convertPokemonToDiv(pokemon) {
    return `
    <div class="pokemonSelected">
    <div class="contentDetails-main ${pokemon.type}">
    <div class="contentDetails">
      <div class="contentDetails-button">
        <button class="backButton">Voltar</button>
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

function injectNewDiv() {
  return `<section id="pokemonDiv" class="content" hidden="">
      <!-- ..... Pokemons Details ..... -->
    </section>`
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
        listApiPokemons.push(...pokemons);
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        
    }).then(() => {
        let elements = document.getElementsByClassName("pokemon");
        for(let index in elements) {
            if(index <= elements.length) {
                elements[index].addEventListener('click', () => {
                    const elemSelected = document.getElementsByClassName('number');
                    const numberPokemon = +elemSelected[index].innerHTML.substring(1);
                    const pokemonSelected = listApiPokemons.filter((pokemon) => pokemon.number === numberPokemon);
                    const newHtmlDetail = pokemonSelected.map(convertPokemonToDiv).join('');
                    pokemonDiv.innerHTML = newHtmlDetail
                    hideList();
                    const backButton = document.getElementsByClassName('backButton')[0];
                    backButton.addEventListener('click', () => {
                      hideList();
                    })
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

