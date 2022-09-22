/* eslint-disable */

import { Injectable, Inject } from '@nestjs/common';
import {
  Repository,
  QueryRunner,
  Table,
  DataSource,
  In,
  getManager,
} from 'typeorm';
import {
  dateVldn,
  boolVldn,
  rangeVldn,
  singleSelectVldn,
  textVldn,
  numericVldn,
  timeVldn,
  multipleSelectionVldn,
  dropDownVldn,
  urlVldn,
  dateVldnById,
  boolVldnById,
  rangeVldnById,
  singleSelectVldnById,
  textVldnById,
  numericVldnById,
  timeVldnById,
  multipleSelectionVldnById,
  dropDownVldnById,
  urlVldnById,
  
} from 'src/dtos/validation.dto';

import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ReferenceAttributes } from '../Entities/referenceAttribute.entity';
import {
  TextValidation,
  NumericValidation,
  BooleanValidation,
  DateValidation,
  TimeValidation,
  RangeValidation,
  SingleSelectionValidation,
  MultipleSelectionValidation,
  DropdownValidation,
  UrlValidation,
} from 'src/Entities/validation.entity';
// import { Rule } from '../iterfaces/rules.interface'
// import { AttributeGroup } from 'src/Entities/attributeGroup.entity'
import { ReferenceMaster } from 'src/Entities/master.entity';
import { refAttrByIdDto, refAttrDto } from 'src/dtos/referenceAttribute.dto';
import {
  attrDto,
  attrByIdDto,
  attrByIdResDto,
  attrGroupById,
  attrGroupReqDto,
  attrGroupResDto,
  assignAttr,
} from '../dtos/attribute.dto';
import { Attribute, AttributeGroup } from '../Entities/attribute.entity';

var validationFound;
var val;

@Injectable()
export class ValidationService {
  constructor(
    @Inject('ATTRIBUTE_REPOSITORY')
    private attributeRepository: Repository<Attribute>,

    @Inject('TEXT_VALIDATION_REPOSITORY')
    private textValidationRepository: Repository<TextValidation>,

    @Inject('NUMERIC_VALIDATION_REPOSITORY')
    private numericValidationRepository: Repository<NumericValidation>,

    @Inject('DATE_VALIDATION_REPOSITORY')
    private dateValidationRepository: Repository<DateValidation>,

    @Inject('BOOLEAN_VALIDATION_REPOSITORY')
    private boolValidationRepository: Repository<BooleanValidation>,

    @Inject('TIME_VALIDATION_REPOSITORY')
    private timeValidationRepository: Repository<TimeValidation>,

    @Inject('RANGE_VALIDATION_REPOSITORY')
    private rangeValidationRepository: Repository<RangeValidation>,

    @Inject('SINGLESELECT_VALIDATION_REPOSITORY')
    private singleSelectValidationRepository: Repository<SingleSelectionValidation>,

    @Inject('MULTISELECT_VALIDATION_REPOSITORY')
    private multiSelectValidationRepository: Repository<MultipleSelectionValidation>,

    @Inject('DROPDOWN_VALIDATION_REPOSITORY')
    private dropdownValidationRepository: Repository<DropdownValidation>,

    @Inject('URL_VALIDATION_REPOSITORY')
    private urlValidationRepository: Repository<UrlValidation>,
  ) {}

