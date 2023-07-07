import { compare, hash } from "bcryptjs"
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { AuthenticateUseCase } from "./authenticate"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error"

describe('Authenticate Orgs Use Case', () => {
    it('should be able to authenticate org', async () => {
        const orgsRepository = new InMemoryOrgsRepository()
        const sut = new AuthenticateUseCase(orgsRepository) 

        await orgsRepository.create({
            title: 'Fala Mansa',
            celular: '21989859896',
            address: 'Rua Test Vitest',
            city: 'Vistest', 
            email: 'string@test.com', 
            password: await hash('string908', 8),
        })
        
        const { org } = await sut.execute({
            email: 'string@test.com', 
            password: 'string908',
        })

        expect(org.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate org with wrong email', async () => {
        const orgsRepository = new InMemoryOrgsRepository()
        const sut = new AuthenticateUseCase(orgsRepository) 

       expect(
        async () => {
            await sut.execute({
                email: 'stringg@test.com', 
                password: 'string908',
            })
        }
       ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate org with wrong password', async () => {
        const orgsRepository = new InMemoryOrgsRepository()
        const sut = new AuthenticateUseCase(orgsRepository) 

        await orgsRepository.create({
            title: 'Fala Mansa',
            celular: '21989859896',
            address: 'Rua Test Vitest',
            city: 'Vistest', 
            email: 'string@test.com', 
            password: await hash('string908', 8),
        })

        expect(
            async () => {
                await sut.execute({
                    email: 'stringg@test.com', 
                    password: '12345678',
                })
            }
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

})