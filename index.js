import 'dotenv/config'
import Dune from './dune.js'

const dune = new Dune(process.env.API_KEY)

const endpoint = dune.buildEndpoint('execute', '1258228')
const res = await dune.fetch(endpoint)
console.log(res)
