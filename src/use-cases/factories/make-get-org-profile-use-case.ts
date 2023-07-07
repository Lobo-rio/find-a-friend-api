import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository"
import { GetOrgProfileUseCase } from "../orgs/get-orgs-profile"

export function makeGetOrgProfileUseCase() {
    const prismaOrgsRepository = new PrismaOrgsRepository()
    const getOrgProfileUseCase = new GetOrgProfileUseCase(
        prismaOrgsRepository
    )

    return getOrgProfileUseCase
}