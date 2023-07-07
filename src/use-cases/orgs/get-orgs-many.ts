import { Org } from "@prisma/client"

import { OrgsRepository } from "@/repositories/abstract/orgs-repository"

interface GetOrgsManyUseCaseResponse {
    orgs: Org[]
}

export class GetOrgsManyUseCase {
    constructor(
        private readonly orgsRepository: OrgsRepository,
    ) {}

    async execute(): Promise<GetOrgsManyUseCaseResponse> {
        
        const orgs = await this.orgsRepository.findMany()
    
        return {
            orgs,
        }
    }
}
