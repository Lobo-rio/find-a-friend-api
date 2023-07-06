import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

export async function RegisterOrgs(request: FastifyRequest, reply: FastifyReply) {
    const registerOrgSchema = z.object({
        title: z.string(),
        celular: z.coerce.string(), 
        address: z.string(),
        city: z.string(),
        email: z.string(),
        password: z.string().min(8),
    })

    const { title, celular, address, city, email, password } = registerOrgSchema.parse(request.body)

    await prisma.org.create({
        data: {
            title, 
            celular, 
            address, 
            city, 
            email, 
            password
        }
    })

    return reply.status(201).send()
}