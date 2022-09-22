/* eslint-disable */

import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PdmTables } from '../Entities/pdmTables.entity';
import * as dotenv from 'dotenv'
dotenv.config()

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.HOST_BDM,
        port: parseInt(process.env.PORT_BDM),
        username: String(process.env.USERNAME_BDM),
        password: String(process.env.PASSWORD_BDM),
        database: process.env.DB_BDM,
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: [],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];

export const PhysicalDataModel: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST_PDM,
  port: parseInt(process.env.PORT_PDM),
  username: String(process.env.USERNAME_PDM),
  password: String(process.env.PASSWORD_PDM),
  database: process.env.DB_PDM,
  entities: [PdmTables],
  synchronize: true,
};
