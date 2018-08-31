import { Container } from 'inversify';
import { IGreatingService, GreatingService } from '../services/greatingServices';
import { ServiceTypes } from '../types/type';

export class AppModule {
  public static load(container: Container) {
    container.bind<IGreatingService>(ServiceTypes.IGreating).to(GreatingService);
  }
}