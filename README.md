# Dune Analytics API Client

[![npm](https://img.shields.io/npm/v/dune-api-client)](https://www.npmjs.com/package/dune-api-client)

A minimal typescript client for interacting with the [Dune Analytics API](https://dune.com/docs/api/).

## Examples

There are two ways to get data from a query. The first approach is to read the results from a specific execution.

```typescript
import { Dune } from 'dune-api-client'

const dune = new Dune('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

const execute = await dune.execute(3224138)
const status = await dune.status(execute.data.execution_id)
const res = await dune.results(execute.data.execution_id)
```

The second approach is to read the latest results from a query, regardless of how it was executed (including on the Dune website).

```typescript
import { Dune } from 'dune-api-client'

const dune = new Dune('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

const res = await dune.results(3224138)
```

The `dune.results` method accepts an optional type parameter to improve response type safety.

```typescript
type DuneData = {
  rank: number
  username: string
  followers: number
}

const res = await dune.results<DuneData>(3224138)
// res.data.result.rows will be of type DuneData[]
```

The `dune.execute` and `dune.results` methods support query params (text, number, and date).

```typescript
const execute = await dune.execute(2411864, {
  params: {
    text_record_key: 'avatar',
  },
})
```
