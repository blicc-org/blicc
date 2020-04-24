import { Middleware } from 'koa'
import createRouter, { Router } from 'koa-joi-router'
import { HealthCheckController } from './health-check.controller'
import { AuthMiddleware, PermissionMiddleware } from '../../common/middleware'

export class HealthCheckRouter {
  private prefix: string
  private router: Router
  private controller: HealthCheckController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = createRouter()
    this.controller = new HealthCheckController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)

    /**
     * @swagger
     *
     * /health-check:
     *   get:
     *     tags:
     *       - Health Check
     *     summary: Health Check
     *     description: Check if backend service is healthy
     *     responses:
     *       200:
     *         description: Ok
     *       500:
     *         description: Internal Server Error
     *       503:
     *         description: Service Unavailable
     */
    this.router.route({
      method: 'get',
      path: '/',
      handler: this.controller.healthCheck.bind(this.controller),
    })

    /**
     * @swagger
     *
     * /health-check/auth:
     *   get:
     *     security:
     *       - cookieAuth: []
     *     tags:
     *       - Health Check
     *     summary: Health Check Auth
     *     securitySchemes:
     *       bearerAuth:
     *         type: http
     *         scheme: bearer
     *         bearerFormat: JWT
     *     description: Check if user authentication is healthy
     *     responses:
     *       204:
     *         description: No content
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    this.router.route({
      method: 'get',
      path: '/auth',
      pre: [
        AuthMiddleware.handle,
        PermissionMiddleware.handle.bind(null, ['user', 'developer', 'admin']),
      ],
      handler: this.controller.healthCheckAuth.bind(this.controller),
    })

    return this.router.middleware()
  }
}