  async assignValidation(
    attributeType: string,
    validation: any,
    attributeId: number,
  ): Promise<any> {
    switch (attributeType) {
      // 1
      case 'textBox':
        if (validation) {
          validation.attributeId = attributeId;
          validation.tenantId = 1;
          await this.textValidationRepository.save(validation);
        } else {
          await this.textValidationRepository.save({
            tenantId: 1,
            type: 'varchar',
            minCharacters: 1,
            maxCharacters: 25,
            lowerCaseOnly: false,
            upperCaseOnly: false,
            allowNumbers: true,
            specialCharacters: true,
            spacingAllowed: true,
            attributeId: attributeId,
          });
        }
        break;

      //   2
      case 'textArea':
        if (validation) {
          validation.attributeId = attributeId;
          validation.tenantId = 1;
          await this.textValidationRepository.save(validation);
        } else {
          await this.textValidationRepository.save({
            tenantId: 1,
            type: 'varchar',
            minCharacters: 1,
            maxCharacters: 350,
            lowerCaseOnly: false,
            upperCaseOnly: false,
            allowNumbers: true,
            specialCharacters: true,
            spacingAllowed: true,
            attributeId: attributeId,
          });
        }
        break;

      // 3
      case 'numeric':
        if (validation) {
          validation.attributeId = attributeId;
          validation.tenantId = 1;
          await this.numericValidationRepository.save(validation);
        } else {
          await this.numericValidationRepository.save({
            tenantId: 1,
            type: 'int',
            allowDecimal: true,
            allowCommas: true,
            allowDots: true,
            allowSpaces: false,
            attributeId: attributeId,
            minValue: 1,
            maxValue: 2147483647,
          });
        }
        break;

      // 4
      case 'boolean':
        if (validation) {
          validation.tenantId = 1;
          validation.attributeId = attributeId;
          validation.type = 'boolean';
          await this.boolValidationRepository.save(validation);
        } else {
          let tenantId = 1;
          await this.boolValidationRepository.save({
            "tenantId": tenantId,
            "attributeId": attributeId,
            "type": 'boolean',
          })
        }

        break;

      // 5
      case 'singleSelect':
        if (validation) {
          validation.tenantId = 1;
          validation.attributeId = attributeId;
          await this.singleSelectValidationRepository.save(validation);
        } else {
          await this.singleSelectValidationRepository.save({
            tenantId: 1,
            type: 'varchar',
            default: null,
            attribtuteId: attributeId,
          });
        }
        break;

      // 6
      case 'multiSelect':
        if (validation) {
          validation.tenantId = 1;
          validation.attributeId = attributeId;
          await this.multiSelectValidationRepository.save(validation);
        } else {
          await this.multiSelectValidationRepository.save({
            tenantId: 1,
            type: 'varchar',
            default: null,
            minEssentialSelection: 1,
            maxSelectionAllowed: null,
            attributeId: attributeId,
          });
        }
        break;

      // 7
      case 'richText':
        if (validation) {
          validation.attributeId = attributeId;
          validation.tenantId = 1;
          await this.textValidationRepository.save(validation);
        } else {
          await this.textValidationRepository.save({
            tenantId: 1,
            type: 'varchar',
            minCharacters: 1,
            maxCharacters: 350,
            lowerCaseOnly: false,
            upperCaseOnly: false,
            allowNumbers: true,
            specialCharacters: true,
            spacingAllowed: true,
            attributeId: attributeId,
          });
        }
        break;

      // 8
      case 'date':
        if (validation) {
          validation.attributeId = attributeId;
          validation.tenantId = 1;
          await this.dateValidationRepository.save(validation);
        } else {
          await this.dateValidationRepository.save({
            tenantId: 1,
            type: 'date',
            format: 'DD:MM:YYYY',
            minDate: null,
            maxDate: null,
            attributeId: attributeId,
          });
        }
        break;

      // 9
      case 'time':
        if (validation) {
          validation.attributeId = attributeId;
          validation.tenantId = 1;
          await this.timeValidationRepository.save(validation);
        } else {
          await this.timeValidationRepository.save({
            tenantId: 1,
            type: 'time',
            format: 'DD:MM:YYYY',
            minTime: null,
            maxTime: null,
            attributeId: attributeId,
          });
        }
        break;

      // 10
      case 'dropdown':
        if (validation) {
          validation.attributeId = attributeId;
          validation.tenantId = 1;
          await this.dropdownValidationRepository.save(validation);
        } else {
          await this.dropdownValidationRepository.save({
            tenantId: 1,
            type: 'varchar',
            default: null,
            limitViewSelections: 5,
          });
        }
        break;

      // 11
      case 'url':
        if (validation) {
          validation.attributeId = attributeId;
          validation.tenantId = 1;
          await this.urlValidationRepository.save(validation);
        } else {
          await this.urlValidationRepository.save({
            tenantId: 1,
            type: 'varchar',
            emptyProtocol: true,
            protocol: false,
            format: null,
            attributeId: attributeId,
          });
        }
        break;

      // 16
      case 'numberSlider':
        if (validation) {
          validation.attributeId = attributeId;
          validation.tenantId = 1;
          await this.rangeValidationRepository.save(validation);
        } else {
          await this.rangeValidationRepository.save({
            tenantId: 1,
            type: 'int',
            inclusiveMin: false,
            inclusiveMax: false,
            minRange: 0,
            maxRange: 1000000,
            attributeId: attributeId,
          });
        }
        break;

      // 17
      case 'Range':
        if (validation) {
          validation.attributeId = attributeId;
          validation.tenantId = 1;
          await this.rangeValidationRepository.save(validation);
        } else {
          await this.rangeValidationRepository.save({
            tenantId: 1,
            type: 'int',
            inclusiveMin: false,
            inclusiveMax: false,
            minRange: 0,
            maxRange: 1000000,
            attributeId: attributeId,
          });
        }
        break;

        18;
      case 'imageFile':
        break;

      // 19
      case 'videoFile':
        break;

      // 20
      case 'documentFile':
        break;
    }
  }

