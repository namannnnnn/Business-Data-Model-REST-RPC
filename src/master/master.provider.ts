/* eslint-disable */

import { DataSource } from "typeorm";
import { Master, ReferenceMaster } from "../entities/master.entity";

export const masterProviders = [
  {
    provide: "MASTER_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Master),
    inject: ["DATA_SOURCE"],
  },
  {
    provide: "MASTER_REFERENCE_REPOSITORY",
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ReferenceMaster),
    inject: ["DATA_SOURCE"],
  },
];
