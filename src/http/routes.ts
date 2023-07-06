import { FastifyInstance } from "fastify"
import { RegisterOrgs } from "./controllers/register-orgs"

export async function appRoutes(app: FastifyInstance) {
    app.post('/orgs', RegisterOrgs)
}