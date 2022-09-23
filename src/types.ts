type QueryState =
  | 'QUERY_STATE_PENDING'
  | 'QUERY_STATE_EXECUTING'
  | 'QUERY_STATE_FAILED'
  | 'QUERY_STATE_COMPLETED'
  | 'QUERY_STATE_CANCELLED'
  | 'QUERY_STATE_EXPIRED'

export interface ExecuteQuery {
  execution_id: string
  state: QueryState
}

export interface ExecutionStatus {
  execution_id: string
  query_id: number
  state: QueryState
  submitted_at: string
  expires_at: string
  execution_started_at: string
  result_metadata?: ResultMetadata
}

interface ResultMetadata {
  column_names: string[]
  result_set_bytes: number
  total_row_count: number
  datapoint_count: number
  pending_time_millis: number
  execution_time_millis: number
}

export interface ExecutionResult {
  execution_id: string
  query_id: number
  state: QueryState
  submitted_at: string
  expires_at: string
  execution_started_at: string
  result: ExecutionResultData
}

interface ExecutionResultData {
  rows: any[]
  metadata: ResultMetadata
}
