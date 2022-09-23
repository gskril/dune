# Dune Analytics API Wrapper

A few helper functions that make the [Dune Analytics API](https://dune.com/docs/api/) easier to use.

## Available functions

```js
const dune = new Dune(API_KEY)

dune.execute(queryId)
dune.status(executionId)
dune.results(executionId)
```

Includes types for all API responses.
