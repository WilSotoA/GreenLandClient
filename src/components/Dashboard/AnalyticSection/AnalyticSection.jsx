import style from "./AnalyticSection.module.css";
import TopSellers from "./TopSellers";
import LoyaltyChart from "./Loyalty";
import AverageRating from "./AverageRating";
import SalesChart from "./IncomeChart";

const AnalyticSection = () => {
  return (
    <div className={style.AnalyticSection}>
      <div className={style.containerGraph}>
        <SalesChart />
      </div>
      <div className={style.containerGraph}>
        <TopSellers />
      </div>
      <div className={style.containerGraph}>
        <AverageRating />
      </div>
      <div className={style.containerGraph}>
        <LoyaltyChart />
      </div>
    </div>
  );
};

export default AnalyticSection;
