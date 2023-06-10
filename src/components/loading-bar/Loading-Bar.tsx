"use client"

import React from 'react'
import ProgressBar from 'next-nprogress-bar'

function LoadingBar() {
  return (
    <ProgressBar
        height="5px"
        color="#2c6fbb"
        options={{ showSpinner: false }}
        shallowRouting
        appDirectory
    />
  )
}

export default LoadingBar