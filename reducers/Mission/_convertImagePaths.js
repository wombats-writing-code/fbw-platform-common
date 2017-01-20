import _ from 'lodash'
import axios from 'axios'
import Q from 'q'

import {getDomain} from '../../utilities'

export function convertImagePaths (itemObject) {
  // Grabs the 302 CloudFront URL from the middleman and replaces it in the
  // question / choice / feedback text.
  var itemString = JSON.stringify(itemObject),
    mc3RegEx = /https:\/\/mc3.mit.edu\/fbw-author.*?\/url/g,
    matches = itemString.match(mc3RegEx),
    cloudFrontPromises = [],
    originalURLs = [];
  // console.log('matches', matches)
  if (matches) {
    _.each(matches, (match) => {
      let params = {
          url: match.replace('https://mc3.mit.edu/fbw-author/api/v2/repository', `${getDomain()}/middleman`)
        };
      originalURLs.push(match);
      // console.log('params', params)
      cloudFrontPromises.push(axios(params));
    })

    return axios.all(cloudFrontPromises)
    .then((responses) => {  // each res should have the CloudFront URL
      // console.log('axios responses', responses)
      _.each(responses, (response, index) => {
        let mc3URL = originalURLs[index];
        itemString = itemString.replace(mc3URL, response.data);
      });
      // console.log('modified item', itemString)
      return Q.when(JSON.parse(itemString));
    })
    .catch((error) => {
      console.log('error getting cloudfront urls!');
    });
  } else {
    // console.log("no promises")
    return Q.when(JSON.parse(itemString));
  }
}