  async assignValidationRpc(
    attributeType: string,
    dateVldn: dateVldn,
    rangeVldn: rangeVldn,
    singleSelectVldn: singleSelectVldn,
    textVldn: textVldn,
    numericVldn: numericVldn,
    timeVldn: timeVldn,
    multipleSelectionVldn: multipleSelectionVldn,
    dropDownVldn: dropDownVldn,
    urlVldn: urlVldn,
    attributeId: number,
  ): Promise<any> {
    switch (attributeType) {
      // 1
      case 'textBox':
        if (textVldn) {
          await this.textValidationRepository.save({
            tenantId: 1,
            type: textVldn.type,
            maxCharacters: textVldn.maxCharacters,
            minCharacters: textVldn.minCharacters,
            lowerCaseOnly: textVldn.lowerCaseOnly,
            upperCaseOnly: textVldn.upperCaseOnly,
            allowNumbers: textVldn.allowNumbers,
            specialCharacters: textVldn.specialCharacters,
            spacingAllowed: textVldn.spacingAllowed,
            attributeId: attributeId,
          });
        } else {
          await this.textValidationRepository.save({
            tenantId: 1,
            type: 'varchar',
            minCharacters: 1,
            maxCharacters: 25,
            lowerCaseOnly: false,
            upperCaseOnly: false,
            allowNumbers: true,
            specialCharacters: true,
            spacingAllowed: true,
            attributeId: attributeId,
          });
        }

        break;

      // 2
      case 'textArea':
        if (textVldn) {
          await this.textValidationRepository.save({
            tenantId: 1,
            type: textVldn.type,
            maxCharacters: textVldn.maxCharacters,
            minCharacters: textVldn.minCharacters,
            lowerCaseOnly: textVldn.lowerCaseOnly,
            upperCaseOnly: textVldn.upperCaseOnly,
            allowNumbers: textVldn.allowNumbers,
            specialCharacters: textVldn.specialCharacters,
            spacingAllowed: textVldn.spacingAllowed,
            attributeId: attributeId,
          });
        } else {
          await this.textValidationRepository.save({
            tenantId: 1,
            type: 'varchar',
            minCharacters: 1,
            maxCharacters: 350,
            lowerCaseOnly: false,
            upperCaseOnly: false,
            allowNumbers: true,
            specialCharacters: true,
            spacingAllowed: true,
            attributeId: attributeId,
          });
        }
        break;

      // 3
      case 'numeric':
        if (numericVldn) {
          await this.numericValidationRepository.save({
            tenantId: 1,
            type: numericVldn.type,
            allowDecimal: numericVldn.allowDecimal,
            allowCommas: numericVldn.allowCommas,
            allowDots: numericVldn.allowDots,
            allowSpaces: numericVldn.allowSpaces,
            minValue: numericVldn.minValue,
            maxValue: numericVldn.maxValue,
            attributeId: attributeId,
          });
        } else {
          await this.numericValidationRepository.save({
            tenantId: 1,
            type: 'int',
            allowDecimal: true,
            allowCommas: true,
            allowDots: true,
            allowSpaces: false,
            minValue: 1,
            maxValue: 2147483647,
            attributeId: attributeId,
          });
        }
        break;

      // 4
      case 'boolean':
        let tenantId = 1;

        if(boolVldn){
          await this.boolValidationRepository.save( {"tenantId": tenantId,
          "attributeId": attributeId,
          "type": 'boolean'});
        }else {
          await this.boolValidationRepository.save({
            "tenantId": tenantId,
            "attributeId": attributeId,
            "type": 'boolean',
          })
        }
        break;

      // 5
      case 'singleSelect':
        if (singleSelectVldn) {
          await this.singleSelectValidationRepository.save({
            tenantId: 1,
            type: singleSelectVldn.type,
            default: singleSelectVldn.default,
            attribtuteId: attributeId,
          });
        } else {
          await this.singleSelectValidationRepository.save({
            tenantId: 1,
            type: 'varchar',
            default: null,
            attribtuteId: attributeId,
          });
        }
        break;

      // 6
      case 'multiSelect':
        if (multipleSelectionVldn) {
          await this.multiSelectValidationRepository.save({
            tenantId: 1,
            type: multipleSelectionVldn.type,
            default: multipleSelectionVldn.default,
            minEssentialSelection: multipleSelectionVldn.minEssentialSelection,
            maxSelectionAllowed: multipleSelectionVldn.maxSelectionAllowed,
            attributeId: attributeId,
          });
        } else {
          await this.multiSelectValidationRepository.save({
            tenantId: 1,
            type: 'varchar',
            default: null,
            minEssentialSelection: 1,
            maxSelectionAllowed: null,
            attributeId: attributeId,
          });
        }
        break;

      // 7
      case 'richText':
        if (textVldn) {
          await this.textValidationRepository.save({
            tenantId: 1,
            type: textVldn.type,
            maxCharacters: textVldn.maxCharacters,
            minCharacters: textVldn.minCharacters,
            lowerCaseOnly: textVldn.lowerCaseOnly,
            upperCaseOnly: textVldn.upperCaseOnly,
            allowNumbers: textVldn.allowNumbers,
            specialCharacters: textVldn.specialCharacters,
            spacingAllowed: textVldn.spacingAllowed,
            attributeId: attributeId,
          });
        } else {
          await this.textValidationRepository.save({
            tenantId: 1,
            type: 'varchar',
            minCharacters: 1,
            maxCharacters: 350,
            lowerCaseOnly: false,
            upperCaseOnly: false,
            allowNumbers: true,
            specialCharacters: true,
            spacingAllowed: true,
            attributeId: attributeId,
          });
        }
        break;

      // 8
      case 'date':
        if (dateVldn) {
          await this.dateValidationRepository.save({
            tenantId: 1,
            type: dateVldn.type,
            format: dateVldn.format,
            minDate: dateVldn.minDate,
            maxDate: dateVldn.maxDate,
            attributeId: attributeId,
          });
        } else {
          await this.dateValidationRepository.save({
            tenantId: 1,
            type: 'date',
            format: 'DD:MM:YYYY',
            minDate: null,
            maxDate: null,
            attributeId: attributeId,
          });
        }
        break;

      // 9
      case 'time':
        if (timeVldn) {
          await this.timeValidationRepository.save({
            tenantId: 1,
            type: timeVldn.type,
            format: timeVldn.format,
            minTime: timeVldn.minTime,
            maxTime: timeVldn.maxTime,
            attributeId: attributeId,
          });
        } else {
          await this.timeValidationRepository.save({
            tenantId: 1,
            type: 'time',
            format: 'DD:MM:YYYY',
            minTime: null,
            maxTime: null,
            attributeId: attributeId,
          });
        }
        break;

      // 10
      case 'email':
        break;

      // 12
      case 'telephone':
        break;

      // 13
      case 'mobileNumber':
        break;

      // 14
      case 'dropdown':
        if (dropDownVldn) {
          await this.dropdownValidationRepository.save({
            tenantId: 1,
            type: dropDownVldn.type,
            default: dropDownVldn.default,
            limitViewSelections: dropDownVldn.limitViewSelections,
          });
        } else {
          await this.dropdownValidationRepository.save({
            tenantId: 1,
            type: 'varchar',
            default: null,
            limitViewSelections: 5,
          });
        }
        break;

      // 15
      case 'url':
        if (urlVldn) {
          await this.urlValidationRepository.save({
            tenantId: 1,
            type: urlVldn.type,
            emptyProtocol: urlVldn.emptyProtocol,
            protocol: urlVldn.emptyProtocol,
            format: urlVldn.format,
            attributeId: attributeId,
          });
        } else {
          await this.urlValidationRepository.save({
            tenantId: 1,
            type: 'varchar',
            emptyProtocol: true,
            protocol: false,
            format: null,
            attributeId: attributeId,
          });
        }
        break;

      // 16
      case 'numberSlider':
        if (rangeVldn) {
          await this.rangeValidationRepository.save({
            tenantId: 1,
            type: rangeVldn.type,
            inclusiveMin: rangeVldn.inclusiveMin,
            inclusiveMax: rangeVldn.inclusiveMax,
            minRange: rangeVldn.minRange,
            maxRange: rangeVldn.maxRange,
            attributeId: attributeId,
          });
        } else {
          await this.rangeValidationRepository.save({
            tenantId: 1,
            type: 'int',
            inclusiveMin: false,
            inclusiveMax: false,
            minRange: 0,
            maxRange: 1000000,
            attributeId: attributeId,
          });
        }
        break;

      // 17
      case 'Range':
        if (rangeVldn) {
          await this.rangeValidationRepository.save({
            tenantId: 1,
            type: rangeVldn.type,
            inclusiveMin: rangeVldn.inclusiveMin,
            inclusiveMax: rangeVldn.inclusiveMax,
            minRange: rangeVldn.minRange,
            maxRange: rangeVldn.maxRange,
            attributeId: attributeId,
          });
        } else {
          await this.rangeValidationRepository.save({
            tenantId: 1,
            type: 'int',
            inclusiveMin: false,
            inclusiveMax: false,
            minRange: 0,
            maxRange: 1000000,
            attributeId: attributeId,
          });
        }
        break;

      // 18
      case 'imageFile':
        break;

      // 19
      case 'videoFile':
        break;

      // 20
      case 'documentFile':
        break;
    }
  }

