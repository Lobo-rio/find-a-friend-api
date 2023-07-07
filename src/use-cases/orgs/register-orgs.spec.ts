import { RegisterOrgsUseCase } from "./register-orgs"
import { compare } from "bcryptjs"
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { OrgsAlreadyExistsError } from "../errors/orgs-already-exists-error"

describe('Register Orgs Use Case', () => {
    it('should be able to register org', async () => {
        const orgsRepository = new InMemoryOrgsRepository()
        const registerOrgsUseCase = new RegisterOrgsUseCase(orgsRepository) 

        const { org } = await registerOrgsUseCase.execute({
            title: 'Fala Mansa',
            celular: '99999999999',
            address: 'Rua Test Vitest',
            city: 'Vistest', 
            email: 'string@test.com', 
            password: 'string908',
        })

        expect(org.id).toEqual(expect.any(String))
    })

    it('should hash orgs password upon registration', async () => {
        const orgsRepository = new InMemoryOrgsRepository()
        const registerOrgsUseCase = new RegisterOrgsUseCase(orgsRepository) 

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

    it('should not be able to register with same email twice', async () => {
        const orgsRepository = new InMemoryOrgsRepository()
        const registerOrgsUseCase = new RegisterOrgsUseCase(orgsRepository) 

        const email = 'string@test.com'

        await registerOrgsUseCase.execute({
            title: 'Fala Mansa',
            celular: '99999999999',
            address: 'Rua Test Vitest',
            city: 'Vistest', 
            email, 
            password: 'string908',
        })

        
        expect(
            async () => {
                await registerOrgsUseCase.execute({
                    title: 'Fala Mansa',
                    celular: '99999999999',
                    address: 'Rua Test Vitest',
                    city: 'Vistest', 
                    email, 
                    password: 'string908',
                })
            }
        ).rejects.toBeInstanceOf(OrgsAlreadyExistsError)
    })

    it('should not be able to register with same celular twice', async () => {
        const orgsRepository = new InMemoryOrgsRepository()
        const registerOrgsUseCase = new RegisterOrgsUseCase(orgsRepository) 

        const celular = '21999999999'

        await registerOrgsUseCase.execute({
            title: 'Fala Mansa',
            celular,
            address: 'Rua Test Vitest',
            city: 'Vistest', 
            email: 'string@test.com', 
            password: 'string908',
        })

        
        expect(
            async () => {
                await registerOrgsUseCase.execute({
                    title: 'Fala Mansa',
                    celular,
                    address: 'Rua Test Vitest',
                    city: 'Vistest', 
                    email: 'string@test.com', 
                    password: 'string908',
                })
            }
        ).rejects.toBeInstanceOf(OrgsAlreadyExistsError)
    })
})