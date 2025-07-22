import OrgRepository from '@/repositories/org-repository'
import { hashSync } from 'bcryptjs'

export default async function createMockOrgSP(orgRepository: OrgRepository) {
  const hashedPassword = await hashSync('securepassword', 6)
  await orgRepository.create({
    id: 'org-sp',
    name: 'Org SP',
    author_name: 'Org SP',
    email: 'org-sp@example.com',
    whatsapp: '123456789',
    password: hashedPassword,
    cep: '12345-678',
    state: 'SP',
    city: 'São Paulo',
    neighborhood: 'Centro',
    street: 'Rua das Flores',
    latitude: -23.5505,
    longitude: -46.6333,
  })
}