  async findValidation(attributeId: number): Promise<any> {
    const attributeTyp = await this.attributeRepository.find({
      select: { attributeType: true },
      where: { id: attributeId },
    });
    const attributeType = attributeTyp[0].attributeType;
    switch (attributeType) {
      // 1
      case 'textBox':
        validationFound = await this.textValidationRepository.find({
          where: { attributeId: attributeId },
        });
        return { textVldn : validationFound[0] }

        break;

      // 2
      case 'textArea':
        validationFound = await this.textValidationRepository.find({
          where: { attributeId: attributeId },
        });
        return { textVldn : validationFound[0] }
        break;

      // 3
      case 'numeric':
        validationFound = await this.numericValidationRepository.find({
          where: { attributeId: attributeId },
        });
        return { numericVldn : validationFound[0] }
        break;

      // 4
      case 'boolean':
        validationFound = await this.boolValidationRepository.find({
          where: { attributeId: attributeId },
        });
        return { boolVldn : validationFound[0] }
        break;

      // 5
      case 'singleSelect':
        validationFound = await this.singleSelectValidationRepository.find({
          where: { attributeId: attributeId },
        });
        return { singleSelectVldn : validationFound[0] }
        break;

      // 6
      case 'multiSelect':
        validationFound = await this.multiSelectValidationRepository.find({
          where: { attributeId: attributeId },
        });
        return { multipleSelectionVldn : validationFound[0] }

        break;

      // 7
      case 'richText':
        validationFound = await this.textValidationRepository.find({
          where: { attributeId: attributeId },
        });
        return { textVldn : validationFound[0] }
        break;

      // 8
      case 'date':
        validationFound = await this.dateValidationRepository.find({
          where: { attributeId: attributeId },
        });
        return { dateVldn : validationFound[0] }
        break;

      // 9
      case 'time':
        validationFound = await this.timeValidationRepository.find({
          where: { attributeId: attributeId },
        });
        return { timeVldn : validationFound[0] }
        break;

      // 10
      case 'email':
        break;

      // 11

      // 12
      case 'telephone':
        break;

      // 13
      case 'mobileNumber':
        break;

      // 14
      case 'dropdown':
        validationFound = await this.dropdownValidationRepository.find({
          where: { attributeId: attributeId },
        });
        return { dropDownVldn : validationFound[0] }
        break;

      // 15
      case 'url':
        validationFound = await this.urlValidationRepository.find({
          where: { attributeId: attributeId },
        });
        return { urlVldn : validationFound[0] }
        break;

      // 16
      case 'numberSlider':
        validationFound = await this.rangeValidationRepository.find({
          where: { attributeId: attributeId },
        });
        return { rangeVldn : validationFound[0] }
        break;

      // 17
      case 'Range':
        validationFound = await this.rangeValidationRepository.find({
          where: { attributeId: attributeId },
        });
        return { rangeVldn : validationFound[0] }
        break;

      // 18
      case 'imageFile':
        break;

      // 19
      case 'videoFile':
        break;

      // 20
      case 'documentFile':
        break;
    }
    return validationFound;
  }

