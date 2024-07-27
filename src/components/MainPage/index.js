import {Component} from 'react'
import Loader from 'react-loader-spinner'

import DishCategoryPage from '../DishCategoryPage'
import ItemsOfCategoryPage from '../ItemsOfCategoryPage'
import HeaderPage from '../HeaderPage'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MainPage extends Component {
  state = {
    dataStore: [],
    apiStatus: apiStatusConstants.initial,
    activeTabId: '11',
    countItems: 0,
  }

  componentDidMount() {
    this.getDatat()
  }

  onChangeActiveTab = id => {
    this.setState({activeTabId: id})
  }

  getDatat = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    try {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )
      const data = await response.json()
      console.log(data)
      this.setState({dataStore: data, apiStatus: apiStatusConstants.success})
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  increaseCountValue = () => {
    this.setState(prev => ({countItems: prev.countItems + 1}))
  }

  decreaseCountValue = () => {
    const {countItems} = this.state
    if (countItems === 0) {
      this.setState({countItems: 0})
    } else {
      this.setState(prev => ({countItems: prev.countItems - 1}))
    }
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessOut = () => {
    const {dataStore, activeTabId, countItems} = this.state
    const tableMenuList = dataStore[0].table_menu_list
    const activeTabDishesIds = tableMenuList.filter(
      each => each.menu_category_id === activeTabId,
    )
    const detailsTableMenuList = tableMenuList.map(each => ({
      categoryDishes: each.category_dishes,
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
    }))

    const tabDishesIds = {
      categoryDishes: activeTabDishesIds[0].category_dishes,
      menuCategory: activeTabDishesIds[0].menu_category,
      menuCategoryId: activeTabDishesIds[0].menu_category_id,
    }
    const disheArrayList = tabDishesIds.categoryDishes
    const detailsDishesArrays = disheArrayList.map(each => ({
      addonCat: each.addonCat,
      dishAvailability: each.dish_Availability,
      dishCalories: each.dish_calories,
      dishCurrency: each.dish_currency,
      dishDescription: each.dish_description,
      dishId: each.dish_id,
      dishImage: each.dish_image,
      dishName: each.dish_name,
      dishPrice: each.dish_price,
    }))

    return (
      <>
        <HeaderPage countItems={countItems} />
        <div className="categoryTab-container">
          <ul className="categoryTabtwo-container">
            {detailsTableMenuList.map(each => (
              <DishCategoryPage
                key={each.menuCategoryId}
                isActiveTab={each.menuCategoryId === activeTabId}
                data={each}
                onChangeTabId={this.onChangeActiveTab}
              />
            ))}
          </ul>
        </div>
        <ul className="undorder-container-categogy">
          {detailsDishesArrays.map(each => (
            <ItemsOfCategoryPage
              dishArrays={each}
              key={each.dishId}
              increaseCountItems={this.increaseCountValue}
              decreaseCountItems={this.decreaseCountValue}
              countItems={countItems}
            />
          ))}
        </ul>
      </>
    )
  }

  renderFinalViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccessOut()
      default:
        return null
    }
  }

  render() {
    const {countItems} = this.state
    return <div>{this.renderFinalViews()}</div>
  }
}
export default MainPage
