import style from './DashboardLayout.module.css'
import { Sidebar } from './Sidebar/Sidebar';

export const DashboardLayout = ({ children }) => {
  return (
    <div className={style.Dashboard}>
      <div className={style.DashboardGlass}>
        <Sidebar />
        {children}
      </div>
    </div>
  );
};