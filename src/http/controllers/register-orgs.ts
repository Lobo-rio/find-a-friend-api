import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository"
import { OrgsAlreadyExistsError } from "@/use-cases/errors/orgs-already-exists-error"
import { RegisterOrgsUseCase } from "@/use-cases/orgs/register-orgs"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"


export async function RegisterOrgs(request: FastifyRequest, reply: FastifyReply) {
    const registerOrgSchema = z.object({
        title: z.string(),
        celular: z.coerce.string(), 
        address: z.string(),
        city: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
    })

    const { title, celular, address, city, email, password } = registerOrgSchema.parse(request.body)

    try {
        const prismaOrgsRepository = new PrismaOrgsRepository()
        const registerOrgsUseCase = new RegisterOrgsUseCase(
            prismaOrgsRepository
        )
        
        await registerOrgsUseCase.execute({
            title,
            celular,
            address,
            city,
            email,
            password,
        })
    } catch (error) {
        if (error instanceof OrgsAlreadyExistsError) {
            return reply.status(409).send({ message: error.message })
        }
        
        throw error
    }

    return reply.status(201).send()
}