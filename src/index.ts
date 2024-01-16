import {
  ExecuteQuery,
  ExecutionStatus,
  ExecutionResult,
  CancelQuery,
  ExecuteQueryOptions,
} from './types'

export class Dune {
  private API_KEY: string
  private BASE_URL = 'https://api.dune.com/api/v1'

  constructor(API_KEY: string | undefined) {
    if (!API_KEY) {
      throw new Error('Dune API key is required')
    }

    this.API_KEY = API_KEY
  }

  /**
   * Wrapper to handle HTTP requests with clean typing
   * @param endpoint API endpoint
   * @returns Dune response
   */
  private async fetchDune<T>(
    method: 'GET' | 'POST',
    endpoint: string,
    body?: { query_parameters?: ExecuteQueryOptions['params'] }
  ): Promise<T> {
    const res = await fetch(endpoint, {
      method,
      headers: {
        'x-dune-api-key': this.API_KEY,
      },
      body: method === 'POST' ? JSON.stringify(body) : undefined,
    })

    const json = (await res.json()) as T
    return json
  }

  /**
   * Execute a query
   * @param query_id Dune query id
   * @returns Execution id and state
   */
  async execute(
    query_id: number,
    options?: ExecuteQueryOptions
  ): Promise<ExecuteQuery> {
    const endpoint = this.BASE_URL + '/query/' + query_id + '/execute'
    const body = { query_parameters: options?.params }
    return await this.fetchDune<ExecuteQuery>('POST', endpoint, body)
  }

  /**
   * Cancel an execution
   * @param execution_id Dune execution id
   * @returns Success of cancellation
   */
  async cancel(execution_id: string): Promise<CancelQuery> {
    const endpoint = this.BASE_URL + '/execution/' + execution_id + '/cancel'
    return await this.fetchDune<CancelQuery>('POST', endpoint)
  }

  /**
   * Check the status of an execution
   * @param execution_id Dune execution id
   * @returns Status of execution
   */
  async status(execution_id: string): Promise<ExecutionStatus> {
    const endpoint = this.BASE_URL + '/execution/' + execution_id + '/status'
    return await this.fetchDune<ExecutionStatus>('GET', endpoint)
  }

  /**
   * Fetch the results of an execution
   * @param exec_or_query_id Dune execution id or query id
   * @returns Results of execution, including row data if available
   */
  async results<T>(
    exec_or_query_id: string | number,
    options?: ExecuteQueryOptions
  ): Promise<ExecutionResult<T>> {
    const isIdNumber = /^\d+$/.test(exec_or_query_id.toString())
    let endpoint: string

    if (isIdNumber) {
      // If `exec_or_query_id` is a number, we want the latest query results
      // Since this is a GET request, the params need to be in the URL query string
      // https://dune.com/docs/api/api-reference/get-results/latest-results/
      const searchParams = new URLSearchParams()

      if (options?.params) {
        for (const [key, value] of Object.entries(options.params)) {
          const formattedKey = 'params.' + key
          const formattedValue =
            value instanceof Date ? value.toISOString() : value.toString()

          searchParams.append(formattedKey, formattedValue)
        }
      }

      endpoint = `${this.BASE_URL}/query/${exec_or_query_id}/results?${searchParams}`
    } else {
      // If `exec_or_query_id` is a string, we want the results of a specific execution
      endpoint = this.BASE_URL + '/execution/' + exec_or_query_id + '/results'
    }

    return await this.fetchDune<ExecutionResult<T>>('GET', endpoint)
  }
}
