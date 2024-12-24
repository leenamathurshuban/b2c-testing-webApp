import { useRouter } from 'next/router';
import React from 'react'

export default function order_placed() {
  const route =  useRouter()
  console.log(route.query)
  // debugger
  return (
    <div>OrderPlaced</div>
  )
}
