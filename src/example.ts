import 'dotenv/config'
import Dune from './index.js'

const dune = new Dune(process.env.API_KEY)

const res = await dune.execute('1258228')
console.log(res)
