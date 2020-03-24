import T from 'prop-types';

const ticketsDetailsType = T.shape({
  departamento: T.shape({
    id: T.any,
    nombre: T.string,
  }),
  departamentos: T.array,
  plantilla: T.object,
  plantillas: T.array,
});


export const propTypes = {
  ticketsDetails: ticketsDetailsType,
};

export const defaultProps = {};

export default {
  propTypes,
  defaultProps,
};

