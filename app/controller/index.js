import { isMobile, isIos } from './../utils';
import get from 'lodash/get';

const { Controller } = require('beidou');

class IndexController extends Controller {
 
  async main() {
    const { ctx, ctx: { app: { config: { api }, env } } } = this;
    await ctx.render('pages/index/index.tsx', { env, ...api });
  }
}

module.exports = IndexController;
