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
    [K in keyof Omit<PersonalInfo, ''>]: {
      id: string,
      isEditable: boolean;
      label: string;
    }
  };
  
export const personalInfoConfig: PersonalInfoConfig = {
    [PersonalKeys.FIRSTNAME]: {
      id: PersonalKeys.FIRSTNAME,
      isEditable: true,
      label: 'First Name',
    },
    [PersonalKeys.LASTNAME]: {
        id: PersonalKeys.LASTNAME,
        isEditable: true,
        label: 'Last Name',
    },
    [PersonalKeys.MIDDLENAME]: {
        id: PersonalKeys.MIDDLENAME,
        isEditable: true,
        label: 'Middle Name',
    },
    [PersonalKeys.EMAIL]: {
        id: PersonalKeys.EMAIL,
        isEditable: true,
        label: 'Email',
    },


    [PersonalKeys.ADDRESSLINE]: {
        id: PersonalKeys.ADDRESSLINE,
        isEditable: true,
        label: 'Address',
    },
    [PersonalKeys.CITY]: {
        id: PersonalKeys.CITY,
        isEditable: true,
        label: 'City',
    },
    [PersonalKeys.STATE]: {
        id: PersonalKeys.STATE,
        isEditable: true,
        label: 'State',
    },
    [PersonalKeys.ZIPCODE]: {
        id: PersonalKeys.ZIPCODE,
        isEditable: true,
        label: 'Zipcode',
    },

    [PersonalKeys.TELEPHONE]: {
        id: PersonalKeys.TELEPHONE,
        isEditable: true,
        label: 'Telephone number',
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