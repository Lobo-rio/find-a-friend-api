import { RegisterOrgsUseCase } from "./register-orgs"
import { compare } from "bcryptjs"
import { Org } from "@prisma/client"

describe('Register Orgs Use Case', () => {
    it('should hash orgs password upon registration', async () => {
        const registerOrgsUseCase = new RegisterOrgsUseCase({
            async findByEmail(email: string) { return null},
            async findByCelular(celular: string) { return null},
            async findMany() { return [] },
            async create(data) {
                return { 
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
            }
        }) 

        const { org } = await registerOrgsUseCase.execute({
            title: 'Fala Mansa',
            celular: '99999999999',
            address: 'Rua Test Vitest',
            city: 'Vistest', 
            email: 'string@test.com', 
            password: 'string908',
        })

        const isPasswordCorrectlyHashed = await compare(
            'string908',
            org.password
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
})