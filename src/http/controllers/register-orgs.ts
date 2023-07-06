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
        await RegisterOrgsUseCase({
            title,
            celular,
            address,
            city,
            email,
            password,
        })
    } catch (error) {
        return reply.status(409).send()  
    }

    return reply.status(201).send()
}