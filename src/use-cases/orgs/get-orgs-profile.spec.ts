import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { GetOrgProfileUseCase } from "./get-orgs-profile"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"


let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get Org Profile Use Case', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new GetOrgProfileUseCase(orgsRepository) 
    })

    it('should be able to get org profile', async () => {
        
        const createdOrg = await orgsRepository.create({
            title: 'Fala Mansa',
            celular: '99999999999',
            address: 'Rua Test Vitest',
            city: 'Vistest', 
            email: 'string@test.com', 
            password: 'string908',
        })

        const { org } = await sut.execute({
            id: createdOrg.id
        })

        expect(org.id).toEqual(expect.any(String))
        expect(org.title).toEqual('Fala Mansa')
    })

    it('should not be able to get org profile with wrong id', async () => {
        expect(
            async () => {
                await sut.execute({
                    id: 'non-existing-id',
                })
            }
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})