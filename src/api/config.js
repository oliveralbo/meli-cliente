

 const firm =  () => {
    const signin = {
        name : btoa("oliverio"),
        lastname: btoa("petrecca")
      }
      
      localStorage.setItem('signin',  JSON.stringify(signin));
  };


  export default {firm}