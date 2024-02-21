export const generatorUserError = (user) => {
    return `Todos lo campos son requerios y deben ser valido 😱.
    Lista de campos recibidos en la solicitud:
      - first_name  : ${user.first_name}
      - last_name   : ${user.last_name}
      - email       : ${user.email}
      - age         : ${user.age}
      - password    : ${user.password}
      `;
  };
  
  export const validatorUserError = (email, password) => {
   return `El email o contraseña son incorrectos 😱.
   - email       : ${email}
   - password    : ${password}`;
  } 
  export const generatorUserUpdate = (user ) =>{
    return `Todos lo campos son requerios y deben ser valido 😱.
    Lista de campos recibidos en la solicitud:
      -identification: ${user.documents}
      - proofOfAddress   : ${user.documents}
      - bankStatement       : ${user.documents}
      
      `;
  };
  