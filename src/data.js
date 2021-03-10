export const example = () => {
  return 'example';
};

export const anotherExample = () => {
  return 'OMG';
};

export const filterData = (data,condition) => {
  //Data es un objeto
  //Condition es un arreglo de condiciones
  let filter = {};
  for( const champion in data){
    console.log(`${champion}`);
  }
}
