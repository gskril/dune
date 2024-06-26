type QueryState =
  | 'QUERY_STATE_PENDING'
  | 'QUERY_STATE_EXECUTING'
  | 'QUERY_STATE_FAILED'
  | 'QUERY_STATE_COMPLETED'
  | 'QUERY_STATE_CANCELLED'
  | 'QUERY_STATE_EXPIRED'

interface ResultMetadata {
  column_names: string[]
  column_types: string[]
  row_count: number
  result_set_bytes: number
  total_row_count: number
  total_result_set_bytes: number
  datapoint_count: number
  pending_time_millis: number
  execution_time_millis: number
}

interface ExecutionResultData<T> {
  rows: T[]
  metadata: ResultMetadata
}

export interface ExecuteQueryOptions {
  params?: Record<string, string | number | Date>
}

export interface ExecuteQuery {
  execution_id: string
  state: QueryState
}

export interface CancelQuery {
  success: boolean
}

export interface ExecutionStatus {
  execution_id: string
  query_id: number
  is_execution_finished: boolean
  state: QueryState
  submitted_at: string

  // The following fields are not present in all states
  expires_at?: string
  execution_started_at?: string
  execution_ended_at?: string
  result_metadata?: ResultMetadata
}

export interface ExecutionResult<T> {
  execution_id: string
  query_id: number
  is_execution_finished: boolean
  state: QueryState
  submitted_at: string

  // The following fields are not present in all states
  expires_at?: string
  execution_started_at?: string
  execution_ended_at?: string
  result?: ExecutionResultData<T>
}

export type DataOrError<T> =
  | { data: T; error?: undefined }
  | { data?: undefined; error: string }
