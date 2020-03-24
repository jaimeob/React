'use strict';

/**
 * Plantillaformulario.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all plantillaformularios.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('plantillaformulario', params);
    // Select field to populate.
    const populate = Plantillaformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Plantillaformulario
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an plantillaformulario.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Plantillaformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Plantillaformulario
      .findOne(_.pick(params, _.keys(Plantillaformulario.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count plantillaformularios.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('plantillaformulario', params);

    return Plantillaformulario
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an plantillaformulario.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Plantillaformulario.associations.map(ast => ast.alias));
    const data = _.omit(values, Plantillaformulario.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Plantillaformulario.create(data);

    // Create relational data and return the entry.
    return Plantillaformulario.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an plantillaformulario.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Plantillaformulario.associations.map(a => a.alias));
    const data = _.omit(values, Plantillaformulario.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Plantillaformulario.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Plantillaformulario.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an plantillaformulario.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Plantillaformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Plantillaformulario
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Plantillaformulario.associations.map(async association => {
        if (!association.via || !data._id) {
          return true;
        }

        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  },

  /**
   * Promise to search a/an plantillaformulario.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('plantillaformulario', params);
    // Select field to populate.
    const populate = Plantillaformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Plantillaformulario.attributes).reduce((acc, curr) => {
      switch (Plantillaformulario.attributes[curr].type) {
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({ [curr]: params._q });
          }

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat({ [curr]: { $regex: params._q, $options: 'i' } });
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({ [curr]: params._q === 'true' });
          }

          return acc;
        default:
          return acc;
      }
    }, []);

    return Plantillaformulario
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },


  /**
   * Obtiene las plantillas de los formularios de acuerdo al estatus
   * solicitado.
   *
   * @return {Promise}
   */

  ObtenerPlantillasFormularios: (params) => {
    //const filters = strapi.utils.models.convertParams('plantillaformulario', params);
    let condition = {};

    switch (params.estatus.toUpperCase()) {
      case 'A':
        condition = {'estatus' : true};
        break;
      case 'I':
        condition = {'estatus' : false};
        break;
      default:
        condition = '';
    }

    return Plantillaformulario
      //.find({}, 'nombreFormulario departamentos')
      .find()
      .where(condition)
      .populate('departamentos');
  },

  /**
   * Obtiene las plantillas de los formularios de acuerdo al estatus
   * solicitado.
   *
   * @return {Promise}
   */

  ValidarNombrePlantillaFormulario: async (params) => {
    const condition = {'nombreFormulario' : params.nombre};

    const total = await Plantillaformulario
      .count()
      .where(condition);

    return total;
  },

  /**
   * Obtiene las plantillas de los formularios de acuerdo al estatus
   * solicitado.
   *
   * @return {Promise}
   */

  obtenerPlantillasFormDeptos: async (params) => {
    let condition = {};

    switch (params.estatus.toUpperCase()) {
      case 'A':
        condition = {'estatus' : true};
        break;
      case 'I':
        condition = {'estatus' : false};
        break;
      default:
        condition = '';
    }

    return Plantillaformulario
      .find()
      .where(condition)
      .populate('departamentos')
      .then((data,error) => {
        if(!error){
          let cont = 0;
          const filterDepartament = (deptos) => {
            let resp = false;
            cont = cont + 1;
            console.log(cont);
            console.log(deptos);
            deptos.departamentos.forEach(element => {
              if(element._id == params._id) resp = true;
            });
            console.log(resp);
            if(resp) return deptos;
          };
          return data.filter(filterDepartament);
        } else {
          return [];
        }
      });
  }
};
