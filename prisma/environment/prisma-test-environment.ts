import { prisma } from '@/prisma'
import 'dotenv/config'
import { execSync } from 'child_process'
import { randomUUID } from 'crypto'
import type { Environment } from 'vitest/environments'

function generateDatabaseUrl(schema: string): string {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set. Please set it to run tests.')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()
    const databaseUrl = generateDatabaseUrl(schema)
    process.env.DATABASE_URL = databaseUrl
    execSync('npx prisma migrate deploy')

    return {
      teardown: async () => {
        await prisma.$executeRawUnsafe(`
            DROP SCHEMA IF EXISTS "${schema}" CASCADE;
          `)

        await prisma.$disconnect()
      },
    }
  },
}
