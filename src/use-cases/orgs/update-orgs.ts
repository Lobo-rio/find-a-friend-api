import { OrgsRepository } from "@/repositories/abstract/orgs-repository"
import { Org } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

export interface UpdateOrgsUseCaseRequest {
    title: string 
    celular: string
    address: string 
    city: string 
    email: string
}

interface UpdateOrgsUseCaseResponse {
    org: Org
}

export class UpdateOrgsUseCase {
    constructor(
        private readonly orgsRepository: OrgsRepository,
    ) {}

    async execute(
        id: string,
        data: UpdateOrgsUseCaseRequest
    ): Promise<UpdateOrgsUseCaseResponse> {
        const org = await this.orgsRepository.update(id, data)
        
        if (!org) throw new ResourceNotFoundError()

        return {
            org,
        }
    }
}
