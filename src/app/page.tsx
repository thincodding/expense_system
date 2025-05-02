'use client'

import React from 'react'
import Login from './login/page'
import Dashboard from './components/Dashboard'
import { useApi } from './api/useFetchApi'

function Page() {
  const {data: product} = useApi('/api/product')

  return (
    <div>
 

 
       <Dashboard/>


    </div>
  )
}

export default Page