import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      sub: string
      email: string
      role: 'ADMIN' | 'USER'
    } // payload type is used for signing and verifying
  }
}
