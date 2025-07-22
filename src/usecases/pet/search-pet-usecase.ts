import PetRepository from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import ResourceNotFoundError from '../errors/resource-not-found-error'

interface SearchPetUseCaseRequest {
  page: number
  state: string
  city?: string
  age?: string
  energy_level?: string
  size?: string
  name?: string
}

interface SearchPetUseCaseResponse {
  pets: Pet[]
}

export default class SearchPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(
    data: SearchPetUseCaseRequest
  ): Promise<SearchPetUseCaseResponse> {
    const pets = await this.petRepository.list({
      page: data.page,
      state: data.state,
      city: data.city,
      age: data.age,
      energy_level: data.energy_level,
      size: data.size,
      name: data.name,
    })

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return {
      pets,
    }
  }
}
