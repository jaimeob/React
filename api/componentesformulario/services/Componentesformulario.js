'use strict';

/**
 * Componentesformulario.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all componentesformularios.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('componentesformulario', params);

    console.log('Componentesformulario', filters);

    // Select field to populate.
    const populate = Componentesformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Componentesformulario
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an componentesformulario.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Componentesformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Componentesformulario
      .findOne(_.pick(params, _.keys(Componentesformulario.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count componentesformularios.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('componentesformulario', params);

    return Componentesformulario
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an componentesformulario.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Componentesformulario.associations.map(ast => ast.alias));
    const data = _.omit(values, Componentesformulario.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Componentesformulario.create(data);

    // Create relational data and return the entry.
    return Componentesformulario.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an componentesformulario.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    console.log('componentes formularios: edit params', params);
    console.log('componentes formularios: edit values', values);
    const relations = _.pick(values, Componentesformulario.associations.map(a => a.alias));
    const data = _.omit(values, Componentesformulario.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Componentesformulario.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Componentesformulario.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an componentesformulario.
   *
   * @return {Promise}
   */
  removeAll: async params => {
    // const filters = strapi.utils.models.convertParams('componentesformulario', params);
    const {
      _id: configuracionformulario,
    } = params;
    const populate = Componentesformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');


    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Componentesformulario
      .deleteMany({
        configuracionformulario,
      })
      .populate(populate);
    return data;
    // if (!data) {
    //   return data;
    // }

    // await Promise.all(
    //   Componentesformulario.associations.map(async association => {
    //     if (!association.via || !data._id) {
    //       return true;
    //     }

    //     const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
    //     const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

    //     // Retrieve model.
    //     const model = association.plugin ?
    //       strapi.plugins[association.plugin].models[association.model || association.collection] :
    //       strapi.models[association.model || association.collection];

    //     return model.update(search, update, { multi: true });
    //   })
    // );

    // return data;
  },
  remove: async params => {
    // Select field to populate.
    const populate = Componentesformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Componentesformulario
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Componentesformulario.associations.map(async association => {
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
   * Promise to search a/an componentesformulario.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('componentesformulario', params);
    // Select field to populate.
    const populate = Componentesformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Componentesformulario.attributes).reduce((acc, curr) => {
      switch (Componentesformulario.attributes[curr].type) {
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

    return Componentesformulario
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },
  // editAll: async (body, response) => {
  //   const {
  //     configuracionId = '',
  //     configuredComponents = [],
  //   } = body;
  //   if (configuracionId.trim() === '') {
  //     response.badData('No se ha especificado el id de la configuración de formulario');
  //   }
  //   if (configuredComponents.length === 0) {
  //     response.badData('La colección proporcionada de componentes se encuentra vacía');
  //   }

  //   // const cfgFormularios = await Configuracionformulario
  //   //   .count()
  //   //   .where({ configuracionformulario: configuracionId });

  // }
};
