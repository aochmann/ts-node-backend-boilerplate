import { injectable } from 'inversify';

interface IGreatingService {
  sayHello: () => void;
}

@injectable()
class GreatingService implements IGreatingService {
  public sayHello = () => {
    console.log('Hello World');
  }
}

export { IGreatingService, GreatingService };
