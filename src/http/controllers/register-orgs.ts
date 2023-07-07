import { z } from "zod"

import { OrgsAlreadyExistsError } from "@/use-cases/errors/orgs-already-exists-error"
import { makeRegisterOrgUseCase } from "@/use-cases/factories/make-register-org-use-case"
import { FastifyRequest, FastifyReply } from "fastify"


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
        const registerOrgsUseCase = makeRegisterOrgUseCase()
        
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