  async findValidationPdm(attributeId: number): Promise<any> {
    const attributeTyp = await this.attributeRepository.find({
      select: { attributeType: true },
      where: { id: attributeId },
    });
    const attributeType = attributeTyp[0].attributeType;
    switch (attributeType) {
      // 1
      case 'textBox':
        validationFound = await this.textValidationRepository.find({
          where: { attributeId: attributeId },
        });

        break;

      // 2
      case 'textArea':
        validationFound = await this.textValidationRepository.find({
          where: { attributeId: attributeId },
        });

        break;

      // 3
      case 'numeric':
        validationFound = await this.numericValidationRepository.find({
          where: { attributeId: attributeId },
        });

        break;

      // 4
      case 'boolean':
        break;

      // 5
      case 'singleSelect':
        validationFound = await this.singleSelectValidationRepository.find({
          where: { attributeId: attributeId },
        });

        break;

      // 6
      case 'multiSelect':
        validationFound = await this.multiSelectValidationRepository.find({
          where: { attributeId: attributeId },
        });

        break;

      // 7
      case 'richText':
        validationFound = await this.textValidationRepository.find({
          where: { attributeId: attributeId },
        });

        break;

      // 8
      case 'date':
        validationFound = await this.dateValidationRepository.find({
          where: { attributeId: attributeId },
        });

        break;

      // 9
      case 'time':
        validationFound = await this.timeValidationRepository.find({
          where: { attributeId: attributeId },
        });

        break;

      // 10
      case 'email':
        break;

      // 11

      // 12
      case 'telephone':
        break;

      // 13
      case 'mobileNumber':
        break;

      // 14
      case 'dropdown':
        validationFound = await this.dropdownValidationRepository.find({
          where: { attributeId: attributeId },
        });

        break;

      // 15
      case 'url':
        validationFound = await this.urlValidationRepository.find({
          where: { attributeId: attributeId },
        });

        break;

      // 16
      case 'numberSlider':
        validationFound = await this.rangeValidationRepository.find({
          where: { attributeId: attributeId },
        });

        break;

      // 17
      case 'Range':
        validationFound = await this.rangeValidationRepository.find({
          where: { attributeId: attributeId },
        });

        break;

      // 18
      case 'imageFile':
        break;

      // 19
      case 'videoFile':
        break;

      // 20
      case 'documentFile':
        break;
    }
    return validationFound;
  }

