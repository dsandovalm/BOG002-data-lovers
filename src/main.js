import {filterData, searchData, sortData } from "./data.js";
import data from "./data/lol/lol.js";
import graphics from "./graphs.js";

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
	document.getElementById('return').style.display = 'none';
	document.getElementById('pages').style.display = 'flex';
  let container = document.getElementById("main");
  container.style.display = "flex";
	document.getElementById('title').style.display = 'block';
  container.innerHTML = "";

  let pagedData = pages(app.currentData, app.elementspp);

  //Toma un set de datos y los muestra
  for (const champion in pagedData[app.currentPage]) {
    let div = document.createElement("div");
    div.setAttribute("id", champion.toLowerCase());
    if(app.view === "cuad"){
      let image = document.createElement("img");
        image.setAttribute("src", app.currentData[champion].img);
        image.setAttribute("class", "small-pic");
        div.setAttribute("class", "square");
        //El id es el nombre del campeón pasado totalmente a minusculas
        div.appendChild(image);
        container.appendChild(div);
    } else {
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
    }
    //Ahora a cada elemento creado (sea imagen o tarjeta) le ponemos un listener para el click
    //Se crea una función para poder pasarle parametros a otra ya creada, este caso details
    document.getElementById(champion.toLowerCase()).addEventListener("click", function () { details(champion) });
  }
  console.log(Object.values(app.currentData).length)
  if(Object.values(app.currentData).length === 0){
    error();
  } else if(app.currentData === data.data) {
		document.getElementById('all').style.display = 'none';
	} else {
		document.getElementById('all').style.display = 'block';
	}
}

// Vistas detalladas

function details(championName) { //Creada en HDU 1
  //Recibir el campeon
  let champion = data.data[championName];
  //Tomar su información para llenar la pagina de detalles
  document.getElementById('main').style.display = 'none';
	document.getElementById('pages').style.display = 'none';
	document.getElementById('all').style.display = 'none';
  document.getElementById('details').style.display = 'block';
	document.getElementById('return').style.display = 'block';
	document.getElementById('title').style.display = 'none';

  
  //PARTE 1 y 2 Info básica + Bio

	let roles = '';
	for(let i=0; i<champion.tags.length; i++){
		roles += `${champion.tags[i]}, `;
	
	roles = roles.slice(0, -2);

  document.getElementById("details").innerHTML = `


      <h2 id="name">${champion.id}</h2>
			<div class="info"> 
				<div>
					<img id="icon" src="${champion.img}" alt="">
					<p id="desc">${champion.title}</p>
					<p>Roles: ${roles}</p>
          <p>Tipo: ${champion.partype}</p>
				</div>
				<div>
					<canvas id="canvasInfo">
						<p>Ataque</p>
						<p>Defensa</p>
						<p>Magia</p>
						<p>Dificultad</p>
					</canvas>
				</div>
			</div>
			<p class = "note"> A = Ataque. D = Defensa. M = Magia. Barra = Dificultad</p>
			<div class = "bio">
				<img src = "${champion.splash}">
				<p> ${champion.blurb} <a href = "https://euw.leagueoflegends.com/es-es/champions/${champion.name.toLowerCase().replace(' ','-').replace('.','')}/" target = "_blank">[Leer más]</a> </p>
			</div>`
  }
  // CANVAS

  let canvasInfo = document.getElementById('canvasInfo');
  let ctxInfo = canvasInfo.getContext('2d');
	canvasInfo.height = 200;
	canvasInfo.width = 200;

  graphics.poligon(canvasInfo,ctxInfo,[champion.info.attack,champion.info.defense,champion.info.magic],10,champion.info.difficulty);



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
  document.getElementById("details").appendChild(document.createElement('h2').appendChild(document.createTextNode('Stats')));
  document.getElementById("details").appendChild(stats);
  //Ocultar el footer!!!
}

// - - - - - - - AUX

function back(){
	document.getElementById('title').innerHTML = 'Todos los campeones';
	setData(data.data);
	document.getElementById('return').style.display = 'none';
}

function search() {
		document.getElementById('title').innerHTML = 'Resultados de la búsqueda';
  let champs = searchData(data.data, document.getElementById('searchInput').value);
  setData(champs);
  close();
}

