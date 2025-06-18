import 'dotenv/config'
import assert from 'node:assert'
import { test } from 'node:test'

import { Dune } from '.'

test('should throw an error if no API key is provided', () => {
  assert.throws(() => {
    new Dune('')
  })
})

test('should return data from a query', async () => {
  type DuneData = {
    rank: number
    username: string
    followers: number
  }

  const dune = new Dune(process.env.DUNE_API_KEY)
  const res = await dune.results<DuneData>(3224138) // Top 100 Farcaster users by followers

  // We're expecting "dwr.eth" and "vitalik.eth" to be in the array, each with >400k followers
  const targetUsernames = ['dwr.eth', 'vitalik.eth']
  const targetUsers = res.data?.result?.rows.filter((row) =>
    targetUsernames.includes(row.username)
  )

  assert.strictEqual(targetUsers?.length, 2)
  for (const user of targetUsers) {
    assert.ok(
      user.followers > 400_000,
      `Expected ${user.username} to have >400k followers`
    )
  }
})
