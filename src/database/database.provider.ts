/* eslint-disable */

import { DataSource } from "typeorm";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { PdmTables } from "../Entities/pdmTables.entity";

export const databaseProviders = [
  {
    provide: "DATA_SOURCE",
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "1234",
        database: "BDM-rest",
        entities: ["dist/**/*.entity{.ts,.js}"],
        migrations: [],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];

// export const databaseSource = new DataSource({
//         type: 'postgres',
//         host: 'localhost',
//         port: 5432,
//         username: 'postgres',
//         password: '1234',
//         database: 'BDM',
//         entities: [ 'dist/**/*.entity{.ts,.js}']
// })

export const PhysicalDataModel: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "PDM-rest",
  entities: [PdmTables],
  synchronize: true,
};
