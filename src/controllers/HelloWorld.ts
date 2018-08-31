import { controller, httpGet, BaseHttpController } from 'inversify-express-utils';
import { inject } from 'inversify';
import { ServiceTypes } from '../types/type';
import { IGreatingService } from '../services/greatingServices';

@controller('/hello-world')
export class HelloWorld extends BaseHttpController {
  private readonly _greatingService: IGreatingService;

  constructor(@inject(ServiceTypes.IGreating) greatingService: IGreatingService) {
    super();
    this._greatingService = greatingService;
  }

  @httpGet('')
  public async greating() {
    this._greatingService.sayHello();
    return this.ok({});
  }
}