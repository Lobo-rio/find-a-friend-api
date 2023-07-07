import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { OrgsRepository } from "../abstract/orgs-repository"
import { GetResult } from "@prisma/client/runtime"

export class PrismaOrgsRepository implements OrgsRepository{
    async findById(id: string) {
        const org = await prisma.org.findUnique({
            where: {
                id,
            }
        })

        if (!org) return null

        return org
    }
    
    async findByEmail(email: string) {
        const org = await prisma.org.findUnique({
            where: {
                email,
            }
        })

        if (!org) return null

        return org
    }

    async findByCelular(celular: string) {
        const org = await prisma.org.findUnique({
            where: {
                celular,
            }
        })

        if (!org) return null

        return org
    }

    async findMany() {
        const orgs = await prisma.org.findMany()
        return orgs
    }

    async create(data: Prisma.OrgCreateInput) {
        const org = await prisma.org.create({
            data
        })

        return org
    }
}