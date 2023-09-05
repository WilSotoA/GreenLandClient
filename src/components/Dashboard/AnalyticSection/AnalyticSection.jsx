import React from 'react'
import style from './AnalyticSection.module.css'
import TopSellers from './TopSellers'
import LoyaltyChart from './Loyalty'
import AverageRating from './AverageRating'


const AnalyticSection = () => {
  return (
    <div className={style.AnalyticSection}>
        <TopSellers />
        <LoyaltyChart />
        <AverageRating />
    </div>
  )
}

export default AnalyticSection