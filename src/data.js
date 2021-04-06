export const searchChamp = (champName,dataSet) => {
	return dataSet[champName];
}

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
	let condition = keywords.split(' ');

  for( const champion in dataSet ){
    //Recorrer el objeto
		condition.forEach( k => {
			for( const keys in dataSet[champion] ){
				switch(keys){
					case 'tags':
						valid = valid || ( dataSet[champion][keys].indexOf(k) != -1)
						break;
					case 'info':
						for( const info in condition[cond] ){
							valid = valid || (dataSet[champion][cond][info] == condition[cond][info]);
						}
						break;
					case 'title':
						valid = valid || ( dataSet[champion][keys].indexOf(k) != -1);
						break;
					case 'blurb':
						valid = valid || ( dataSet[champion][keys].indexOf(k) != -1);
						break;
					default:
						valid = valid || (dataSet[champion][cond] == condition[cond]);
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

  function first(data,sub,key){
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

	switch(type){
		case 'num':
			//CASE 1: num. Sort númerico
      //Contar cuantos campeones tiene el set
      let long = 0;
      for( const champion in dataSet ){
        long++
      }
      for(let i=0; i<long;i++){
        if (criteria == 'attack' || criteria == 'defense'|| criteria == 'magic' || criteria == 	'difficulty') {
          let current = first(base,'info',criteria);
          sorted[current.id] = current;
          delete base[current.id];
        } else {
          let current = first(base,'stats',criteria);
          sorted[current.id] = current;
          delete base[current.id];
        }
      }
			
      break;
		
		case 'str':
		//CASE 2: str

	// SUBCASOS: SUELTOS / TAGS

	for( const champion in dataSet ){

		
    //Recorrer el objeto
		condition.forEach( k => {
			for( const keys in dataSet[champion] ){
				switch(keys){
					case 'tags':
						valid = valid || ( dataSet[champion][keys].indexOf(k) != -1)
						break;
					case 'info':
						for( const info in condition[cond] ){
							valid = valid || (dataSet[champion][cond][info] == condition[cond][info]);
						}
						break;
					case 'title':
						valid = valid || ( dataSet[champion][keys].indexOf(k) != -1);
						break;
					case 'blurb':
						valid = valid || ( dataSet[champion][keys].indexOf(k) != -1);
						break;
					default:
						valid = valid || (dataSet[champion][cond] == condition[cond]);
						break;
				}
			}
		});

		if(valid){
			filter[champion] = (dataSet[champion])
		}	
  }
	}
	return sorted
};




let example = {
	Aatrox: {
      version: "6.24.1", //OMITIR
      id: "Aatrox", //ALFABETICO. Orden por defecto
      key: "266", //NUMERICO
      name: "Aatrox", //OMITIR
      title: "the Darkin Blade", //OMITIR
      img:
        "https://www.masterypoints.com/assets/img/lol/champion_icons/Aatrox.png",
      splash:
        "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg",
      blurb:
        "Aatrox is a legendary warrior, one of only five that remain of an ancient race known as the Darkin. He wields his massive blade with grace and poise, slicing through legions in a style that is hypnotic to behold. With each foe felled, Aatrox's ...",
      info: {
        attack: 8,
        defense: 4,
        magic: 3,
        difficulty: 4
      },
      image: {
        full: "Aatrox.png",
        sprite: "champion0.png",
        group: "champion",
        x: 0,
        y: 0,
        w: 48,
        h: 48
      },
      tags: ["Fighter", "Tank"],
      partype: "BloodWell",
      stats: {
        hp: 537.8,
        hpperlevel: 85,
        mp: 105.6,
        mpperlevel: 45,
        movespeed: 345,
        armor: 24.384,
        armorperlevel: 3.8,
        spellblock: 32.1,
        spellblockperlevel: 1.25,
        attackrange: 150,
        hpregen: 6.59,
        hpregenperlevel: 0.5,
        mpregen: 0,
        mpregenperlevel: 0,
        crit: 0,
        critperlevel: 0,
        attackdamage: 60.376,
        attackdamageperlevel: 3.2,
        attackspeedoffset: -0.04,
        attackspeedperlevel: 3
      }
    }, //13 atributos. SUB: . NUM: . ALP: . 
}

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

	let type = (validNum.indexOf(key) == -1 ? (validStr.indexOf(key) == -1 ? 'invalid' : 'str') : 'num' );

	return type;
}
