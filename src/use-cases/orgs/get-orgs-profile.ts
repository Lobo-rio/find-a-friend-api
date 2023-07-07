import { Org } from "@prisma/client"

import { OrgsRepository } from "@/repositories/abstract/orgs-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

interface GetOrgProfileUseCaseRequest {
   id: string 
}

interface GetOrgProfileUseCaseResponse {
    org: Org
}

export class GetOrgProfileUseCase {
    constructor(
        private readonly orgsRepository: OrgsRepository,
    ) {}

    async execute(
        {
            id,
        }: GetOrgProfileUseCaseRequest
    ): Promise<GetOrgProfileUseCaseResponse> {
        
        const org = await this.orgsRepository.findById(id)
    
        if (!org) throw new ResourceNotFoundError()
    
        return {
            org,
        }
    }
}
