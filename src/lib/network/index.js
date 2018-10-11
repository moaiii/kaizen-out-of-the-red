// @flow
// $FlowFixMe
import axios from 'axios';

/**
 * Authors Note: 
 * This is a simple request function to handle our api calls 
 * but can be built out to handle various requests, throw errors and
 * check for appropriate headers, return codes etc based on the info
 * in endpoints.json
 */

export const networkRequest = ( config: Object ): Promise<any> => {
  return axios( config )
    .then(response => { return response })
    .catch(error => console.error(error));
}