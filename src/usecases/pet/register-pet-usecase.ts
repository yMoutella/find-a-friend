import { Pet } from '@prisma/client'
import PetRepository from '../../repositories/pet-repository'

interface RegisterPetUseCaseRequest {
  name: string
  age: string
  about: string
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  energy_level: 'LOW' | 'MEDIUM' | 'HIGH'
  environment: string
  org_id: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export default class RegisterPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(
    data: RegisterPetUseCaseRequest
  ): Promise<RegisterPetUseCaseResponse> {
    const createdPet = await this.petRepository.create({
      name: data.name,
      age: data.age,
      about: data.about,
      size: data.size,
      energy_level: data.energy_level,
      environment: data.environment,
      org_id: data.org_id,
    })

    return {
      pet: createdPet,
    }
  }
}
