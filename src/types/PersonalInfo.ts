import Step, { StepEnum } from "@/utils/steps";

export const PersonalKeys = {
    FIRSTNAME: 'firstname',
    LASTNAME: 'lastname',
    MIDDLENAME: 'middlename',
    EMAIL: 'email',

    ADDRESSLINE: 'addressline',
    CITY: 'city',
    STATE: 'state',
    ZIPCODE: 'zipcode',
    
    TELEPHONE: 'telephone'
} as const;

export interface PersonalInfo {
    [PersonalKeys.FIRSTNAME]: string,
    [PersonalKeys.LASTNAME]: string,
    [PersonalKeys.MIDDLENAME]: string,
    [PersonalKeys.EMAIL]: string,
    [PersonalKeys.ADDRESSLINE]: string,
    [PersonalKeys.CITY]: string,
    [PersonalKeys.STATE]: string,
    [PersonalKeys.ZIPCODE]: number | null,
    [PersonalKeys.TELEPHONE]: number | null
}

export type PersonalInfoConfig = {
    [K in keyof Omit<PersonalInfo, ''> as string]: {
      id: string,
      label: string,
      isEditable: boolean,
      displayOnStep: Step.StepEnum,
      validationRegex?: string,
      validationMessage?: string
    }
  };
  
export const personalInfoConfig: PersonalInfoConfig = {
    [PersonalKeys.FIRSTNAME]: {
      id: PersonalKeys.FIRSTNAME,
      label: 'First Name',
      displayOnStep: StepEnum.PersonalInfo,
      isEditable: true,
      validationRegex: "^[A-Za-z ,.'-]+$",
      validationMessage: "Please enter a valid first name"
    },
    [PersonalKeys.LASTNAME]: {
        id: PersonalKeys.LASTNAME,
        label: 'Last Name',
        displayOnStep: StepEnum.PersonalInfo,
        isEditable: true,
        validationRegex: "^[A-Za-z ,.'-]+$",
        validationMessage: "Please enter a valid last name"
    },
    [PersonalKeys.MIDDLENAME]: {
        id: PersonalKeys.MIDDLENAME,
        label: 'Middle Name',
        displayOnStep: StepEnum.PersonalInfo,
        isEditable: true,
        validationRegex: "^[A-Za-z ,.'-]+$",
        validationMessage: "Please enter a valid middle name"
    },
    [PersonalKeys.EMAIL]: {
        id: PersonalKeys.EMAIL,
        label: 'Email',
        displayOnStep: StepEnum.PersonalInfo,
        isEditable: true,
        validationRegex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
        validationMessage: "Please enter a valid email address"
    },


    [PersonalKeys.ADDRESSLINE]: {
        id: PersonalKeys.ADDRESSLINE,
        label: 'Address',
        displayOnStep: StepEnum.PersonalInfo,
        isEditable: true,
        validationRegex: "^\\d+\\s[A-Za-z\\s]+$"//validate via an API 
    },
    [PersonalKeys.CITY]: {
        id: PersonalKeys.CITY,
        label: 'City',
        displayOnStep: StepEnum.PersonalInfo,
        isEditable: true,
        validationRegex: "^[A-Za-z\\s]+$"
    },
    [PersonalKeys.STATE]: {
        id: PersonalKeys.STATE,
        label: 'State',
        displayOnStep: StepEnum.PersonalInfo,
        isEditable: true,
        validationRegex: "^[A-Z]{2}$"
    },
    [PersonalKeys.ZIPCODE]: {
        id: PersonalKeys.ZIPCODE,
        label: 'Zipcode',
        displayOnStep: StepEnum.PersonalInfo,
        isEditable: true,
        validationRegex: "^\\d{5}$"
    },

    [PersonalKeys.TELEPHONE]: {
        id: PersonalKeys.TELEPHONE,
        label: 'Telephone number',
        displayOnStep: StepEnum.PersonalInfo,
        isEditable: true,
        validationRegex: "^\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$"
    },
};

export function newPersonalInfoInstance(): PersonalInfo {
    return {
        [PersonalKeys.FIRSTNAME]: '',
        [PersonalKeys.LASTNAME]: '',
        [PersonalKeys.MIDDLENAME]: '',
        [PersonalKeys.EMAIL]: '',
        [PersonalKeys.ADDRESSLINE]: '',
        [PersonalKeys.CITY]: '',
        [PersonalKeys.STATE]: '',
        [PersonalKeys.ZIPCODE]: null,
        [PersonalKeys.TELEPHONE]: null
    }
}