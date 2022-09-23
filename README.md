# Dune Analytics API Wrapper

A few helper functions that make the [Dune Analytics API](https://dune.com/docs/api/) easier to use.

## Example

```js
const dune = new Dune('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

const execute = await dune.execute(1258228)
const status = await dune.status(execute.execution_id)
const data = await dune.results(execute.execution_id)
```

Includes types for all API responses.
