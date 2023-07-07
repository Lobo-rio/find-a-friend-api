import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository"
import { RegisterOrgsUseCase } from "../orgs/register-orgs"

export function makeRegisterOrgUseCase() {
    const prismaOrgsRepository = new PrismaOrgsRepository()
    const registerOrgsUseCase = new RegisterOrgsUseCase(
        prismaOrgsRepository
    )

    return registerOrgsUseCase
}