import { filterData, searchChamp } from "./data.js";
import data from "./data/lol/lol.js";

console.clear();

const app = {
  view: 'cuad',  
  currentData: data.data,
	elementspp: 36,
	currentPage: 0,
}


// - - - - - - - CREACIÓN DE HTML

// Vistas generales

function show() { //Creada en HDU 1. Modificada en HDU 3
  document.getElementById('details').style.display = 'none';
  let container = document.getElementById("main");
  container.style.display = "flex";
  container.innerHTML = "";

	let pagedData = pages(app.currentData,app.elementspp);

  //Toma un set de datos y los muestra
  for (const champion in pagedData[app.currentPage]) {
    let div = document.createElement("div");
    div.setAttribute("id", champion.toLowerCase());
    switch (app.view) {

      case "cuad":
        let image = document.createElement("img");
        image.setAttribute("src", app.currentData[champion].img);
        image.setAttribute("class", "small-pic");
        div.setAttribute("class", "square");
        //El id es el nombre del campeón pasado totalmente a minusculas
        div.appendChild(image);
        container.appendChild(div);
        break;

      case "card":
        div.setAttribute("class", "card");
        let img = document.createElement("img");
        img.setAttribute("src", app.currentData[champion].splash);
        let info = document.createElement("div");
        let name = document.createElement("p");
        name.innerHTML = champion;
        let level = document.createElement("p");
        level.innerHTML = `Dificultad: ${app.currentData[champion].info.difficulty}`;
        let roles = document.createElement("p");
        roles.innerHTML = `${app.currentData[champion].tags[0]}`;

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
    document.getElementById(champion.toLowerCase()).addEventListener("click", function () { details(champion) });
  }
}

// Vistas detalladas

function details(championName) { //Creada en HDU 1
  //Recibir el campeon
  let champion = searchChamp(championName, data.data);
  //Tomar su información para llenar la pagina de detalles
  document.getElementById('main').style.display = 'none';
  document.getElementById('details').style.display = 'block';

  //PARTE 1 y 2 Info básica + Bio

  document.getElementById("details").innerHTML = `
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

    <p class=""> ${champion.blurb} [Leer más]</p>`

  //PARTE 3 STATS

  let stats = document.createElement('div');
  stats.setAttribute('class', 'stats');

  for (const keys in champion.stats) {
    let line = document.createElement('div');
    line.setAttribute('class', 'line');
    let left = document.createElement('p');
    left.setAttribute('class', 'keys');
    let rigth = document.createElement('p');
    rigth.setAttribute('class', 'values');
    left.appendChild(document.createTextNode(keys));
    rigth.appendChild(document.createTextNode(champion.stats[keys]));
    line.appendChild(left);
    line.appendChild(rigth);
    stats.appendChild(line);
  }
  document.getElementById("details").appendChild(stats);
}

// - - - - - - - AUX

function filter() {
  let rol = document.getElementById('selectTag').value;
  let dificult = document.getElementById('selectDifficulty').value;
  setData(filterData(data.data,
    {
      tags: rol,
      info: {
        difficulty: dificult,
      },
    }))
  show();
  close();
}

function sort() {
  show();
}

function pages(dataSet, n){
	//Esta función divide la data en arreglos de objetos de longitud n
	//Que recibo? Data y un numero.

	let array = [];
	let cont = 0;

	for( const champion in dataSet ){
		if(cont%n == 0){
			array[Math.floor(cont/n)] = {};
		}
		array[Math.floor(cont/n)][champion] = dataSet[champion];
		cont++;
	}
	return array;
} 


// - - - - - - - POP UPS

function close(){
	document.getElementById('popUp').style.display = 'none';
	document.getElementById('overlay').style.display = 'none'
}

function openFilter(){
	document.getElementById('popUp').style.display = 'flex';
	document.getElementById('overlay').style.display = 'block';
}

// - - - - - - - SETTERS

function setView(value) { //Creada en HDU 2
  app.view = value;
  show();
}

function setPages(value) { //Creada en HDU 2
  app.elementspp = value;
  show();
}

function setData(data) {
  app.currentData = data;
	app.currentPage = 0;
  show();
}

function setPage(n){
	app.currentPage = n;

	document.getElementById('prev').innerHTML = (n == 0 ? '' : n);
	document.getElementById('actual').innerHTML = n+1;
	document.getElementById('next').innerHTML = (n == pages(app.currentData, app.elementspp).length - 1 ? '' : n+2);

	show();
} 

//Como hacemos el control de las páginas?

// - - - - - - - LISTENERS

document.getElementById("cuadView").addEventListener("click", function () { setView('cuad'); setPages(36) }); //Creada en HDU 2
document.getElementById("cardView").addEventListener("click", function () { setView('card'); setPages(12) }); //Creada en HDU 3

document.getElementById('filtButton').addEventListener("click", filter);
document.getElementById('close').addEventListener("click", close);
document.getElementById('openFilter').addEventListener("click", openFilter);

document.getElementById('first').addEventListener("click", function () { setPage(0) });

document.getElementById('prev').addEventListener("click", function () { 
	let page = app.currentPage == 0 ? 0 : app.currentPage - 1 ;
	setPage(page)
});

document.getElementById('next').addEventListener("click", function () { 
	let page = app.currentPage == pages(app.currentData, app.elementspp).length - 1  ? app.currentPage : app.currentPage + 1 ;
	setPage(page)
});

document.getElementById('last').addEventListener("click", function () { 
	let page = app.currentPage == pages(app.currentData, app.elementspp).length - 1  ? app.currentPage : pages(app.currentData, app.elementspp).length - 1 ;
	setPage(page)
});

console.log(pages(data.data,12)[6]);

// - - - - - - - RUN 
show();

/* BASES HTML */

/* CUADRICULA
<img src="http://icon.png" id="champion" class="small-pic"> */

/*  RESUMENES
	<div class="card">
                <img src="http://splash.jpg" alt="" class="card-pic">
                <div class="info">
                    <p>Nombre</p>
                    <p>Dificultad</p>
                    <p>Tags</p>
                </div>
            </div> */

/* DETAILS
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
