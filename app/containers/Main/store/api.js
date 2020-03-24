import api from 'services/api';

export const requestFakeApi = (id = 1) =>
  api
    .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then((resp) => resp)
    .catch((err) => err)
