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
			if(cond == 'info'){
				for( const info in condition[cond] ){
					valid = valid && (dataSet[champion][cond][info] == condition[cond][info]);
				}
			} else if(cond == 'tags'){
				valid = valid && ( dataSet[champion][cond].indexOf(condition[cond]) != -1)
			} else {
				valid = valid && (dataSet[champion][cond] == condition[cond]);
			}
		}

		if(valid){
			filter[champion] = (dataSet[champion])
		}	
  }
	return(filter)
};

export const sortData = (dataSet,criteria) => {
  //Data es un objeto. Los campeones son los atributos de este objeto
  //Criteria es la clave con la que se ordenarán, es un string
  let sorted = {};
	switch(criteria){
		case alphabetical:
			
	}
  return sorted;
};

export const searchData = (dataSet,keyword) => {
	//Data es un objeto. Los campeones son los atributos de este objeto
	//Keyword es la clave que se va a buscar, es un string

	//Va a buscar la keyword como coincidencia entre los nombres de los campeones, los values que puede obtener el

	for( const champion in dataSet ){
		//Primera busqueda: Nombres de los campeones.
		let valid = false;
		//Coincide el nombre?
		valid = valid || (champion == keyword);

		for(keys in dataSet[champion]){
			switch (keys) {
				case value: //Coincidencia de palabras incluidas
					champion.title;
					champion.blurb;
					break;

				case value://Coincidencia de palabras incluidas
					champion.title;
					champion.blurb;
					break;
			
				default:
					break;
			}
		}

		let test = { 
			Akali: {
				version: "6.24.1",
				id: "Akali",
				key: "84",
				name: "Akali",
				title: "the Fist of Shadow",
				/*img:
				"https://www.masterypoints.com/assets/img/lol/champion_icons/Akali.png",
				splash:
				"http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg",*/
				blurb:
				"There exists an ancient order originating in the Ionian Isles dedicated to the preservation of balance. Order, chaos, light, darkness -- all things must exist in perfect harmony for such is the way of the universe. This order is known as the Kinkou ...",
				/*info: {
					attack: 5,
					defense: 3,
					magic: 8,
					difficulty: 7
				},*/
				/* image: {
					full: "Akali.png",
					sprite: "champion0.png",
					group: "champion",
					x: 96,
					y: 0,
					w: 48,
					h: 48
				}, */
				tags: ["Assassin"],
				partype: "Energy",
				/*stats: {
					hp: 587.8,
					hpperlevel: 85,
					mp: 200,
					mpperlevel: 0,
					movespeed: 350,
					armor: 26.38,
					armorperlevel: 3.5,
					spellblock: 32.1,
					spellblockperlevel: 1.25,
					attackrange: 125,
					hpregen: 8.34,
					hpregenperlevel: 0.65,
					mpregen: 50,
					mpregenperlevel: 0,
					crit: 0,
					critperlevel: 0,
					attackdamage: 58.376,
					attackdamageperlevel: 3.2,
					attackspeedoffset: -0.1,
					attackspeedperlevel: 3.1
				}*/
			},
		}

		for( const cond in condition ){
			if(cond == 'info'){
				for( const info in condition[cond] ){
					valid = valid && (dataSet[champion][cond][info] == condition[cond][info]);
				}
			} else if(cond == 'tags'){
				valid = valid && ( dataSet[champion][cond].indexOf(condition[cond]) != -1)
			} else {
				valid = valid && (dataSet[champion][cond] == condition[cond]);
			}
		}

		if(valid){
			filter[champion] = (dataSet[champion])
		}

	}
  
	let filter = {};

	
	return filter;
};
