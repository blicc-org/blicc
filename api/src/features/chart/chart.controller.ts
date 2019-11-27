import Koa from 'koa'
import status from 'http-status-codes'

export class ChartController {
  public async get(ctx: Koa.DefaultContext, next: Function): Promise<void> {
    await next()
    ctx.set('Content-Type', 'text/javascript')
    ctx.body = `
    (this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[2,5],{103:function(t,n,e){"use strict";e.r(n),e.d(n,"PieChart",(function(){return u}));var r=e(0),i=e.n(r);function u(){return i.a.createElement("div",null,"Hello Pie Chart")}},39:function(t,n,e){"use strict";e.r(n);var r=e(103);e.d(n,"default",(function(){return r.PieChart}))}}]);
    `
    ctx.status = status.OK
  }
}
