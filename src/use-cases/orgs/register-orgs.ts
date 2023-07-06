import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterOrgsUseCaseRequest {
    title: string 
    celular: string
    address: string 
    city: string 
    email: string 
    password: string
}

export async function RegisterOrgsUseCase(
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

    const orgsEmailExisted = await prisma.org.findUnique({
        where: {
            email,
        }
    })

    if (orgsEmailExisted) throw new Error('E-mail elready exists!')

    const orgsCelularExisted = await prisma.org.findUnique({
        where: {
            celular,
        }
    })

    if (orgsCelularExisted) throw new Error('Celular elready exists!')

    await prisma.org.create({
        data: {
            title, 
            celular, 
            address, 
            city, 
            email, 
            password: passwordHash
        }
    })
}