import { useEffect } from "react";
import { useSelector } from "../../services/hooks";
import { Link, useLocation } from "react-router-dom";
//import ingredientImg from "../../images/bun-01.png";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { RootState } from "../../services/types/index";
import { parseDay } from "../../utils/utils";
import orderCardStyles from "./order-card.module.css";
import { TIngredientType } from "../../services/types/data";
export type TOrderCard = {
  id: number;
  createdAt: string;
  name: string;
  ingredientsIds: Array<string>;
};

export default function OrderCard({
  id,
  createdAt,
  name,
  ingredientsIds,
}: TOrderCard) {
  const { ingredientsImgs, ingredientsPrices } = useSelector(
    (store: RootState) => ({
      ingredientsImgs: ingredientsIds.map(
        (ingredientsId: string) =>
          store.burgerIngredients.ingredients.filter(
            (ingredient: TIngredientType) => ingredientsId === ingredient._id
          )[0].image
      ),
      ingredientsPrices: ingredientsIds.map(
        (ingredientsId: string) =>
          store.burgerIngredients.ingredients.filter(
            (ingredient: TIngredientType) => ingredientsId === ingredient._id
          )[0].price
      ),
    })
  );

  const totalPrice = ingredientsPrices.reduce(
    (acc, price) => acc && price && acc + price
  );
  console.log(totalPrice);
  const location = useLocation();
  return (
    <section className={orderCardStyles.content}>
      <Link
        key={id}
        to={{
          // Тут мы формируем динамический путь для нашего ингредиента
          // а также сохраняем в свойство background роут, на котором была открыта наша модалка.
          pathname: `/feed/${id}`,
          state: { background: location },
        }}
        //className={styles.link}
      >
        <div className={orderCardStyles.header + " m-5"}>
          <p className="text text_type_digits-default">#{id}</p>
          <p className="text text_type_main-default text_color_inactive">
            {parseDay(createdAt)}
          </p>
        </div>
        <h2
          className={orderCardStyles.name + " m-5 text text_type_main-medium"}
        >
          {name}
        </h2>
        <div className={orderCardStyles.info + " m-5"}>
          <div className={orderCardStyles.images}>
            {ingredientsImgs.map((ingredientImg: any) => (
              <div className={orderCardStyles.imageContainer}>
                <img
                  src={ingredientImg}
                  alt=""
                  className={orderCardStyles.image}
                />
              </div>
            ))}
          </div>
          <div className={orderCardStyles.price}>
            <p>{totalPrice}</p>

            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </section>
  );
}
