import style from "./Products.module.css"
import loader from "../../assets/loaderGif.gif"
import "rc-slider/assets/index.css"
import { useSpring, animated } from "@react-spring/web"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllProducts,
  getAllCategories,
  applyFilters,
} from "../../redux/action"
import { Product } from "../Product/Product"
import { Pagination } from "../Paginate/Paginate"
import { SearchBar } from "../SearchBar/SearchBar"
import Slider from "rc-slider"
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io"
import { alertAcept } from "../SweetAlert/SweetAlert"
import ops from "../../assets/Oooooops.png"

export const Products = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const numPageState = useSelector((state) => state.numPageState)
  const filterProducts = useSelector((state) => state.filterProducts)
  const allCategories = useSelector((state) => state.allCategories)
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [range, setRange] = useState([20, 80])
  const [filter, setFilters] = useState({
    categories: [],
    minPrice: 0,
    maxPrice: 100,
    sortBy: "",
    bestSeller: false,
    name: "",
  })

  const cantProdcutsForPage = 12
  let start = (numPageState - 1) * cantProdcutsForPage
  let end = numPageState * cantProdcutsForPage
  let cantPages = Math.ceil(
    (filterProducts.filteredProducts
      ? filterProducts.filteredProducts.length
      : filterProducts.length) / cantProdcutsForPage
  )
  const dataSlice = filterProducts.filteredProducts
    ? filterProducts.filteredProducts.slice(start, end)
    : filterProducts.slice(start, end)

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllCategories())

    const searchParams = new URLSearchParams(window.location.search)
    const collectionStatus = searchParams.get("collection_status")

    if (collectionStatus === "approved") {
      localStorage.removeItem("cartProducts")
      alertAcept(
        "success",
        "Successful purchase!",
        "Thank you for your purchase, we will send you the details in your email"
      )
    } else if (collectionStatus === "rejected") {
      alertAcept(
        "error",
        "Rejected purcharse!",
        "Ops, it ocurred that the purchase was rejected"
      )
    }

    Promise.all([dispatch(getAllProducts()), dispatch(getAllCategories())])
      .then(() => {
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error loading data:", error)
        setLoading(false)
      })
  }, [dispatch])

  const toggleCategoryMenu = () => {
    setCategoryMenuOpen(!categoryMenuOpen)
  }

  const handleRangeChange = (newRange) => {
    setRange(newRange)
    setFilters({ ...filter, maxPrice: newRange[1], minPrice: newRange[0] })
    dispatch(
      applyFilters({ ...filter, maxPrice: newRange[1], minPrice: newRange[0] })
    )
  }

  const handleFilterCategory = (event) => {
    const { value, name, checked } = event.target
    let updatedCategories = [...filter.categories]
    if (checked) {
      updatedCategories.push(Number(value))
    } else {
      updatedCategories = updatedCategories.filter(
        (category) => category !== Number(value)
      )
    }
    setFilters({ ...filter, [name]: updatedCategories })
    dispatch(applyFilters({ ...filter, [name]: updatedCategories }))
  }

  const handleSortChange = (event) => {
    const { name, value } = event.target
    setFilters({ ...filter, [name]: value })
    dispatch(applyFilters({ ...filter, [name]: value }))
  }

  const handleBestSellersChange = (event) => {
    const { name, checked } = event.target
    setFilters({ ...filter, [name]: checked })
    dispatch(applyFilters({ ...filter, [name]: checked }))
  }

  const handleSearch = (searchTerm) => {
    setFilters({ ...filter, name: searchTerm })
    dispatch(applyFilters({ ...filter, name: searchTerm }))
  }

  const clearSearchTerm = () => {
    setSearchTerm("")
  }

  const categoryOptionsAnimation = useSpring({
    height: categoryMenuOpen ? "auto" : 0,
    opacity: categoryMenuOpen ? 1 : 0,
  })

  return (
    <>
      {loading === true ? (
        <div className={style.prodsContLoader}>
          <img src={loader} alt="Loader"></img>
        </div>
      ) : (
        <>
          <main className={style.prodsParent}>
            <section className={style.filters}>
              <label className={style.bestSeller}>
                <input
                  type="checkbox"
                  name="bestSeller"
                  checked={filter.bestSeller}
                  onChange={handleBestSellersChange}
                  className={style.checkbox}
                />
                Best Sellers
              </label>

              <select
                name="sortBy"
                value={filter.sortBy}
                onChange={handleSortChange}
              >
                <option value="">No sorting</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
              </select>

              <div className={style.searchBarContainer}>
                <SearchBar
                  onSearch={handleSearch}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  clearSearchTerm={clearSearchTerm}
                />
              </div>

              <div className={style.rangeSlider}>
                ${range[0]}
                <Slider className={style.rcSlider}
                  range
                  min={0}
                  max={200}
                  value={range}
                  onChange={handleRangeChange}
                  railStyle={{ backgroundColor: "#D0E1D6" }}
                  trackStyle={{ backgroundColor: "#8CB799" }}
                  handleStyle={{
                    backgroundColor: "#8CB799",
                    border: "2px solid #8CB799",
                    boxShadow: "0 0 0 1px #D0E1D6",
                  }}
                />
                ${range[1]}
              </div>

              <div className={style.collapsiveList}>
                <div>Category</div>
                {categoryMenuOpen ? (
                  <IoMdArrowUp onClick={toggleCategoryMenu} />
                ) : (
                  <IoMdArrowDown onClick={toggleCategoryMenu} />
                )}
              </div>
              <animated.div
                className={` ${style.filtersCategOpt} ${
                  categoryMenuOpen
                    ? `${style.filtersCategOpt}`
                    : `${style.filtersCategOptClose}`
                }`}
                style={categoryOptionsAnimation}
              >
                {allCategories.map((category) => (
                  <label key={category.id}>
                    <input
                      value={category.id}
                      name="categories"
                      type="checkbox"
                      checked={filter.categories.includes(category.id)}
                      onChange={handleFilterCategory}
                    />
                    {category.name}
                  </label>
                ))}
              </animated.div>
            </section>
            <section className={`${style.prodsGrid}`}>
              {dataSlice.length === 0 ? (
                <img src={ops} alt="not found" width="20%" height="auto" />
              ) : (
                <>
                  {dataSlice.map(
                    (product) =>
                      product.active === true && (
                        <Product
                          key={product.id}
                          id={product.id}
                          name={product.name}
                          rating={product.rating}
                          description={product.description}
                          price={product.price}
                          image={product.image}
                          active={product.active}
                        />
                      )
                  )}
                </>
              )}
            </section>
          </main>
            <Pagination numPage={numPageState} cantPage={cantPages} />
        </>
      )}
    </>
  )
}
