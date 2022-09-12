/* eslint-disable */

import { DataSource } from "typeorm";
import { ReferenceAttributes } from "../entities/referenceAttribute.entity";
import { ReferenceMaster } from "../entities/master.entity";
import { Attribute, AttributeGroup } from "../entities/attribute.entity";
import { CategoryAssignment } from "src/entities/categoryAssignment.entity";
import { Category } from "../entities/category.entity";
import { CategoryGroupAssignment } from "src/entities/categoryGroupAssignment.entity";
// import { ProductAssignment } from 'src/Entities/productAssignment.entity';
// import { ProductComboAssignment } from 'src/Entities/productComboAssignment.entity';
// import { TextValidation, NumericValidation, DateValidation, TimeValidation , PasswordValidation, RangeValidation, SingleSelectionValidation, MultipleSelectionValidation, DropdownValidation, UrlValidation } from 'src/Entities/validation.entity';
// import { Rule } from '../Entities/rules.entity';

export const categoryProviders = [
  {
    provide: "CATEGORY_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: ["DATA_SOURCE"],
  },

  {
    provide: "CATEGORY_ASSIGNMENT_REPOSITORY",
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CategoryAssignment),
    inject: ["DATA_SOURCE"],
  },

  {
    provide: "CATEGORY_GROUP_ASSIGNMENT_REPOSITORY",
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CategoryGroupAssignment),
    inject: ["DATA_SOURCE"],
  },
];

// {
//     provide: 'PRODUCT_REPOSITORY',
//     useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
//     inject: ['DATA_SOURCE']
// },

// {
//     provide :'PRODUCT_COMBO_REPOSITORY',
//     useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductCombo),
//     inject : [ 'DATA_SOURCE']
// },

// {
//     provide :'PRODUCT_GROUP_ASSIGNMENT_REPOSITORY',
//     useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductGroupAssignment),
//     inject : [ 'DATA_SOURCE']
// },
