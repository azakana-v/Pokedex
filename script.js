const { response } = require("express");

function script() {
    let index = 1;
    let link = "https://pokeapi.co/api/v2/pokemon/" + index;

    //Input's
    let pokemonName = document.getElementById("pokemon-name");
    let pokemonNumber = document.getElementById("pokemon-number");
    let pokemonImg = document.getElementById("pokemon-img");
    let leftArrow = document.getElementById("left-arr");
    let rightArrow = document.getElementById("right-arr");
    let inputField = document.getElementById("search");
    //=============================================================

    rightArrow.addEventListener('click', async () => {
        index++;
        link = "https://pokeapi.co/api/v2/pokemon/" + index;
        console.log(link);
        await doFetch();
    });

    leftArrow.addEventListener('click', async () => {
        if (index != 1) {
            index--;
        }
        link = "https://pokeapi.co/api/v2/pokemon/" + index;
        console.log(link);
        await doFetch();
    });

    inputField.addEventListener("keydown", async function (e) {
        if (e.key === "Enter") {
            link = "https://pokeapi.co/api/v2/pokemon/" + inputField.value
            await doFetch();
            inputField.value = "";
        }
    });

    function doFetch() {
        fetch(link)
            .then(response => {
                if (!response.ok) {
                    throw new Error("No pokemon with this Id/Number!");
                }
                return response.json();
            })
            .then(pokemon => {
                console.log(pokemon);
                pokemonName.innerText = pokemon.name;
                pokemonNumber.innerText = pokemon.id
                let pokemonImgLink = pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default
                let noimg = pokemonImgLink == null;
                pokemonImg.src = noimg ? "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/55e9f737-071f-43e4-95a1-e364df4055f1/ddl7rju-84a00c7f-7f66-4617-8673-c17a435b2ab8.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU1ZTlmNzM3LTA3MWYtNDNlNC05NWExLWUzNjRkZjQwNTVmMVwvZGRsN3JqdS04NGEwMGM3Zi03ZjY2LTQ2MTctODY3My1jMTdhNDM1YjJhYjguZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.7pkoeDC4FlXfdNoKc05KNzNRcm8lCwLyzO0F6XEd-BY" : pokemonImgLink; 

                index = pokemon.id
            })
            .catch(error => {
                pokemonNumber.innerText = 0;
                pokemonName.innerText = "No pokemon!";
                console.log(error)});
    }

}//Dom600