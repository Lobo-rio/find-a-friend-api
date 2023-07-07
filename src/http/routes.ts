import { FastifyInstance } from "fastify"
import { RegisterOrgs } from "./controllers/register-orgs"
import { AuthenticateOrgs } from "./controllers/authenticate"

export async function appRoutes(app: FastifyInstance) {
    app.post('/orgs', RegisterOrgs)
    app.post('/sessions', AuthenticateOrgs)
}