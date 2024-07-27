import {IoCartOutline} from 'react-icons/io5'
import './index.css'

const HeaderPage = props => {
  const {countItems} = props

  return (
    <div className="headerPage-container">
      <h1 className="heading-text">UNI Resto Cafe</h1>
      <div className="itemsorder">
        <p className="order-text-para">My Orders</p>
        <div className="cart-card">
          <IoCartOutline className="cart-icon-image" />
          <span className="cart-count">{countItems}</span>
        </div>
      </div>
    </div>
  )
}

export default HeaderPage
