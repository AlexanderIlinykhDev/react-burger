import { useMemo } from "react";
import { useSelector } from "../../services/hooks";

import orderDetailsStyles from "./order-details.module.css";
import doneGif from "../../images/done.gif";

function OrderDetails() {
  const { isLoading, orderNumber } = useSelector((store) => ({
    isLoading: store.orderData.loading,
    orderNumber: store.orderData.orderNumber,
  }));

  const content = useMemo(() => {
    return isLoading ? (
      <p className="text text_type_digits-medium mt-30">Загрузка...</p>
    ) : (
      <p className="text text_type_digits-large mt-30">{orderNumber}</p>
    );
  }, [orderNumber, isLoading]);

  return (
    <section className={orderDetailsStyles.orderdetails}>
      {content}
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img className="mt-15" src={doneGif} alt="done!" />
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default mt-2 mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </section>
  );
}

export default OrderDetails;
