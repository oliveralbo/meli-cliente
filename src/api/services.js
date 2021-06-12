
// const bearer_token = localStorage.getItem("usrToken");
// let bearer = "Bearer " + bearer_token;

const get4Items = async (search) => {

  return fetch(`http://localhost:5000/api/items?q=${search}`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
    //   'token': bearer_token
    }),
  })
    .then(response => response.json())
    .then(data => (data, { data }))
    .catch(function (error) {
      console.log("Request failed", error);
    });
};

const getItem = async (id) => {
  return fetch(`http://localhost:5000/api/items/${id}`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
    //   'token': bearer_token
    }),
  })
    .then(response => response.json())
    .then(data => (data, { data }))
    .catch(function (error) {
      console.log("Request failed", error);
    });
};




export default {
    get4Items,
    getItem
};
