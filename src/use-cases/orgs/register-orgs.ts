import { hash } from "bcryptjs"
import { OrgsRepository } from "@/repositories/abstract/orgs-repository"

interface RegisterOrgsUseCaseRequest {
    title: string 
    celular: string
    address: string 
    city: string 
    email: string 
    password: string
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
    ) {
        const passwordHash = await hash(password, 8)
    
        const orgsEmailExisted = await this.orgsRepository.findByEmail(email)
    
        if (orgsEmailExisted) throw new Error('E-mail elready exists!')
    
        const orgsCelularExisted = await this.orgsRepository.findByCelular(celular)
    
        if (orgsCelularExisted) throw new Error('Celular elready exists!')
    
        const org = await this.orgsRepository.create({
            title,
            celular,
            address,
            city,
            email,
            password: passwordHash,
        })

        return org
    }
}
