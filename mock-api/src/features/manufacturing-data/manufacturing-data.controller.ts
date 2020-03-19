import Koa from 'koa'
import { randomDate, randomNumber, calcOEE } from '../../utils/utils'

export class ManufacturingDataController {
  public async mock(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    let date, availability, performance, quality, oee

    var arr = []
    var len = 10
    for (var i = 0; i < len; i++) {
      date = randomDate(new Date(2018, 0, 1), new Date())
      availability = randomNumber(0, 100)
      performance = randomNumber(0, 100)
      quality = randomNumber(0, 100)
      oee = calcOEE(availability, performance, quality)

      arr.push({
        id: i + 1,
        date,
        availability,
        performance,
        quality,
        oee,
      })
    }

    ctx.body = arr
    ctx.status = 200
  }
}
