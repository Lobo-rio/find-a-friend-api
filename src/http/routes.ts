import { FastifyInstance } from "fastify"
import { RegisterOrgs } from "./controllers/register-orgs"
import { AuthenticateOrgs } from "./controllers/authenticate"
import { GetOrgProfile } from "./controllers/get-org-profile"

export async function appRoutes(app: FastifyInstance) {
    app.get('/org-profile/:id', GetOrgProfile)
    app.post('/orgs', RegisterOrgs)
    app.post('/sessions', AuthenticateOrgs)
}