  async updateValidation(validation: any): Promise<any> {
    const attributTyp = await this.attributeRepository.find({
      select: { attributeType: true },
      where: { id: validation.attributeId },
    });
    const attributeType = attributTyp[0].attributeType;
    switch (attributeType) {
      // 1
      case 'textBox':
        await this.textValidationRepository.update(
          { id: validation.id },
          { ...validation },
        );
        validationFound = await this.textValidationRepository.find({
          where: { id: validation.id },
        });
        break;

      // 2
      case 'textArea':
        await this.textValidationRepository.update(
          { id: validation.id },
          { ...validation },
        );
        validationFound = await this.textValidationRepository.find({
          where: { id: validation.id },
        });

        break;

      // 3
      case 'numeric':
        await this.numericValidationRepository.update(
          { id: validation.id },
          { ...validation },
        );
        validationFound = await this.textValidationRepository.find({
          where: { id: validation.id },
        });

        break;

      // 4
      case 'boolean':
        await this.boolValidationRepository.update(
          { id: validation.id },
          { ...validation },
        );
        validationFound = await this.boolValidationRepository.find({
          where: { id: validation.id },
        });
        break;

      // 5
      case 'singleSelect':
        await this.singleSelectValidationRepository.update(
          { id: validation.id },
          { ...validation },
        );
        validationFound = await this.singleSelectValidationRepository.find({
          where: { id: validation.id },
        });

        break;

      // 6
      case 'multiSelect':
        await this.multiSelectValidationRepository.update(
          { id: validation.id },
          { ...validation },
        );
        validationFound = await this.multiSelectValidationRepository.find({
          where: { id: validation.id },
        });
        break;

      // 7
      case 'richText':
        await this.textValidationRepository.update(
          { id: validation.id },
          { ...validation },
        );
        validationFound = await this.textValidationRepository.find({
          where: { id: validation.id },
        });

        break;

      // 8
      case 'date':
        await this.dateValidationRepository.update(
          { id: validation.id },
          { ...validation },
        );
        validationFound = await this.dateValidationRepository.find({
          where: { id: validation.id },
        });
        break;

      // 9
      case 'time':
        await this.timeValidationRepository.update(
          { id: validation.id },
          { ...validation },
        );
        validationFound = await this.timeValidationRepository.find({
          where: { id: validation },
        });
        break;

      // 10
      case 'email':
        break;

      // 11

      // 12
      case 'telephone':
        break;

      // 13
      case 'mobileNumber':
        break;

      // 14
      case 'dropdown':
        await this.dropdownValidationRepository.update(
          { id: validation.id },
          { ...validation },
        );
        validationFound = await this.dropdownValidationRepository.find({
          where: { id: validation.id },
        });
        break;

      // 15
      case 'url':
        await this.urlValidationRepository.update(
          { id: validation.id },
          { ...validation },
        );
        validationFound = await this.urlValidationRepository.find({
          where: { id: validation.id },
        });

        break;

      // 16
      case 'numberSlider':
        await this.rangeValidationRepository.update(
          { id: validation.id },
          { ...validation },
        );
        validationFound = await this.rangeValidationRepository.find({
          where: { id: validation.id },
        });
        break;

      // 17
      case 'Range':
        await this.rangeValidationRepository.update(
          { id: validation.id },
          { ...validation },
        );
        validationFound = await this.rangeValidationRepository.find({
          where: { id: validation.id },
        });
        break;

      // 18
      case 'imageFile':
        break;

      // 19
      case 'videoFile':
        break;

      // 20
      case 'documentFile':
        break;
    }

    return validationFound;
  }

