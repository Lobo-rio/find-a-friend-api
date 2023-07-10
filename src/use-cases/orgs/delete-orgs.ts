import { OrgsRepository } from "@/repositories/abstract/orgs-repository"
import { Org } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

export interface DeleteOrgsUseCaseRequest {
    id: string
}

export interface DeleteOrgsUseCaseResponse {}

export class DeleteOrgsUseCase {
    constructor(
        private readonly orgsRepository: OrgsRepository,
    ) {}

    async execute(id: string): Promise<DeleteOrgsUseCaseResponse> {
        await this.orgsRepository.delete(id)
        return {}
    }
}
