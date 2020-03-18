import Router, { IMiddleware as Middleware } from 'koa-router'
import { WeatherController } from './weather.controller'

export class WeatherRouter {
  private prefix: string
  private router: Router
  private controller: WeatherController

  public constructor(prefix: string) {
    this.prefix = prefix
    this.router = new Router()
    this.controller = new WeatherController()
  }

  public routes(): Middleware {
    this.router.prefix(this.prefix)

    /**
     * @swagger
     *
     * /weather:
     *   get:
     *     tags:
     *       - Weather
     *     summary: Weather mock
     *     description: Request a data object which gives you mock data for the current weather
     *     responses:
     *       200:
     *         description: OK
     *       500:
     *         description: Internal Server Error
     */
    this.router.get('/', this.controller.mock.bind(this.controller))

    return this.router.routes()
  }
}
