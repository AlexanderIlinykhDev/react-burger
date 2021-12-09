import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorElement } from "../burger-constructor-element/burger-constructor-element";
import burgerConstructorStyles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {
  addIngredient,
  getOrderNumber,
} from "../../services/actions/burger-constructor";
import {
  showOrderDetails,
  hideOrderDetails,
} from "../../services/actions/order-details";

const BurgerConstructor = (props) => {
  const { bun, sausesAndFillings, totalPrice, isOrderDetailsActive } =
    useSelector((store) => ({
      bun: store.burgerConstructor.bun,
      sausesAndFillings: store.burgerConstructor.sausesAndFillings,
      totalPrice: store.burgerConstructor.totalPrice,
      isOrderDetailsActive: store.orderDetails.isOrderDetailsActive,
    }));

  const dispatch = useDispatch();

  function handleMakeOrderClick(event) {
    const chosenIngredientsData = [bun, ...sausesAndFillings];
    const bodyData = {
      ingredients: chosenIngredientsData.map(
        (ingredientData) => ingredientData._id
      ),
    };
    dispatch(getOrderNumber(bodyData));
    dispatch(showOrderDetails());
  }

  function handleModalClose() {
    dispatch(hideOrderDetails());
  }

  const bunTopIngredient = (
    <div className={burgerConstructorStyles.element + " pl-8"}>
      <ConstructorElement
        type="top"
        isLocked
        text={bun.name + " (верх)"}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
  );

  const bunBottomIngredient = (
    <div className={burgerConstructorStyles.element + " pl-8"}>
      <ConstructorElement
        type="bottom"
        isLocked
        text={bun.name + " (низ)"}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
  );

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch(addIngredient(item.ingredient));
    },
  });

  return (
    <>
      {isOrderDetailsActive && (
        <Modal handleModalClose={handleModalClose}>
          <OrderDetails />
        </Modal>
      )}

      <div
        className={burgerConstructorStyles.container + " mt-25 ml-16"}
        ref={dropTarget}
      >
        <>
          {!bun.hasOwnProperty("_id") || bunTopIngredient}

          {!sausesAndFillings.length || (
            <div className={burgerConstructorStyles.ingredientsconstructor}>
              {sausesAndFillings.map((chosenIngredient, index) => (
                <BurgerConstructorElement
                  name={chosenIngredient.name}
                  price={chosenIngredient.price}
                  image={chosenIngredient.image}
                  index={index}
                  key={index}
                  id={chosenIngredient._id}
                />
              ))}
            </div>
          )}

          {!bun.hasOwnProperty("_id") || bunBottomIngredient}

          {!totalPrice || (
            <div
              className={
                burgerConstructorStyles.priceandconfirmation + " mt-10 mb-10"
              }
            >
              <p className="text text_type_digits-medium">{totalPrice}</p>
              <div className="mr-10">
                <CurrencyIcon className="mr-10" type="primary" />
              </div>
              <div className="mr-8">
                <Button
                  onClick={handleMakeOrderClick}
                  type="primary"
                  size="large"
                >
                  Оформить заказ
                </Button>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default BurgerConstructor;
