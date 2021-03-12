import { example, filterData, searchChamp } from "./data.js";
import data from "./data/lol/lol.js";

let view = "cuad";

//Vistas generales

function show(dataSet) {
  let container = document.getElementById("main");
  container.style.display = "flex";
  container.innerHTML = "";

  //Toma un set de datos y los muestra
  for (const champion in dataSet) {
    switch (view) {
      case "cuad":
        /* <img src="http://icon.png" id="champion" class="small-pic">*/

        let image = document.createElement("img");
        image.setAttribute("src", dataSet[champion].img);
        image.setAttribute("class", "small-pic");
        //El id es el nombre del campeón pasado totalmente a minusculas
        image.setAttribute("id", champion.toLowerCase());
        container.appendChild(image);
        break;
      case "card":
        //En tarjetas
        /* <div class="card">
                <img src="http://splash.jpg" alt="" class="card-pic">
                <div class="info">
                    <p>Nombre</p>
                    <p>Dificultad</p>
                    <p>Tags</p>
                </div>
            </div> */

        let div = document.createElement("div");
        div.setAttribute("id", champion.toLowerCase());
        div.setAttribute("class", "card");
        let img = document.createElement("img");
        image.setAttribute("src", dataSet[champion].splash);
        let info = document.createElement("div");
        let name = document.createElement("p");
        name.innerHTML = champion;
        let level = document.createElement("p");
        level.innerHTML = `Dificultad: ${dataSet[champion].info.difficulty}`;
        let roles = document.createElement("p");
        roles.innerHTML = `${dataSet[champion].tags[0]}`;

        info.appendChild(name);
        info.appendChild(level);
        info.appendChild(roles);
        div.appendChild(img);
        div.appendChild(info);
        container.appendChild(div);
        break;
      default:
        break;
    }

    //Ahora a cada elemento creado (sea imagen o tarjeta) le ponemos un listener para el click
    //Se crea una función para poder pasarle parametros a otra ya creada, este caso details
    document.getElementById(champion.toLowerCase()).addEventListener("click", function () {details(champion)});
  }
}

function setView(value) {
  view = value;
  show(data.data);
}

function showCuadOn() {
  setView("cuad");
}
function showCardsOn() {
  setView("card");
}

document.getElementById("cuadView").addEventListener("click", showCuadOn);
document.getElementById("cardView").addEventListener("click", showCardsOn);

// Vistas detalladas

function createP(key,value){
  let p = document.createElement('p');
  p.appendChild(document.createTextNode(`${key}: ${value}`));
  return p
}

function details(championName) {
  //Recibir el campeon
  let champion = searchChamp(championName, data.data);
  //Tomar su información para llenar la pagina de detalles
  
  //PARTE 1 Info básica
  
  document.getElementById("main").innerHTML = `
      <h2 id="name">${champion.id}</h2>
      <div class="info"> 
        <img id="icon" src="${champion.img}">
        <p id="desc">${champion.title}</p>
      </div>
      <div>
        <div>
          <p>Dificultad: ${champion.info.difficulty}</p>
          <p>Roles: ${champion.tags[0]}</p>
          <p>Tipo: ${champion.partype}</p>
        </div>
        <div>
          <p>Ataque: ${champion.info.attack}</p>
          <p>Defensa: ${champion.info.defense}</p>
          <p>Magia: ${champion.info.magic}</p>
        </div>
      </div>
      <img src="${champion.splash}">

    <p class="">${champion.blurb}</p>`
  
  //PARTE 2 STATS
  
  let stats = document.createElement('div');
  
  for(const keys in champion.stats){
    stats.appendChild(createP(keys, champion.stats[keys]));
  }
  document.getElementById("main").appendChild(stats);
  /*
  <h2 id="name">Nombre</h2>
      <div class="info"> 
        <img id="icon" src="https://www.masterypoints.com/assets/img/lol/champion_icons/Aatrox.png" alt="">
        <p id="desc">the Darkin Blade</p>
      </div>
      <div>
        <div>
          <p>Dificultad</p>
          <p>Roles</p>
          <p>Tipo</p>
        </div>
        <div>
          <p>Ataque</p>
          <p>Defensa</p>
          <p>Magia</p>
        </div>
      </div>
      <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg" alt="">

    <p class="">descripción de campeón</p>
    <div>
      <h3>Stats</h3>
      <p>hp</p>
      <p>hpperlevel</p>
      <p>mp</p>
      <p>mpperlevel</p>
      <p>movespeed</p>
      <p>armor</p>
      <p>armorperlevel</p>
      <p>spellblock</p>
      <p>spellblockperlevel</p>
      <p>attackrange hpregen</p>
      <p>hpregenperlevel</p>
      <p>mpregen</p>
      <p>mpregenperlevel</p>
      <p>crit</p>
      <p>critperlevel</p>
      <p>attackdamage</p>
      <p>attackdamageperlevel</p>
      <p>attackspeedoffset</p>
      <p>attackspeedperlevel</p>
    </div>
  */
}

//Run
    
show(data.data);
//184
