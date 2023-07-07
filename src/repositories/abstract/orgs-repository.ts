import { Org, Prisma } from "@prisma/client"

export interface OrgsRepository {
    findById(id: string): Promise<Org | null>
    findByEmail(email: string): Promise<Org | null>
    findByCelular(celular: string): Promise<Org | null>
    findMany(): Promise<Org[]>
    create(data: Prisma.OrgCreateInput): Promise<Org>
}