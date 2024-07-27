import './index.css'

const DishCategoryPage = props => {
  const {data, isActiveTab, onChangeTabId} = props
  const {menuCategory, menuCategoryId} = data

  const activeClassName = isActiveTab ? 'activetabClassname' : null
  const onClickTabId = () => {
    onChangeTabId(menuCategoryId)
  }
  return (
    <li className="list-container">
      <button
        onClick={onClickTabId}
        className={`buttonTab ${activeClassName}`}
        type="button"
      >
        <p className="categoryname">{menuCategory}</p>
      </button>
    </li>
  )
}

export default DishCategoryPage
