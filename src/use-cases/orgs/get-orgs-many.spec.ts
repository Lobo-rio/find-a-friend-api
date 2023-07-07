import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { GetOrgProfileUseCase } from "./get-orgs-profile"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { GetOrgsManyUseCase } from "./get-orgs-many"


let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgsManyUseCase

describe('Get Org Many Use Case', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new GetOrgsManyUseCase(orgsRepository) 
    })

    it('should be able to get org many', async () => {
        await orgsRepository.create({
            title: 'Fala Mansa',
            celular: '99999999999',
            address: 'Rua Test Vitest',
            city: 'Vistest', 
            email: 'string@test.com', 
            password: 'string908',
        })

        const { orgs } = await sut.execute()

        expect(orgs.length).toBe(1)
    })
})