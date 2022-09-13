/* eslint-disable */

import { DataSource } from 'typeorm';
import { ReferenceAttributes } from '../Entities/referenceAttribute.entity';
import { ReferenceMaster } from '../Entities/master.entity';
import { Attribute, AttributeGroup } from '../Entities/attribute.entity';
import {
  TextValidation,
  BooleanValidation,
  NumericValidation,
  DateValidation,
  TimeValidation,
  RangeValidation,
  SingleSelectionValidation,
  MultipleSelectionValidation,
  DropdownValidation,
  UrlValidation,
} from 'src/Entities/validation.entity';

// import { CategoryAssignment } from 'src/Entities/categoryAssignment.entity';
// import { ProductAssignment } from 'src/Entities/productAssignment.entity';
// import { ProductComboAssignment } from 'src/Entities/productComboAssignment.entity';
// import { TextValidation, NumericValidation, DateValidation, TimeValidation , PasswordValidation, RangeValidation, SingleSelectionValidation, MultipleSelectionValidation, DropdownValidation, UrlValidation } from 'src/Entities/validation.entity';
// import { Rule } from '../Entities/rules.entity';

export const validationProviders = [
  {
    provide: 'TEXT_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TextValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'NUMERIC_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(NumericValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'DATE_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DateValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TIME_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TimeValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'RANGE_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RangeValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'BOOLEAN_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(BooleanValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SINGLESELECT_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SingleSelectionValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'MULTISELECT_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MultipleSelectionValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'DROPDOWN_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DropdownValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'URL_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UrlValidation),
    inject: ['DATA_SOURCE'],
  },
];
