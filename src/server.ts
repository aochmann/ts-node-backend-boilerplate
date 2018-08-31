import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as helmet from 'helmet';

dotenv.config();

import 'reflect-metadata';

import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { buildProviderModule } from 'inversify-binding-decorators';
import { makeLoggerMiddleware } from 'inversify-logger-middleware';
import './controllers';
import { AppModule } from './modules';

class Server {
  private container: Container;
  private server: InversifyExpressServer;

  constructor() {
    this.container = new Container();
    this.server = new InversifyExpressServer(this.container, null, { rootPath: '/api' });
  }

  public config = (): Server => {
    this.server = this.server.setConfig(app => {
      app.use(cors());
      app.use(
        bodyParser.urlencoded({
          extended: true
        })
      );
      app.use(bodyParser.json());
      app.use(morgan('combined'));
      app.use(helmet());

      if (process.env.NODE_ENV === 'development') {
        const logger = makeLoggerMiddleware();
        this.container.applyMiddleware(logger);
    }

    });

    return this;
  };

  public build = (): Server => {
    this.container.load(buildProviderModule());
    AppModule.load(this.container);
    return this;
  };

  public run = () => this.server.build().listen(3000, () => {
    console.log(' Server is running');
    console.log(' Press CTRL-C to stop\n');
  });
}

export { Server };
