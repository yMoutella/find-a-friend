import { app } from './app'
import { env } from './env'

app
  .listen({
    port: Number(env.PORT),
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`Server is running 🐯`)
    console.log(`
      ${env.NODE_ENV}
      ${env.PORT}
      ${env.JWT_SECRET}
      ${env.DATABASE_URL}
    `)
  })
