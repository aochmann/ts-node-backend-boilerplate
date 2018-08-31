import { controller, httpGet, BaseHttpController } from 'inversify-express-utils';

@controller('/ping')
export class PingController extends BaseHttpController {
  @httpGet('')
  public async ping() {
    return this.ok('pong');
  }
}
