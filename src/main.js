import { example, filterData } from './data.js';
import data from './data/lol/lol.js';

let view = 'cuad';

function show(dataSet){
    let container = document.getElementById('main');
    container.innerHTML = '';
    //Toma un set de datos y los muestra

    for (const champion in dataSet) {
        if(view == 'cuad'){
            //En cuadricula

            /* <img src="http://icon.png" id="champion" class="small-pic">*/
            let image = document.createElement('img');
            image.setAttribute('src', dataSet[champion].img);
            image.setAttribute('class', 'small-pic');
            image.setAttribute('id', champion.toLowerCase());
            container.appendChild(image);
        } else if(view == 'card') {
            //En tarjetas

            /* <div class="card">
                <img src="http://splash.jpg" alt="" class="card-pic">
                <div class="info">
                    <p>Nombre</p>
                    <p>Dificultad</p>
                    <p>Tags</p>
                </div>
            </div>*/

            let div = document.createElement('div');
            div.setAttribute('id',champion.toLowerCase());
            div.setAttribute('class','card');
            let image = document.createElement('img');
            image.setAttribute('src', dataSet[champion].splash);
            let info = document.createElement('div');
            let name = document.createElement('p');
            name.innerHTML = champion;
            let level = document.createElement('p');
            level.innerHTML = `Dificultad: ${dataSet[champion].info.difficulty}`;
            let roles = document.createElement('p');
            roles.innerHTML = `${dataSet[champion].tags[0]}`;

            info.appendChild(name);
            info.appendChild(level);
            info.appendChild(roles);
            div.appendChild(image);
            div.appendChild(info);
            container.appendChild(div);
        } else {
            //NOOP
        }
    }
}

function setView(value){ 
    view = value; 
    show(data.data);
}

function showCuadOn(){ setView('cuad') }

function showCardsOn(){ setView('card') }

document.getElementById('cuadView').addEventListener('click',showCuadOn);
document.getElementById('cardView').addEventListener('click',showCardsOn);

show(data.data);
