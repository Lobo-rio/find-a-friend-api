import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { DeleteOrgsUseCase } from "./delete-orgs"


let orgsRepository: InMemoryOrgsRepository
let sut: DeleteOrgsUseCase

describe('Delete Org Use Case', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new DeleteOrgsUseCase(orgsRepository) 
    })

    it('should be able to delete org', async () => {
        const orgCreate = await orgsRepository.create({
            title: 'Fala Mansa',
            celular: '99999999999',
            address: 'Rua Test Vitest',
            city: 'Vistest', 
            email: 'string@test.com', 
            password: 'string908',
        })

        await sut.execute(
            orgCreate.id
        )

        expect(orgsRepository.items.length).toEqual(0)
    })
})