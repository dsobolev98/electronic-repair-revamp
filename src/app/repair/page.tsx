'use client'
import Category from '@/components/collect-info/category-info/Category'
import { StepEnum } from '@/utils/steps'
import ItemInfo from '@/components/collect-info/item-info/ItemInfo'
import PersonalInfo from '@/components/collect-info/personal-info/PersonalInfo'
import styles from './page.module.css'

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useDispatch } from 'react-redux'
import { store } from '@/redux/store'
import { setInitialStep } from '@/redux/slices/stepSlice'
import $ from 'jquery'
import ApplicationResult from '@/components/collect-info/application-result/ApplicationResult'

function Repair() {

  /* $(document).load(function(){
    store.dispatch(setInitialStep())
  }) */
  
  const step = useAppSelector((state:any) => state.step.step );

  return (
    <div>
      {step == StepEnum.Category && <Category/>}
      {step == StepEnum.ItemInfo && <ItemInfo/>}
      {step == StepEnum.PersonalInfo && <PersonalInfo/>}
      {step == StepEnum.ApplicationResult && <ApplicationResult/>}
    </div>
  )
}

export default Repair