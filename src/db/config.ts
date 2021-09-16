import { createClient } from 'redis'

export const clientRedis = createClient()
clientRedis.on('error', (error) => console.log(error))
clientRedis.connect().then(
  () => {
    console.log('Connected to Redis')
  },
  (error) => console.log(error)
)

process.on('SIGINT', () => {
  clientRedis.disconnect()
  console.log('Disconnected from Redis')
})
