/* eslint-disable */

import { DataSource } from "typeorm";
import { ReferenceAttributes } from "../entities/referenceAttribute.entity";
import { ReferenceMaster } from "../entities/master.entity";
import { Attribute, AttributeGroup } from "../entities/attribute.entity";
// import { CategoryAssignment } from 'src/Entities/categoryAssignment.entity';
// import { ProductAssignment } from 'src/Entities/productAssignment.entity';
// import { ProductComboAssignment } from 'src/Entities/productComboAssignment.entity';
// import { TextValidation, NumericValidation, DateValidation, TimeValidation , PasswordValidation, RangeValidation, SingleSelectionValidation, MultipleSelectionValidation, DropdownValidation, UrlValidation } from 'src/Entities/validation.entity';
// import { Rule } from '../Entities/rules.entity';

export const attributeProviders = [
  {
    provide: "ATTRIBUTE_REFERENCE_REPOSITORY",
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ReferenceAttributes),
    inject: ["DATA_SOURCE"],
  },
  {
    provide: "MASTER_REFERENCE_REPOSITORY",
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ReferenceMaster),
    inject: ["DATA_SOURCE"],
  },
  {
    provide: "ATTRIBUTEGROUP_REPOSITORY",
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AttributeGroup),
    inject: ["DATA_SOURCE"],
  },
  {
    provide: "ATTRIBUTE_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Attribute),
    inject: ["DATA_SOURCE"],
  },
];
