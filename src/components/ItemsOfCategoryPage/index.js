import {useState} from 'react'

import './index.css'

const ItemsOfCategoryPage = props => {
  const {dishArrays, increaseCountItems, decreaseCountItems} = props
  const {
    dishName,
    dishImage,
    dishCalories,
    dishAvailability,
    dishCurrency,
    dishDescription,
    dishPrice,
    addonCat,
  } = dishArrays

  const [current, setCurrent] = useState(0)
  const onClickIncrease = () => {
    setCurrent(current + 1)
    increaseCountItems()
  }
  const onClickDecrease = () => {
    setCurrent(current - 1)
    decreaseCountItems()
  }

  return (
    <li className="dishitem-container">
      <div className="veg-nonveg-container">
        <div className={`vegi  ${dishPrice > 10 ? 'vegetable-items' : ''}`}>
          <p
            className={`nonveg ${
              dishPrice > 10 ? 'vegetable-items-nonveg' : ''
            }`}
          />
        </div>
        <div className="content-div">
          <h1 className="name">{dishName}</h1>

          <p className="curreny-price">{`${dishCurrency} ${dishPrice}`}</p>
          <p className="description">{dishDescription}</p>
          {dishAvailability ? (
            <div className="qunatity-control-card">
              <button
                type="button"
                className="control"
                onClick={onClickDecrease}
              >
                {' '}
                -{' '}
              </button>
              <p className="count-items-para"> {current}</p>
              <button
                type="button"
                className="control"
                onClick={onClickIncrease}
              >
                {' '}
                +{' '}
              </button>
            </div>
          ) : (
            <p className="not-availble">Not available</p>
          )}

          {addonCat.length ? (
            <p className="customization-text">Customizations available</p>
          ) : (
            ''
          )}
          {dishAvailability ? (
            <button type="button" className="add-cart">
              ADD TO CART
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
      <p className="calories-box calorie-small">{`${dishCalories} Calories`}</p>
      <div className="cal-img-card">
        <p className="calories-box calorie-large">{`${dishCalories} Calories`}</p>
        <img className="dish-img" alt={dishName} src={dishImage} />
      </div>
    </li>
  )
}

export default ItemsOfCategoryPage
