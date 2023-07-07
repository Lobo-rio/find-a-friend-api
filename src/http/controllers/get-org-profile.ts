import { z } from "zod"

import { FastifyRequest, FastifyReply } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { makeGetOrgProfileUseCase } from "@/use-cases/factories/make-get-org-profile-use-case"


export async function GetOrgProfile(request: FastifyRequest, reply: FastifyReply) {
    const getOrgProfilechema = z.object({
        id: z.string(),
    })

    const { id } = getOrgProfilechema.parse(request.params)

    try {
        const getOrgProfileUseCase = makeGetOrgProfileUseCase()
        
        const org = await getOrgProfileUseCase.execute({
            id,
        })

        return org
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        
        throw error
    }

    return reply.status(200).send()
}