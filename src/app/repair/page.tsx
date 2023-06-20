'use client'

import { StepEnum } from '@/utils/steps'
import Category from '@/components/collect-info/category-info/Category'
import ItemInfo from '@/components/collect-info/item-info/ItemInfo'
import PersonalInfo from '@/components/collect-info/personal-info/PersonalInfo'
import ApplicationResult from '@/components/collect-info/application-result/ApplicationResult'
import styles from './page.module.css'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { store } from '@/redux/store'
import { setInitialStep } from '@/redux/slices/stepSlice'
import { setInitialItem } from '@/redux/slices/infoSlice'
import { ItemDictionary } from '@/types/ItemInfo'

import {v4 as uuidv4} from 'uuid';

function Repair() {
  const items: ItemDictionary = useAppSelector((state:any) => state.info.item) 

  useEffect(() => {
    store.dispatch(setInitialStep());
  
    let itemCount: number = Object.keys(items).length
    console.log(itemCount)
    if(itemCount === 0)
    {
      store.dispatch(setInitialItem())
    }

  }, []);

  const step = useAppSelector((state:any) => state.step.step);
  const currentItemUId = useAppSelector((state:any) => state.info.currentItemUId)

  return (
    <div>
      {step == StepEnum.Category && <Category itemUId={currentItemUId}/>}
      {step == StepEnum.ItemInfo && <ItemInfo itemUId={currentItemUId}/>}
      {step == StepEnum.PersonalInfo && <PersonalInfo/>}
      {step == StepEnum.ApplicationResult && <ApplicationResult/>}
    </div>
  )
}

export default Repair