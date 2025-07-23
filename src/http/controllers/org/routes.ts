import { app } from '@/app'
import loginOrgController from './login-org-controller'
import createOrgController from './create-org-controller'
import openOrgController from './open-org-controller'
import findNearbyOrgsController from './find-nearby-org-controller'

export default function orgRoutes() {
  app.post('/org', createOrgController)
  app.get('/org/:id', openOrgController)
  app.post('/org/nearby', findNearbyOrgsController)
  app.post('/org/login', loginOrgController)
}