function filter() {
	document.getElementById('title').innerHTML = 'Campeones filtrados';
  let rol = document.getElementById('selectTag').value;
  let dificult = document.getElementById('selectDifficulty').value;
  let criteria = {};
  
  if(rol===''){
    //Noop
  } else {
    criteria.tags = rol;
  }
  if(dificult===''){
    //Noop
  } else {
    criteria.info = {difficulty: dificult};
  }
  
  setData(filterData(data.data,criteria))
  close();
}

function sort() {
	document.getElementById('title').innerHTML = 'Campeones ordenados';
	let reverse = document.getElementById('reverse').value === 'des' ? true : false;
  let sorted = sortData( app.currentData, document.getElementById( 'selectSort' ).value, reverse );
  setData(sorted);
  close();
}

function pages(dataSet, n) {
  //Esta función divide la data en arreglos de objetos de longitud n
  //Que recibo? Data y un numero.

  let array = [];
  let cont = 0;
  for (const champion in dataSet) {
    if (cont % n == 0) {
      array[Math.floor(cont / n)] = {};
    }
    array[Math.floor(cont / n)][champion] = dataSet[champion];
    cont++;
  }
  return array;
}

function error() {
  document.getElementById('details').style.display = 'none';
  let container = document.getElementById("main");
  container.style.display = "flex";
  container.innerHTML = "No se encontraron campeones";
}


// - - - - - - - POP UPS

// - - - - 

function open(name) {
  //Asigna al pop up la clase active y pone visible el overlay
  document.getElementById(`${name}PopUp`).setAttribute('class', 'active');
  document.getElementById('overlay').style.display = 'block';
}

function close() {
  //Como busco el elemento de clase active y se la quito?
  //document.getElementById(`${name}PopUp`).style.display = 'none';
  document.getElementsByClassName(`active`)[0].setAttribute('class', 'popup');
  document.getElementById('overlay').style.display = 'none';
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

function setPage(n) {
  app.currentPage = n;

  document.getElementById('prev').innerHTML = (n == 0 ? '' : n);
  document.getElementById('actual').innerHTML = n + 1;
  document.getElementById('next').innerHTML = (n == pages(app.currentData, app.elementspp).length - 1 ? '' : n + 2);

  show();
}

function setData(data) {
  app.currentData = data;
  setPage(0);
  show();
}

//Como hacemos el control de las páginas?

// - - - - - - - LISTENERS

// Para Abrir y cerrar popUps

document.getElementById('openFilter').addEventListener("click", function () { open('filter') });
document.getElementById('openSearch').addEventListener("click", function () { open('search') });
document.getElementById('openSort').addEventListener("click", function () { open('sort') });
document.getElementById('openView').addEventListener("click", function () { open('view') });

let closeButtons = document.getElementsByClassName("close");
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', close);
}

// Para Cambios de Vistas
document.getElementById("cuadView").addEventListener("click", function () { setView('cuad'); setPages(36); close() }); //Creada en HDU 2
document.getElementById("cardView").addEventListener("click", function () { setView('card'); setPages(12); close()  }); //Creada en HDU 3

//Para cambiar de pagina

document.getElementById('first').addEventListener("click", function () { setPage(0) });

document.getElementById('prev').addEventListener("click", function () {
  let page = app.currentPage == 0 ? 0 : app.currentPage - 1;
  setPage(page)
});

document.getElementById('next').addEventListener("click", function () {
  let page = app.currentPage == pages(app.currentData, app.elementspp).length - 1 ? app.currentPage : app.currentPage + 1;
  setPage(page)
});

document.getElementById('last').addEventListener("click", function () {
  let page = app.currentPage == pages(app.currentData, app.elementspp).length - 1 ? app.currentPage : pages(app.currentData, app.elementspp).length - 1;
  setPage(page)
});

// Para llamar funciones

document.getElementById('filtButton').addEventListener("click", filter);
document.getElementById('searchBtn').addEventListener("click", search);
document.getElementById('sortBtn').addEventListener("click", sort);
document.getElementById('return').addEventListener("click", show);
document.getElementById('all').addEventListener("click", back);

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

<div class="info"> 
	<div>
		<img id="icon" src="https://www.masterypoints.com/assets/img/lol/champion_icons/Aatrox.png" alt="">
		<p id="desc">the Darkin Blade</p>
		<p>Roles</p>
		<p>Tipo</p>
	</div>
	<canvas>
          <p>Ataque</p>
          <p>Defensa</p>
          <p>Magia</p>
					<p>Dificultad</p>
  </canvas>
</div>



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
