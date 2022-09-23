import fetch from 'node-fetch'

export default class Dune {
  constructor(API_KEY) {
    /**
     * All endpoints start with https://api.dune.com/api/v1/
     * To execute a query, append `{query_id}/execute`
     * To check the status of an execution, append `execution/{execution_id}/status`
     * To fetch the data, append `execution/{execution_id}/results`
     * @param {string} endpoint Type of data to fetch
     * @param {number} id query id or execution id
     * @returns {string} Dune Analytics API endpoint
     */
    this.buildEndpoint = function (endpoint, id) {
      const base = 'https://api.dune.com/api/v1'
      switch (endpoint) {
        case 'execute': {
          return `${base}/query/${id}/execute`
        }
        case 'status': {
          return `${base}/execution/${id}/status`
        }
        case 'results': {
          return `${base}/execution/${id}/results`
        }
        default: {
          throw new Error('Invalid endpoint')
        }
      }
    }

    /**
     * Wrapper to handle POST and GET requests from the Dune Analytics API
     * @param {string} endpoint API endpoint
     * @returns Dune Analytics response
     */
    this.fetchDune = async function (endpoint) {
      return await fetch(endpoint, {
        method: endpoint.includes('execute') ? 'POST' : 'GET',
        headers: {
          'x-dune-api-key': API_KEY,
        },
      }).then((res) => res.json())
    }
  }
}
