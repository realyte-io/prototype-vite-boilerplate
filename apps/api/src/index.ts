import { createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import { context } from './context'
import schema from './schema'
import dotenv from 'dotenv'

dotenv.config()

const yoga = createYoga({
    graphqlEndpoint: '/graphql',
    schema,
    context,
})

const server = createServer(yoga)

server.listen(4000, () => {
    console.log(`
  🚀 Server ready at: http://localhost:4000
  ⭐️ See sample queries: http://pris.ly/e/ts/graphql-sdl-first#using-the-graphql-api`)
})
