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
        let image = document.createElement("img");
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
        div.appendChild(image);
        div.appendChild(info);
        container.appendChild(div);
        break;
      default:
        break;
    }

    //Ahora a cada elemento creado (sea imagen o tarjeta) le ponemos un listener para el click
    //Se crea una función para poder pasarle parametros a otra ya creada, este caso details
    document
      .getElementById(champion.toLowerCase())
      .addEventListener("click", function () {
        details(champion);
      });
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

function details(championName) {
  //Recibir el campeon
  let champion = searchChamp(championName, data.data);
  //Tomar su información para llenar la pagina de detalles
  document.getElementById("name").innerHTML = champion.id;
  document.getElementById("icon").setAttribute("src", champion.img);
  document.getElementById("desc").innerHTML = champion.title;
  document.getElementById("main").style.display = "none";
}
function clickeado(nombre) {
  console.log("click en " + nombre);
}

show(data.data);

