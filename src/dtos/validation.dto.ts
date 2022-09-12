/* eslint-disable */

export class textVldn {
  tenantId: number;
  attributeId: number;
  type: string;
  maxCharacters: number;
  minCharacters: number;
  lowerCaseOnly: boolean;
  upperCaseOnly: boolean;
  allowNumbers: boolean;
  specialCharacters: boolean;
  spacingAllowed: boolean;
}

export class boolVldn {
  tenantId: number;
  type: string;
  attributeId: number;
}

export class numericVldn {
  tenantId: number;
  attributeId: number;
  type: string;
  allowNumericOnly: boolean;
  allowDecimal: boolean;
  allowCommas: boolean;
  allowDots: boolean;
  allowSpaces: boolean;
  minValue: number;
  maxValue : number;
}
export class dateVldn {
  tenantId: number;
  attributeId: number;
  type: string;
  format: string;
  minDate: string;
  maxDate: string;
}

export class timeVldn {
  tenantId: number;
  attributeId: number;
  type: string;
  format: string;
  minTime: string;
  maxTime: string;
}

export class rangeVldn {
  tenantId: number;
  attributeId: number;
  type: string;
  inclusiveMin: boolean;
  inclusiveMax: boolean;
  minRange: number;
  maxRange: number;
}

export class singleSelectVldn {
  tenantId: number;
  attributeId: number;
  type: string;
  default: string;
}

export class multipleSelectionVldn {
  tenantId: number;
  attributeId: number;
  type: string;
  default: string;
  minEssentialSelection: number;
  maxSelectionAllowed: number;
}

export class dropDownVldn {
  tenantId: number;
  attributeId: number;
  type: string;
  default: string;
  limitViewSelections: number;
}

export class urlVldn {
  tenantId: number;
  attributeId: number;
  type: string;
  emptyProtocol: boolean;
  protocol: boolean;
  format: string;
}

export class textVldnById {
  id: number;
  tenantId: number;
  attributeId: number;
  type: string;
  maxCharacters: number;
  minCharacters: number;
  lowerCaseOnly: boolean;
  upperCaseOnly: boolean;
  allowNumbers: boolean;
  specialCharacters: boolean;
  spacingAllowed: boolean;
}

export class boolVldnById {
  id: number;
  tenantId: number;
  type: string;
  attributeId: number;
}

export class numericVldnById {
  id: number;
  tenantId: number;
  attributeId: number;
  type: string;
  allowNumericOnly: boolean;
  allowDecimal: boolean;
  allowCommas: boolean;
  allowDots: boolean;
  allowSpaces: boolean;
}
export class dateVldnById {
  id: number;
  tenantId: number;
  attributeId: number;
  type: string;
  format: string;
  minDate: string;
  maxDate: string;
}

export class timeVldnById {
  id: number;
  tenantId: number;
  attributeId: number;
  type: string;
  format: string;
  minTime: string;
  maxTime: string;
}

export class rangeVldnById {
  id: number;
  tenantId: number;
  attributeId: number;
  type: string;
  inclusiveMin: boolean;
  inclusiveMax: boolean;
  minRange: number;
  maxRange: number;
}

export class singleSelectVldnById {
  id: number;
  tenantId: number;
  attributeId: number;
  type: string;
  default: string;
}

export class multipleSelectionVldnById {
  id: number;
  tenantId: number;
  attributeId: number;
  type: string;
  default: string;
  minEssentialSelection: number;
  maxSelectionAllowed: number;
}

export class dropDownVldnById {
  id: number;
  tenantId: number;
  attributeId: number;
  type: string;
  default: string;
  limitViewSelections: number;
}

export class urlVldnById {
  id: number;
  tenantId: number;
  attributeId: number;
  type: string;
  emptyProtocol: boolean;
  protocol: boolean;
  format: string;
}
