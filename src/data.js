export const example = () => {
  return 'example';
};

export const anotherExample = () => {
  return 'OMG';
};

export const filterData = (data,condition) => {
  //Data es un objeto. Los campeones son los atributos de este objeto
  //Condition es un arreglo de condiciones
  let filter = {};
  for( const champion in data){
    //Recorrer el objeto
    condition.forEach( c => {
      //Recorrer el arreglo
      console.log(c.key);
    });
    console.log(`${champion}`);
  }
};
