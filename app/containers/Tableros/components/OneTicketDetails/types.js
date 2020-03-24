import T from 'prop-types';

const ticketsDetailsType = T.shape({
  departamentos: T.shape({
    id: T.string,
    nombre: T.string,
  }),
  plantilla: T.arrayOf(T.shape({
    "nombreCampo": T.string,
    "cantidadArchivos": T.number,
    "requerido": T.bool,
    "activo": T.bool,
    "value": T.any,
    "opciones": T.array,
    "label": T.string,
    "tipo": T.number,
    "longitud": T.number,
    "tamanioArchivos": T.number,
    "esArchivo": T.bool,
  })),
});


export const propTypes = {
  ticketsDetails: ticketsDetailsType,
};

export const defaultProps = {};

export default {
  propTypes,
  defaultProps,
};