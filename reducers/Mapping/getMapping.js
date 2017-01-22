
import _ from 'lodash'
import axios from 'axios'

import {getDomain} from '../../utilities'

// ----
// Action types
export const RECEIVE_MAPPING = 'RECEIVE_MAPPING'
// ----

// ------------------------------------
// Actions
// ------------------------------------

export function receiveMapping(mapping) {
  return {type: RECEIVE_MAPPING, mapping};
}

// returns all the data from Handcar
export function getMapping(departmentName) {

  return function(dispatch) {
    // It's impossible to know, for a D2L student what department
    //   their subject is in (403 on the term endpoint)
    // So we need to just get all departments here, if departmentName is null
    if (departmentName) {
      let modulesUrl = `${getDomain()}/middleman/departments/${departmentName}/modules`;
      let outcomesUrl = `${getDomain()}/middleman/departments/${departmentName}/outcomes`;
      let relationshipsUrl = `${getDomain()}/middleman/departments/${departmentName}/relationships`;

      return axios.all([axios.get(modulesUrl), axios.get(outcomesUrl), axios.get(relationshipsUrl)])
      .then(axios.spread((modules, outcomes, relationships) => {
        // console.log('received getting mapping', modules, outcomes, relationships);
        let mapping = {
          modules: modules.data,
          outcomes: outcomes.data,
          relationships: relationships.data
        };

        dispatch(receiveMapping({modules: modules.data, outcomes: outcomes.data, relationships: relationships.data}));

        return mapping;
      }))
      .catch((error) => {
        console.log('error getting mapping', error);
      });

    } else {
      let departments = ['accounting', 'algebra']
      let promises = []
      _.each(departments, (department) => {
        let modulesUrl = `${getDomain()}/middleman/departments/${department}/modules`;
        let outcomesUrl = `${getDomain()}/middleman/departments/${department}/outcomes`;
        let relationshipsUrl = `${getDomain()}/middleman/departments/${department}/relationships`;

        promises.push(axios.get(modulesUrl))
        promises.push(axios.get(outcomesUrl))
        promises.push(axios.get(relationshipsUrl))
      })

      return axios.all(promises)
      .then(axios.spread((accModules, accOutcomes, accRelationships, algModules, algOutcomes, algRelationships) => {
        // console.log('received getting mapping', modules, outcomes, relationships);
        let mapping = {
          modules: _.concat( accModules.data, algModules.data),
          outcomes: _.concat(accOutcomes.data, algOutcomes.data),
          relationships: _.concat(accRelationships.data, algRelationships.data)
        };

        dispatch(receiveMapping(mapping));

        return mapping;
      }))
      .catch((error) => {
        console.log('error getting mapping', error);
      });
    }
  }
}
