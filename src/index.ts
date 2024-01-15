import { ExecuteQuery, ExecutionStatus, ExecutionResult } from './types'

export class Dune {
  private API_KEY: string

  constructor(API_KEY: string | undefined) {
    if (!API_KEY) {
      throw new Error('Dune API key is required')
    }

    this.API_KEY = API_KEY
  }

  /**
   * All endpoints start with https://api.dune.com/api/v1/
   * To execute a query, append `{query_id}/execute`
   * To check the status of an execution, append `execution/{execution_id}/status`
   * To fetch the data, append `execution/{execution_id}/results`
   * @param endpoint Type of data to fetch
   * @param id query id or execution id
   * @returns Dune API endpoint
   */
  private buildEndpoint(endpoint: string, id: number | string): string {
    const base = 'https://api.dune.com/api/v1'

    if (endpoint === 'execute') {
      return `${base}/query/${id}/${endpoint}`
    } else {
      return `${base}/execution/${id}/${endpoint}`
    }
  }

  /**
   * Wrapper to handle POST and GET requests from the Dune API
   * @param endpoint API endpoint
   * @returns Dune response
   */
  private async fetchDune<T>(endpoint: string): Promise<T> {
    const res = await fetch(endpoint, {
      method: endpoint.includes('execute') ? 'POST' : 'GET',
      headers: {
        'x-dune-api-key': this.API_KEY,
      },
    })

    const json = (await res.json()) as T
    return json
  }

  /**
   * Execute a query
   * @param query_id Dune query id
   * @returns Execution id and state
   */
  async execute(query_id: number): Promise<ExecuteQuery> {
    const endpoint = this.buildEndpoint('execute', query_id.toString())
    const res = await this.fetchDune<ExecuteQuery>(endpoint)
    return res
  }

  /**
   * Check the status of an execution
   * @param execution_id Dune execution id
   * @returns Status of execution
   */
  async status(execution_id: string): Promise<ExecutionStatus> {
    const endpoint = this.buildEndpoint('status', execution_id)
    const res = await this.fetchDune<ExecutionStatus>(endpoint)
    return res
  }

  /**
   * Fetch the results of an execution
   * @param execution_id Dune execution id
   * @returns Results of execution, including row data if available
   */
  async results<T>(execution_id: string): Promise<ExecutionResult<T>> {
    const endpoint = this.buildEndpoint('results', execution_id)
    const res = await this.fetchDune<ExecutionResult<T>>(endpoint)
    return res
  }
}
