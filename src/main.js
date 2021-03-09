import { example, filterData } from './data.js';
import data from './data/lol/lol.js';

// import data from './data/pokemon/pokemon.js';
// import data from './data/rickandmorty/rickandmorty.js';

console.log(example, data);
filterData(data.data, 0, 0);


function viewCuad(dataSet){
let container = document.getElementById('cuad')
//Toma un set de datos y los muestra en una cuadrícula
for( const champion in dataSet) {
let image = document.createElement('img');
image.setAttribute('src', dataSet[champion].img)
container.appendChild(image);
}
}
