import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error"
import { makeAuthenticateOrgUseCase } from "@/use-cases/factories/make-authenticate-org-use-case"
import { AuthenticateUseCase } from "@/use-cases/login/authenticate"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"


export async function AuthenticateOrgs(request: FastifyRequest, reply: FastifyReply) {
    const authenticateOrgSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    })

    const { email, password } = authenticateOrgSchema.parse(request.body)

    try {
        const authenticateUseCase = makeAuthenticateOrgUseCase()
        
        const org = await authenticateUseCase.execute({
            email,
            password,
        })
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message })
        }
        
        throw error
    }

    return reply.status(200).send()
}