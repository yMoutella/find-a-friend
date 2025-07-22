import OrgRepository from '@/repositories/org-repository'

export default async function createMockOrgSP(orgRepository: OrgRepository) {
  await orgRepository.create({
    id: 'org-sp',
    name: 'Org SP',
    author_name: 'Org SP',
    email: 'org-sp@example.com',
    whatsapp: '123456789',
    password: 'securepassword',
    cep: '12345-678',
    state: 'SP',
    city: 'São Paulo',
    neighborhood: 'Centro',
    street: 'Rua das Flores',
    latitude: -23.5505,
    longitude: -46.6333,
  })
}
