import { DefaultContext, Next } from 'koa'
import { randomNumber, calcOEE } from '../../utils/utils'

export class ManufacturingDataController {
  public async mock(ctx: DefaultContext, next: Next): Promise<void> {
    await next()
    let shift, date, availability, performance, quality, oee

    var arr = []
    var len = 120
    for (var i = 0; i < len; i++) {
      shift = (i % 3) + 1
      if (i % 3 === 0) date = new Date(2020, 0, i / 3 + 1)
      availability = randomNumber(50, 60)
      performance = randomNumber(30, 40)
      quality = randomNumber(20, 100)
      oee = calcOEE(availability, performance, quality)

      arr.push({
        id: i + 1,
        date,
        shift,
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
