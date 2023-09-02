import React from 'react'
import style from './RightSide.module.css'
import { Updates } from '../Updates/Updates'
import { CustomerReview } from '../CustomerReview/CustomerReview'

export const RightSide = () => {
  return (
    <div className={style.RightSide}>
        <div>
            <h1>Recent Reviews</h1>
            <Updates/>
        </div>
    </div>
  )
}

