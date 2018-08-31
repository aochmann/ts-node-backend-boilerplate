import { Server } from './server';

class App {
  public start = () => new Server().build().run();
}

export default new App().start();