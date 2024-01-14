# Dune Analytics API Client

A minimal typescript client for interacting with the [Dune Analytics API](https://dune.com/docs/api/).

## Example

```typescript
import { Dune } from 'dune-api-client'

const dune = new Dune('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

type DuneData = {
  rank: number
  username: string
  followers: number
}

const execute = await dune.execute(3224138)
const status = await dune.status(execute.execution_id)
const data = await dune.results<DuneData>(execute.execution_id)
```
