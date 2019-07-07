import Router from 'koa-router';
import { DataSupplyController } from './data-supply.controller';

export class DataSupplyRouter {
  private router: Router;
  private controller: DataSupplyController;

  public constructor(prefix: string) {
    this.router = new Router({ prefix });
    this.controller = new DataSupplyController();
  }

  public getRoutes(): Router.IMiddleware {
    this.router.get('/', this.controller.inform.bind(this.controller));
    this.router.post('/', this.controller.supply.bind(this.controller));
    return this.router.routes();
  }
}
