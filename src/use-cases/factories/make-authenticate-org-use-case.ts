import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository"
import { AuthenticateUseCase } from "../login/authenticate"

export function makeAuthenticateOrgUseCase() {
    const prismaOrgsRepository = new PrismaOrgsRepository()
    const authenticateUseCase = new AuthenticateUseCase(
        prismaOrgsRepository
    )

    return authenticateUseCase
}