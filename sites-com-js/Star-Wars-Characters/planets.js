let currentPageUrl = 'https://swapi.dev/api/planets/';

window.onload = async () => {

    try {
        await loadPlanets(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('erro ao carregar os cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)

};

async function loadplanets(url) {
    const mainContent = document.getElementById('main-content');

    mainContent.innerHTML = ''; //Limpar os resultados anteriores

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach(async (planets) => {
            const card = document.createElement("div");
            let urlImg = `https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg`;
            const response = await fetch(urlImg)
           
                if(response.ok){
                    card.style.backgroundImage = `url('${urlImg}')`;
                } else {
                    card.style.backgroundImage =url('https://starwars-visualguide.com/assets/img/placeholder.jpg')
                }
         


            const planetNameBg = document.createElement("div")
            planetNameBg.className = "planet-name-bg"

            const planetName = document.createElement("span")
            planetName.className = "planet-name"
            planetName.innerText = `${planets.name}`
            
            planetNameBg.appendChild(planetName)

            card.appendChild(planetNameBg)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"
                
                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = " "

                const planetImage = document.createElement("div")
                planetImage.style.backgroundImage = 
                `url("https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/planets/${planets.url.replace( /\D/g, "")}.jpg?raw=true0")`
                planetImage.className = "planet-image"

                const name = document.createElement("span")
                name.className = "planet-details"
                name.innerText = `nome: ${planets.name}` 

                const diameter = document.createElement("span")
                diameter.className = "planet-details"
                diameter.innerText = `diametro: ${convertDiameter(planets.diameter)}`

                const climate = document.createElement("span")
                climate.className = "planet-details"
                climate.innerText = `clima: ${convertClimate(planets.climate)}`

                const population = document.createElement("span")
                population.className = "planet-details"
                population.innerText = `populacao: ${convertPopulation(planets.population)}`

                modalContent.appendChild(planetImage)
                modalContent.appendChild(name)
                modalContent.appendChild(diameter)
                modalContent.appendChild(climate)
                modalContent.appendChild(population)
            }

            mainContent.appendChild(card)

        }); 

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? 'visible' : 'hidden'

        currentPageUrl = url

    } catch (error) {
        console.log(error)
        alert ("Erro ao carregar os planetas")
    }
}

async function loadNextPage() {
    if(!currentPageUrl) return;

    try{
         const response = await fetch(currentPageUrl);
         const responseJson = await response.json();

         await loadPlanets(responseJson.next)
    } catch(error) {
        console.log(erro)
        alert ("Não foi possível avançar a página")
    }
}

async function loadPreviousPage() {
    if(!currentPageUrl) return;

    try{
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadPlanets(responseJson.previous)
    } catch(error) {
        console.log(erro)
        alert ("erro ao retroceder a página")
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertClimate(climate) {
    const climas = {
        desert: "deserto",
        temperate: "temperado",
        frozen: "congelado",
        murky: "obscuro",
        unknown: "desconhecido"
    }

    return climas[climate.toLowerCase()] || climate
}

function convertDiameter(diameter){
    if(diameter === "unknown"){
        return "desconhecido"
    }
    return `${diameter} km`
}

function convertPopulation(population){
    if(population === "unknown"){
        return "desconhecida"
    }
    return population
}