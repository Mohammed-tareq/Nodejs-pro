function filtesRes(obj, fields = []) {
    const newObj = { ...obj };
    fields.forEach(field => delete newObj[field]);
    return newObj;
  }


  export default filtesRes;
  
  // how to using this function and i using this to filter api response becuse some data the fornt don't need it 
//   const cleanObj = exclude(Obj.toObject(), ["__v", "createdAt"]);
  