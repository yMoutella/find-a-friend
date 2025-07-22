import PetRepository from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import ResourceNotFoundError from '../errors/resource-not-found-error'

interface ListPetUseCaseRequest {
  page: number
  state: string
  city?: string
  age?: string
  energy_level?: string
  size?: string
}

interface ListPetUseCaseResponse {
  pets: Pet[]
}

export default class ListPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    page = 1,
    state,
    city,
    age,
    energy_level,
    size,
  }: ListPetUseCaseRequest): Promise<ListPetUseCaseResponse> {
    const pets = await this.petRepository.list({
      page,
      state,
      city,
      age,
      energy_level,
      size,
    })

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return {
      pets,
    }
  }
}
