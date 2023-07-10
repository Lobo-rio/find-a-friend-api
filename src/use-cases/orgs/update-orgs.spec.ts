import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { UpdateOrgsUseCase } from "./update-orgs"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"


let orgsRepository: InMemoryOrgsRepository
let sut: UpdateOrgsUseCase

describe('Update Org Use Case', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new UpdateOrgsUseCase(orgsRepository) 
    })

    it('should be able to update org', async () => {
        const orgCreate = await orgsRepository.create({
            title: 'Fala Mansa',
            celular: '99999999999',
            address: 'Rua Test Vitest',
            city: 'Vistest', 
            email: 'string@test.com', 
            password: 'string908',
        })

        const { org } = await sut.execute(
            orgCreate.id,
            {
                title: 'Fala Mansa - Five',
                celular: '99999999900',
                address: 'Rua Test Vitest - fastify',
                city: 'Vistest - fastify', 
                email: 'vistest@test.com',
            }
        )

        expect(org.title).toEqual('Fala Mansa - Five')
        expect(org.city).toEqual('Vistest - fastify')
    })

    it('should not be able to update org with wrong id', async () => {
        expect(
            async () => {
                await sut.execute(
                    'non-existing-id',
                    {
                        title: 'Fala Mansa - Five',
                        celular: '99999999900',
                        address: 'Rua Test Vitest - fastify',
                        city: 'Vistest - fastify', 
                        email: 'vistest@test.com',
                    }
                )
            }
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

})