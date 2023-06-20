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

export type ItemDictionary = Record<string, ItemInfo>

export type ItemInfoConfig = {
    [K in keyof Omit<ItemInfo, typeof ItemKeys.CATEGORY>]: {
      id: string,
      isEditable: boolean;
      label: string;
    }
  };
  
export const itemInfoConfig: ItemInfoConfig = {
    [ItemKeys.BRAND]: {
      id: ItemKeys.BRAND,
      isEditable: true,
      label: 'Brand',
    },
    [ItemKeys.MODEL]: {
        id: ItemKeys.MODEL,
        isEditable: true,
        label: 'Model',
    },
};