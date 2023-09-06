import React from 'react'
import style from './AnalyticSection.module.css'
import TopSellers from './TopSellers'
import LoyaltyChart from './Loyalty'
import AverageRating from './AverageRating'
import SalesChart from './IncomeChart'

const AnalyticSection = () => {
  return (
    <div className={style.AnalyticSection}>
        <SalesChart />
        <TopSellers />
        <AverageRating />
        <LoyaltyChart />
    </div>
  )
}

export default AnalyticSection