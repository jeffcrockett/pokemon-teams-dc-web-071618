const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const allPokemon = []

document.addEventListener('DOMContentLoaded', fetchTrainers)
// function getAllPokemon() {
//     fetch(TRAINERS_URL)
//         .then(res => res.json())
//         .then(trainers => {
//             console.log(trainers)
//             trainers.forEach((trainer) => {
//                 trainer.pokemons.forEach((pokemon) => {
//                     console.log(pokemon);
//                     allPokemon.push(pokemon);

//                 })
//             })
//         })
// }  

// getAllPokemon();

function fetchTrainers() {
    console.log('dom content loaded')
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then((trainers) => {
            trainers.forEach((trainer) => {
            makeCardFrom(trainer);
            // console.log(trainer);
        })
        document.querySelectorAll('.release').forEach((btn) => {
            btn.addEventListener('click', deletePokemon)
        });

        document.querySelectorAll('.add-pokemon').forEach((btn) => {
            btn.addEventListener('click', addPokemon)
        })
})
}

function addPokemon(event) {
    const trainer = event.currentTarget.parentElement;
    console.log(trainer);
    const trainerId = event.currentTarget.parentElement.dataset.id;
    const data = {trainer_id: trainerId}
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(pokemon => {
            console.log(pokemon);
            if(!trainer.querySelectorAll('li').length >= 6){
                trainer.querySelector('ul').innerHTML += `
                <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
            }
        })
        
}

function deletePokemon(event) {
    // console.log(event.currentTarget.parentElement);
    let id = event.currentTarget.dataset.pokemonId
    console.log(id);
    fetch(`${POKEMONS_URL}/${id}`, {
        'method': 'DELETE'
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            });
    event.currentTarget.parentElement.remove()
}
    

function makeCardFrom(trainer) {
    console.log(trainer);
    const main = document.querySelector('main')
    main.innerHTML += `
    <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
  <button class="add-pokemon" data-trainer-id="${trainer.id}">Add Pokemon</button><ul id="ul-${trainer.id}"></ul>`
    ul = main.querySelector(`#ul-${trainer.id}`)
    trainer.pokemons.forEach((pokemon) => {
        ul.innerHTML += `<li> ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
`
  })
}
