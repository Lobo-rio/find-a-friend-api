import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../abstract/orgs-repository";
import { GetResult } from "@prisma/client/runtime";
import { UpdateOrgsUseCaseRequest } from "@/use-cases/orgs/update-orgs";
import { DeleteOrgsUseCaseResponse } from "@/use-cases/orgs/delete-orgs";

export class InMemoryOrgsRepository implements OrgsRepository {
    public items: Org[] = []

    async findById(id: string) {
        const org = this.items.find(item => id === item.id)

        if (!org) return null

        return org
    }

    async findByEmail(email: string) {
        const org = this.items.find(item => email === item.email)

        if (!org) return null

        return org
    }

    async findByCelular(celular: string) {
        const org = this.items.find(item => celular === item.celular)

        if (!org) return null

        return org
    }

    async findMany() {
        return this.items
    }
    
    async create(data: Prisma.OrgCreateInput) {
        const org = { 
            id: 'test-1',
            title: data.title,
            celular: data.celular,
            address: data.address,
            city: data.city, 
            email: data.email, 
            password: data.password,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        this.items.push(org)

        return org
    }

    async update(id: string, data: UpdateOrgsUseCaseRequest) {
        const orgExisted = await this.findById(id)
        
        if (orgExisted) {
           orgExisted.title = data.title
           orgExisted.address = data.address
           orgExisted.city = data.city
           orgExisted.celular = data.celular
           orgExisted.email = data.email
           orgExisted.updatedAt = new Date()
        }

        return orgExisted;
    }

    async delete(id: string) {
        const orgIndex = this.items.findIndex((org) => id === org.id)
        this.items.splice(orgIndex, 1)
    }
}