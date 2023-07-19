import { ItemInfo, newItemInfoInstance } from '@/types/ItemInfo';
import { PersonalInfo, newPersonalInfoInstance } from '@/types/PersonalInfo';

import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { v4 } from 'uuid';

export interface infoState {
    currentItemIndex: number,
    item: Array<ItemInfo>,
    personal: PersonalInfo
    applicationUId: string
}

const initialState: infoState = {
    currentItemIndex: 0,
    item: [],
    personal: newPersonalInfoInstance(),
    applicationUId: ""
};

const infoSlice = createSlice({
    name: "info",
    initialState,
    reducers: {
        setInitialItem: (state: infoState) => {
            const index = state.item.length;
            state.currentItemIndex = index;
            state.item.push(newItemInfoInstance());
        },
        removeItem: (state:infoState, action: PayloadAction<number>) => {
            let newItemArray: Array<ItemInfo> = []

            state.item.forEach(item => {
                if (state.item.indexOf(item) != action.payload)
                    newItemArray.push(item)
            })

            state.item = newItemArray
            state.currentItemIndex = 0;
        },
        setCategory: (state:infoState, action: PayloadAction<string>) => {
            const category = action.payload;
            if (state.item[state.currentItemIndex] != undefined)
                state.item[state.currentItemIndex].category = category;
        },
        setCurrentItemIndex: (state:infoState, action: PayloadAction<number>) => {
            state.currentItemIndex = action.payload;
        },
        setItem: (state:infoState, action: PayloadAction<ItemInfo>) => {
            const item = action.payload;
            if (state.item[state.currentItemIndex] != undefined)
                state.item[state.currentItemIndex] = item;
        },
        updateItemField: (state:infoState, action: PayloadAction<{
            field: keyof Omit<ItemInfo, 'category'>,
            value: string
        }>) => {
            const { field, value } = action.payload;
            if (state.item[state.currentItemIndex] != undefined 
                    && field in state.item[state.currentItemIndex]) {
                
                state.item[state.currentItemIndex] = {
                    ...state.item[state.currentItemIndex],
                    [field]: value
                }
            }
                
        },
        setPersonal: (state:infoState, action: PayloadAction<PersonalInfo>) => {
            const personal = action.payload;
            state.personal = personal;
        },
        updatePersonalField: (state:infoState, action: PayloadAction<{
            field: keyof Omit<PersonalInfo, ''>,
            value: string
        }>) => {
            const {field, value} = action.payload;
            state.personal = {
                ...state.personal,
                [field]: value
            }
        },
        setApplicationUId: (state: infoState, action: PayloadAction<string>) => {
            state.applicationUId = action.payload
        }
    }
});

export const { 
    setInitialItem, 
    removeItem, 
    setCategory, 
    setCurrentItemIndex,
    setItem, 
    updateItemField, 
    setPersonal, 
    updatePersonalField,
    setApplicationUId
} = infoSlice.actions;

export default infoSlice.reducer;