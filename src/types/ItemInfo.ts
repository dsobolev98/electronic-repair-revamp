import Step, { StepEnum } from "@/utils/steps";

export const ItemKeys = {
    CATEGORY: 'category',
    BRAND: 'brand',
    MODEL: 'model',
} as const;

export type ItemInfo  = {
    [ItemKeys.CATEGORY]: string,
    [ItemKeys.BRAND]: string, 
    [ItemKeys.MODEL]: string
}

export type ItemInfoConfig = {
    [K in keyof Omit<ItemInfo, ''> as string]: {
      id: string,
      label: string,
      displayOnStep: Step.StepEnum,
      isEditable: boolean,
      validationRegex?: string,
      validationMessage?: string
    }
  };
  
export const itemInfoConfig: ItemInfoConfig = {
    [ItemKeys.CATEGORY]: {
        id: ItemKeys.CATEGORY,
        label: 'Category',
        displayOnStep: StepEnum.Category,
        isEditable: false,

    },
    [ItemKeys.BRAND]: {
      id: ItemKeys.BRAND,
      label: 'Brand',
      displayOnStep: StepEnum.ItemInfo,
      isEditable: true,
      validationRegex: "^[A-Za-z0-9 ]+$",
      validationMessage: "Please enter a valid brand"
    },
    [ItemKeys.MODEL]: {
        id: ItemKeys.MODEL,
        label: 'Model',
        displayOnStep: StepEnum.ItemInfo,
        isEditable: true,
        validationRegex: "^[A-Za-z0-9 ]+$",
        validationMessage: "Please enter a valid model"
    }
};

export function newItemInfoInstance(): ItemInfo {
  return {
    [ItemKeys.CATEGORY]: '',
    [ItemKeys.BRAND]: '', 
    [ItemKeys.MODEL]: ''
  }
}