export const filterData = (dataSet,condition) => {
  //Data es un objeto. Los campeones son los atributos de este objeto
  //Condition es un objeto con las condiciones que deben cumplirse

  let filter = {};

  for( const champion in dataSet ){
    //Recorrer el objeto
		let valid = true;
		for( const cond in condition ){
			switch(cond){
				case 'tags':
					valid = valid && ( dataSet[champion][cond].indexOf(condition[cond]) != -1)
					break;
				case 'info':
					for( const info in condition[cond] ){
						valid = valid && (dataSet[champion][cond][info] == condition[cond][info]);
					}
					break;
				default:
					valid = valid && (dataSet[champion][cond] == condition[cond]);
					break;
			}
		}

		if(valid){
			filter[champion] = (dataSet[champion])
		}	
  }
	return(filter)
};

export const searchData = (dataSet, keywords) => {
  //Search es el mismo filter pero busca que se cumpla por lo menos una vez. En vez de recibir un arreglo de condiciones, recibe una palabra o un string.

  let filter = {};
	//Como hacemos para que coincida con mayusculas y minusculas? Pasando todo a minusculas
	let condition = keywords.toLowerCase().split(' ');
	

  for( const champion in dataSet ){
		let valid = false;
    //Recorrer el objeto
		condition.forEach( k => {
			for( const keys in dataSet[champion] ){
				switch(keys){
					case 'tags':
						valid = valid || ( dataSet[champion][keys].indexOf(k) != -1)
						break;
					case 'info':
						for( const info in dataSet[champion][keys] ){
							valid = valid || (dataSet[champion][keys][info] === k);
						}
						break;
					case 'title':
						valid = valid || ( dataSet[champion][keys].toLowerCase().indexOf(k) != -1);
						break;
					case 'blurb':
						valid = valid || ( dataSet[champion][keys].toLowerCase().indexOf(k) != -1);
						break;
					default:
						if(typeof(dataSet[champion][keys]) === "string"){
							valid = valid || (dataSet[champion][keys].toLowerCase() === k);
						}
						
						break;
				}
			}
		});

		if(valid){
			filter[champion] = (dataSet[champion])
		}	
  }
	return(filter)
};

export const sortData = (dataSet,criteria) => {
	//Data es un objeto. Los campeones son los atributos de este objeto. Los valores que toma el criterio pueden ser 2: numeros o strings

	//Criteria es la clave con la que se ordenarán, es un string

	let sorted = {};
	let type = checkAttribute(criteria);
	let base = dataSet;

  function searchFirst(data,sub,key){
		//Retorna el elemento con menor valor en criteria, cuando este es un valor numerico. 
		let element = {};
		let counter = 0;
		for( const champion in data ){
			//Si hay otro elemento con un menor valor para el criterio, tomarlo como elemento
			if( counter == 0){
				element = data[champion];
			} else if (data[champion][sub][key] < element[sub][key]){
				element = data[champion];
			}
			counter++;
		}
		return element;
	}

	let array = [];

	switch(type){
		case 'num':
			//CASE 1: num. Sort númerico
			//Contar cuantos campeones tiene el set
			for(let i=0; i< Object.values(dataSet).length;i++){
				if (criteria == 'attack' || criteria == 'defense'|| criteria == 'magic' || criteria == 	'difficulty') {
					let current = searchFirst(base,'info',criteria);
					sorted[current.id] = current;
					delete base[current.id];
				} else {
					let current = searchFirst(base,'stats',criteria);
					sorted[current.id] = current;
					delete base[current.id];
				}
			}
			break;

		case 'str':
			//CASE 2: str. Ordenar alfabeticamente.
			//Recorrer el set de datos. Obtener los datos del criterio en un arreglo y aplicar sort.
			//En el caso de los tags, se hace un arreglo con tag[0]
			// SUBCASOS: SUELTOS / TAGS
			for( const champion in dataSet ){
				//Recorrer el objeto
				if(criteria == 'tags'){
					array.push(`${dataSet[champion]['tags'][0]},${champion}`);
				} else {
					array.push(`${dataSet[champion][criteria]},${champion}`);
				}
			}
			//array.sort ordena el array en orden alfabetico.
			array.sort();
			//ahora hay que recorrer el array
			for(let i = 0; i< array.length;i++){
				let championName = array[i].split(',')[1];
				sorted[championName] = dataSet[championName];
			}
			break;
		}
	return sorted
};

function checkAttribute(key){
	//SOLO LAS QUE ESTAN EN INFO Y EN STATS SON NUMEROS
	let validNum = [
		'attack',
		'defense',
		'magic',
		'difficulty',
		'hp',
		'hpperlevel',
		'mp',
		'mpperlevel',
		'movespeed',
		'armor',
		'armorperlevel',
		'spellblock',
		'spellblockperlevel',
		'attackrange',
		'hpregen',
		'hpregenperlevel',
		'mpregen',
		'mpregenperlevel',
		'crit',
		'critperlevel',
		'attackdamage',
		'attackdamageperlevel',
		'attackspeedoffset',
		'attackspeedperlevel',
	];

	let validStr = [
		'id',
		'key',
		'title',
		'blurb',
		'tags',
		'partype',
	];

	let type = ( validNum.indexOf(key) == -1 ? ( validStr.indexOf(key) == -1 ? 'invalid' : 'str' ) : 'num' );

	return type;
} 
