import { app } from '@/app'
import loginOrgController from './login-org-controller'
import createOrgController from './create-org-controller'
import openOrgController from './open-org-controller'
import findNearbyOrgsController from './find-nearby-org-controller'
import verifyJwt from '@/http/middlewares/verify-jwt'

export default function orgRoutes() {
  // All routes must be authenticated
  app.post('/org', createOrgController)
  app.get('/org/:id', openOrgController)
  app.post('/org/nearby', findNearbyOrgsController)
  app.post('/org/login', loginOrgController)
}
