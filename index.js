import { buildEndpoint, fetchDune } from './dune.js'

const endpoint = buildEndpoint('execute', '1258228')
const res = await fetchDune(endpoint)
console.log(res)