  async updateValidationRpc(body: {
    attributeId: number;
    dateVldnById: dateVldnById;
    rangeVldnById: rangeVldnById;
    singleSelectVldnById: singleSelectVldnById;
    boolVldnById: boolVldnById;
    textVldnById: textVldnById;
    numericVldnById: numericVldnById;
    timeVldnById: timeVldnById;
    multipleSelectionVldnById: multipleSelectionVldnById;
    dropDownVldnById: dropDownVldnById;
    urlVldnById: urlVldnById;
  }): Promise<any> {
    const attributTyp = await this.attributeRepository.find({
      select: { attributeType: true },
      where: { id: body.attributeId },
    });
    const attributeType = attributTyp[0].attributeType;
    switch (attributeType) {
      // 1
      case 'textBox':
        await this.textValidationRepository.update(
          { id: body.textVldnById.id },
          { ...body.textVldnById },
        );
        validationFound = await this.textValidationRepository.find({
          where: { id: body.textVldnById.id },
        });

        val = JSON.stringify(validationFound[0]);
        val = JSON.parse(val);
        return { textVldn: val };
        break;

      // 2
      case 'textArea':
        await this.textValidationRepository.update(
          { id: body.textVldnById.id },
          { ...body.textVldnById },
        );
        validationFound = await this.textValidationRepository.find({
          where: { id: body.textVldnById.id },
        });
        val = JSON.stringify(validationFound[0]);
        val = JSON.parse(val);

        return { textVldn: val };

        break;

      // 3
      case 'numeric':
        await this.numericValidationRepository.update(
          { id: body.numericVldnById.id },
          { ...body.numericVldnById },
        );
        validationFound = await this.textValidationRepository.find({
          where: { id: body.numericVldnById.id },
        });
        val = JSON.stringify(validationFound[0]);
        val = JSON.parse(val);

        return { numericVldn: val };

        break;

      // 4
      case 'boolean':
        await this.boolValidationRepository.update(
          { id: body.boolVldnById.id },
          { ...body.boolVldnById },
        );
        validationFound = await this.boolValidationRepository.find({
          where: { id: body.boolVldnById.id },
        });
        val = JSON.stringify(validationFound[0]);
        val = JSON.parse(val);

        return { booleanVldn: val };
        break;

      // 5
      case 'singleSelect':
        await this.singleSelectValidationRepository.update(
          { id: body.singleSelectVldnById.id },
          { ...body.singleSelectVldnById },
        );
        validationFound = await this.singleSelectValidationRepository.find({
          where: { id: body.singleSelectVldnById.id },
        });
        val = JSON.stringify(validationFound[0]);
        val = JSON.parse(val);

        return { singleSelectionVldn: val };
        break;

      // 6
      case 'multiSelect':
        await this.multiSelectValidationRepository.update(
          { id: body.multipleSelectionVldnById.id },
          { ...body.multipleSelectionVldnById },
        );
        validationFound = await this.multiSelectValidationRepository.find({
          where: { id: body.multipleSelectionVldnById.id },
        });
        val = JSON.stringify(validationFound[0]);
        val = JSON.parse(val);

        return { multipleSelectionVldn: val };

        break;

      // 7
      case 'richText':
        await this.textValidationRepository.update(
          { id: body.textVldnById.id },
          { ...body.textVldnById },
        );
        validationFound = await this.textValidationRepository.find({
          where: { id: body.textVldnById.id },
        });

        val = JSON.stringify(validationFound[0]);
        val = JSON.parse(val);

        return { textVldn: val };
        break;

      // 8
      case 'date':
        await this.dateValidationRepository.update(
          { id: body.dateVldnById.id },
          { ...body.dateVldnById },
        );
        validationFound = await this.dateValidationRepository.find({
          where: { id: body.dateVldnById.id },
        });
        val = JSON.stringify(validationFound[0]);
        val = JSON.parse(val);

        return { dateVldn: val };
        break;

      // 9
      case 'time':
        await this.timeValidationRepository.update(
          { id: body.timeVldnById.id },
          { ...body.timeVldnById },
        );
        validationFound = await this.timeValidationRepository.find({
          where: { id: body.timeVldnById.id },
        });
        val = JSON.stringify(validationFound[0]);
        val = JSON.parse(val);

        return { timeVldn: val };
        break;

      // 10
      case 'email':
        break;

      // 11

      // 12
      case 'telephone':
        break;

      // 13
      case 'mobileNumber':
        break;

      // 14
      case 'dropdown':
        await this.dropdownValidationRepository.update(
          { id: body.dropDownVldnById.id },
          { ...body.dropDownVldnById },
        );
        validationFound = await this.dropdownValidationRepository.find({
          where: { id: body.dropDownVldnById.id },
        });
        val = JSON.stringify(validationFound[0]);
        val = JSON.parse(val);

        return { dropdownVldn: val };
        break;

      // 15
      case 'url':
        await this.urlValidationRepository.update(
          { id: body.urlVldnById.id },
          { ...body.urlVldnById },
        );
        validationFound = await this.urlValidationRepository.find({
          where: { id: body.urlVldnById.id },
        });
        val = JSON.stringify(validationFound[0]);
        val = JSON.parse(val);

        return { urlVldn: val };
        break;

      // 16
      case 'numberSlider':
        await this.rangeValidationRepository.update(
          { id: body.rangeVldnById.id },
          { ...body.rangeVldnById },
        );
        validationFound = await this.rangeValidationRepository.find({
          where: { id: body.rangeVldnById.id },
        });
        val = JSON.stringify(validationFound[0]);
        val = JSON.parse(val);

        return { rangeVldn: val };
        break;

      // 17
      case 'Range':
        await this.rangeValidationRepository.update(
          { id: body.rangeVldnById.id },
          { ...body.rangeVldnById },
        );
        validationFound = await this.rangeValidationRepository.find({
          where: { id: body.rangeVldnById.id },
        });
        val = JSON.stringify(validationFound[0]);
        val = JSON.parse(val);

        return { rangeVldn: val };
        break;

      // 18
      case 'imageFile':
        break;

      // 19
      case 'videoFile':
        break;

      // 20
      case 'documentFile':
        break;
    }
  }
}
