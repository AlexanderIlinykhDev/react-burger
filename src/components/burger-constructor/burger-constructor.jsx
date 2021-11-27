import React, { useContext } from 'react';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './burger-constructor.module.css';
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'

import { ChosenIngredientsContext, TotalPriceContext } from '../../context/burger-context';

const BurgerConstructor = (props) => {

	const [isDetailsHidden, setIsDetailsHidden] = React.useState(true)
	const [chosenIngredientsData] = React.useContext(ChosenIngredientsContext);
	const [orderNumber, setOrderNumber] = React.useState(0)

	const { totalPriceState } = useContext(TotalPriceContext);

	function handleMakeOrderClick(event) {

		const bodyData = {
			"ingredients": chosenIngredientsData.map((ingredientData) => ingredientData._id)
		}

		const response = async () => {
			fetch(`${props.endpoint}/api/orders`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(bodyData)
			})
				.then((res) => {
					if (res.ok) {
						return res.json()
					}
					return Promise.reject(`Ошибка ${res.status}`);
				})
				.then(res => setOrderNumber(res.order.number))
				.catch((e) => {
					console.log('Error: ' + e.message);
					console.log(e.response);
				});
		}

		response();
		setIsDetailsHidden(false);
	}

	function handleModalClose() {
		setIsDetailsHidden(true);
	}

	const bunTopIngredient = chosenIngredientsData.filter(chosenIngredient => chosenIngredient.type === "bun").map(chosenIngredient => (
		< div className={burgerConstructorStyles.element + " pl-8"} key={chosenIngredient._id}>
			<ConstructorElement
				type="top"
				isLocked
				text={chosenIngredient.name + " (верх)"}
				price={chosenIngredient.price}
				thumbnail={chosenIngredient.image}
				key={chosenIngredient._id}
			/>
		</div>
	));

	const bunBottomIngredient = chosenIngredientsData.filter(chosenIngredient => chosenIngredient.type === "bun").map(chosenIngredient => (
		< div className={burgerConstructorStyles.element + " pl-8"} key={chosenIngredient._id}>
			<ConstructorElement
				type="bottom"
				isLocked
				text={chosenIngredient.name + " (низ)"}
				price={chosenIngredient.price}
				thumbnail={chosenIngredient.image}
				key={chosenIngredient._id}
			/>
		</div>
	));


	return (
		<>
			{!isDetailsHidden &&
				(
					<Modal stasus={isDetailsHidden} handleModalClose={handleModalClose}>
						<OrderDetails orderNumber={orderNumber} />
					</Modal>
				)
			}

			{!(chosenIngredientsData.length) ||
				< div className={burgerConstructorStyles.container + " mt-25 ml-16"}>

					{
						bunTopIngredient
					}

					<div className={burgerConstructorStyles.ingredientsconstructor}>
						{
							chosenIngredientsData.filter(chosenIngredient => chosenIngredient.type !== "bun").map((chosenIngredient, index) =>
								<div className={burgerConstructorStyles.element} key={index}>
									<div className={burgerConstructorStyles.dragIcon + " mr-3"}>
										<DragIcon type="primary" />
									</div>

									<ConstructorElement
										text={chosenIngredient.name}
										price={chosenIngredient.price}
										thumbnail={chosenIngredient.image}
										key={index}
									/>


								</div>
							)
						}
					</div>

					{
						bunBottomIngredient
					}

					<div className={burgerConstructorStyles.priceandconfirmation + " mt-10 mb-10"}>
						<p className="text text_type_digits-medium">
							{
								totalPriceState.price
							}
						</p>
						<div className="mr-10">
							<CurrencyIcon className="mr-10" type="primary" />
						</div>
						<div className="mr-8">
							<Button onClick={handleMakeOrderClick} type="primary" size="large">
								Оформить заказ
							</Button>
						</div>
					</div>
				</div>

			}

		</>
	)

}

export default BurgerConstructor;