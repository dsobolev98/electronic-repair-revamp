"use server"

import { PersonalInfo as PersonalInfoType, PersonalKeys } from '@/types/PersonalInfo'
import React from 'react'

async function PersonalInfo({
    info
}:{
    info: PersonalInfoType
}) {
  return (
    <div>
        <p>
            {info[PersonalKeys.FIRSTNAME]} &nbsp;
            {info[PersonalKeys.MIDDLENAME]} &nbsp;
            {info[PersonalKeys.LASTNAME]}
        </p>
        <p>{info[PersonalKeys.EMAIL]}</p>
        <p>{info[PersonalKeys.TELEPHONE]}</p>
        <p>{info[PersonalKeys.ADDRESSLINE]}</p>
        <p>
            {info[PersonalKeys.CITY]}, &nbsp;
            {info[PersonalKeys.STATE]} &nbsp;
            {info[PersonalKeys.ZIPCODE]}
        </p>
    </div>
  )
}

export default PersonalInfo