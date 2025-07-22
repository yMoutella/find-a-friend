import PetRepository from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import ResourceNotFoundError from '../errors/resource-not-found-error'

interface GetPetDetailsUseCaseRequest {
  petId: string
  orgId?: string
}
interface GetPetDetailsUseCaseResponse {
  pet: Pet
}

export default class GetPetDetailsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(
    data: GetPetDetailsUseCaseRequest
  ): Promise<GetPetDetailsUseCaseResponse> {
    const { petId, orgId } = data

    if (!petId) {
      throw new Error('Pet ID is required')
    }

    const pet = await this.petRepository.findById(petId, orgId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
