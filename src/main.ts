/* eslint-disable */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

async function bootstrapGrpc() {
  const URL = 'localhost:50051';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: URL,
        package: 'BusinessDataModel',
        protoPath: path.resolve(__dirname, '../src/protos/rpc.proto'),
        loader:{keepCase: true},
      },
    },
  );
  await app.listen();
}

bootstrapGrpc();
