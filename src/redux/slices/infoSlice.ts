import { ItemDictionary, ItemInfo } from '@/types/ItemInfo';
import { PersonalInfo, newPersonalInfoInstance } from '@/types/PersonalInfo';

import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { v4 } from 'uuid';

export interface infoState {
    currentItemUId: string,
    item: ItemDictionary,
    personal: PersonalInfo

}

const initialState: infoState = {
    currentItemUId: '',
    item: {},
    personal: newPersonalInfoInstance()
};

const infoSlice = createSlice({
    name: "info",
    initialState,
    reducers: {
        setInitialItem: (state:any) => {
            const uuid = v4()
            const emptyItem: ItemInfo = {
                category: '',
                brand: '',
                model: '',
              };
            state.currentItemUId = uuid;
            state.item[uuid] = emptyItem;
        },
        removeItem: (state:any, action: PayloadAction<string>) => {
            const key = action.payload

            delete state.item[key]
            let newKey:string = Object.keys(state.item as ItemDictionary)[0]
            state.currentItemUId = newKey;
        },
        setCategory: (state:any, action: PayloadAction<{key: string, category: string}>) => {
            const {key, category} = action.payload;
            if (state.item != undefined && state.item[key])
            {
                state.item[key].category = category;
            }
        },
        setCurrentItemId: (state:any, action: PayloadAction<string>) => {
            console.log(action.payload)
            state.currentItemUId = action.payload;
        },
        setItem: (state:any, action: PayloadAction<{key: string, item: ItemInfo}>) => {
            const {key, item} = action.payload;
            if (state.item != undefined && state.item[key])
            {
                state.item[key] = item;
            }
        },
        updateItemField: (state:any, action: PayloadAction<{
            key: string, 
            field: keyof Omit<ItemInfo, 'category'>,
            value: string
        }>) => {
            const {key, field, value} = action.payload;
            if (state.item != undefined && key in state.item)
            {
                state.item[key][field] = value;
            }
        },
        setPersonal: (state:any, action: PayloadAction<{key: string, personal: PersonalInfo}>) => {
            const {key, personal} = action.payload;
            state.personal = personal;
        },
        updatePersonalField: (state:any, action: PayloadAction<{
            field: keyof Omit<PersonalInfo, ''>,
            value: string
        }>) => {
            const {field, value} = action.payload;
            state.personal = {
                ...state.personal,
                [field]: value
            }
        }
    }
});

export const { 
    setInitialItem, 
    removeItem, 
    setCategory, 
    setCurrentItemId,
    setItem, 
    updateItemField, 
    setPersonal, 
    updatePersonalField 
} = infoSlice.actions;

export default infoSlice.reducer;