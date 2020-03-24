import api from 'services/api';

export function getPlantillaTicketsApi(data = {}) {
  return api.request({
    url: '/plantillatickets',
    method: 'post',
    data,
  }).then((resp) => 

    // console.log('resp', resp);
    resp   
  ).catch((err) => err)
};


export function updatePlantillaTicketsApi(data = {},idTicket) {
  return api.request({
    url: `/plantillatickets/${idTicket}`,
    method: 'put',
    data,
  }).then((resp) => 

    // console.log('resp Api', resp);
    resp   
  ).catch((err) => err)
}
// axios.put(`http://172.17.10.99:1337/plantillatickets/${idTicket}`,  {