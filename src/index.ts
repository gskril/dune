import fetch from 'node-fetch'
import { ExecuteQuery, ExecutionStatus, ExecutionResult } from './types'

export default class Dune {
  execute: (query_id: string | number) => Promise<ExecuteQuery>
  status: (execution_id: string) => Promise<ExecutionStatus>
  results: (execution_id: string) => Promise<ExecutionResult>

  constructor(API_KEY: string | undefined) {
    if (!API_KEY) {
      throw new Error('Dune Analytics API Key is required')
    }

    /**
     * Execute a query
     * @param {number} query_id Dune Analytics query id
     * @returns {ExecuteQuery} Execution id and state
     */
    this.execute = async function (query_id) {
      const endpoint = buildEndpoint('execute', query_id.toString())
      const res = await fetchDune(endpoint, API_KEY)
      return res
    }

    /**
     * Check the status of an execution
     * @param {number} execution_id Dune Analytics execution id
     * @returns {ExecutionStatus} Status of execution
     */
    this.status = async function (execution_id) {
      const endpoint = buildEndpoint('status', execution_id)
      const res = await fetchDune(endpoint, API_KEY)
      return res
    }

    /**
     * Fetch the results of an execution
     * @param {number} execution_id Dune Analytics execution id
     * @returns {ExecutionResult} Results of execution including row data
     */
    this.results = async function (execution_id) {
      const endpoint = buildEndpoint('results', execution_id)
      const res = await fetchDune(endpoint, API_KEY)
      return res
    }
  }
}

/**
 * All endpoints start with https://api.dune.com/api/v1/
 * To execute a query, append `{query_id}/execute`
 * To check the status of an execution, append `execution/{execution_id}/status`
 * To fetch the data, append `execution/{execution_id}/results`
 * @param {string} endpoint Type of data to fetch
 * @param {number} id query id or execution id
 * @returns {string} Dune Analytics API endpoint
 */
function buildEndpoint(endpoint: string, id: string): string {
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
 * @param {string} key Dune Analytics API key
 * @returns Dune Analytics response
 */
async function fetchDune(endpoint: string, key: string): Promise<any> {
  return await fetch(endpoint, {
    method: endpoint.includes('execute') ? 'POST' : 'GET',
    headers: {
      'x-dune-api-key': key,
    },
  }).then((res: any) => res.json())
}
