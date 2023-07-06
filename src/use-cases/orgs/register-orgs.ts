import { hash } from "bcryptjs"
import { OrgsRepository } from "@/repositories/abstract/orgs-repository"
import { OrgsAlreadyExistsError } from "../errors/orgs-already-exists-error"
import { Org } from "@prisma/client"

interface RegisterOrgsUseCaseRequest {
    title: string 
    celular: string
    address: string 
    city: string 
    email: string 
    password: string
}

interface RegisterOrgsUseCaseResponse {
    org: Org
}

export class RegisterOrgsUseCase {
    constructor(
        private readonly orgsRepository: OrgsRepository,
    ) {}

    async execute(
        {
            title,
            celular,
            address,
            city,
            email,
            password,
        }: RegisterOrgsUseCaseRequest
    ): Promise<RegisterOrgsUseCaseResponse> {
        const passwordHash = await hash(password, 8)
    
        const orgsEmailExisted = await this.orgsRepository.findByEmail(email)
    
        if (orgsEmailExisted) throw new OrgsAlreadyExistsError()
    
        const orgsCelularExisted = await this.orgsRepository.findByCelular(celular)
    
        if (orgsCelularExisted) throw new OrgsAlreadyExistsError()
    
        const org = await this.orgsRepository.create({
            title,
            celular,
            address,
            city,
            email,
            password: passwordHash,
        })

        return {
            org,
        }
    }
}
