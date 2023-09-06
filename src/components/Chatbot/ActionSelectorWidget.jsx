/* eslint-disable react/prop-types */
import style from "./styles/ActionSelectorWidget.module.css";

export const ActionSelectorWidget = ({actions}) => {
  const handleActionSelection = (selectedAction) => {
    if (selectedAction === "Orders") actions.handleOrders(selectedAction)
    else if (selectedAction === "Shipping") actions.handleShipping(selectedAction)
    else if (selectedAction === "Returns") actions.handleReturns(selectedAction)
    else if (selectedAction === "Refund") actions.handleRefund(selectedAction)
  };

  return (
    <div className={style.containerBtn}>
      <button
        className={style.btn}
        onClick={() => handleActionSelection("Orders")}
      >
        Orders
      </button>
      <button
        className={style.btn}
        onClick={() => handleActionSelection("Shipping")}
      >
        Shipping
      </button>
      <button
        className={style.btn}
        onClick={() => handleActionSelection("Returns")}
      >
        Returns
      </button>

      <button
        className={style.btn}
        onClick={() => handleActionSelection("Refund")}
      >
        Refund
      </button>
    </div>
  );
};
