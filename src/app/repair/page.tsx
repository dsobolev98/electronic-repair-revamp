'use client'

import { StepEnum } from '@/utils/steps'
import Category from '@/components/collect-info/category-info/Category'
import ItemInfo from '@/components/collect-info/item-info/ItemInfo'
import PersonalInfo from '@/components/collect-info/personal-info/PersonalInfo'
import ApplicationResult from '@/components/collect-info/application-result/ApplicationResult'
import ConfirmInfo from '@/components/collect-info/confirm-info/ConfirmInfo'
import styles from './page.module.css'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { store } from '@/redux/store'
import { setInitialStep } from '@/redux/slices/stepSlice'
import { setInitialItem } from '@/redux/slices/infoSlice'

import { ItemInfo as ItemInfoType } from '@/types/ItemInfo'

function Repair() {
  const items: Array<ItemInfoType> = useAppSelector((state:any) => state.info.item) 

  useEffect(() => {
    store.dispatch(setInitialStep());
  
    let itemCount: number = items.length;
    console.log(itemCount)
    if(itemCount === 0)
      store.dispatch(setInitialItem())

  }, []);

  const step = useAppSelector((state:any) => state.step.step);
  const currentItemIndex = useAppSelector((state:any) => state.info.currentItemIndex)

  return (
    <div>
      {step == StepEnum.Category && <Category itemIndex={currentItemIndex}/>}
      {step == StepEnum.ItemInfo && <ItemInfo itemIndex={currentItemIndex}/>}
      {step == StepEnum.PersonalInfo && <PersonalInfo/>}
      {step == StepEnum.ConfirmInfo && <ConfirmInfo/>}
      {step == StepEnum.ApplicationResult && <ApplicationResult/>}
    </div>
  )
}

export default Repair