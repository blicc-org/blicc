import Koa from 'koa';

export class DataSupplyController {
  public constructor() {}

  /**
   * @swagger
   *
   * /:
   *   get:
   *     description: Inform
   *     produces:
   *       - text/html
   *     responses:
   *       200:
   *         description: success
   */
  public async inform(ctx: Koa.BaseContext, next: Function): Promise<void> {
    next();
    ctx.body = 'API to supply data';
  }

  /**
   * @swagger
   *
   * /:
   *   post:
   *     description: Supply
   *     produces:
   *       - text/html
   *     responses:
   *       200:
   *         description: success
   */
  public async supply(ctx: Koa.BaseContext, next: Function): Promise<void> {
    next();
    ctx.body = {};
  }
}
