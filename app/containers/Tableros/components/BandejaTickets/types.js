import T from 'prop-types';

const bandejaTicketsType = T.shape({
  tipoSelected: T.number,
  ticketSelected: T.object,
  platillas: T.number,
  tabSelected: T.number,
  ticketsDetails: T.shape({
    id: T.number,
    nombre: T.string,
  }),
  nuevoTicket: T.bool,
  getTickets: T.func,
});


export const propTypes = {
  tabSelected: T.number,
  actions: T.object,
  bandejaTickets: bandejaTicketsType,
  onChangeTab: T.func,
};

export const defaultProps = {};

export default {
  propTypes,
  defaultProps,
};

