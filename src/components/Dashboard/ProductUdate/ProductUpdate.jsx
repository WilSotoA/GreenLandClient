import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PiUserCircleFill } from "react-icons/pi"
import { RiLockPasswordFill } from "react-icons/ri"
import { FaUserCog } from "react-icons/fa"
import { authData, getOrdersPerUser } from "../../../redux/action"
import { MdOutlineError } from "react-icons/md"
import { alertAcept } from "../../SweetAlert/SweetAlert"
import axios from "axios"
import style from "./ProductUpdate.module.css"
import loader from "../../../assets/loaderGif.gif"
import countries from "countries-list"
import Validation from "./Validation"
import ValidationPass from "./ValidationPass"
const { VITE_SERVER_URL } = import.meta.env

export const ProductUpdate = ({ row }) => {
  const dispatch = useDispatch()
  const profile = JSON.parse(localStorage.getItem("profile")) || []

  const auth = useSelector((state) => state.authData)
  const [loading, setLoading] = useState(false)
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: row.name || "",
    price: row.price || "",
    stock: row.stock || "",
    active: row.active || "",
    description: row.description || "",
    image: null,
  })

  const tabs = [
    { name: "Account Profile", icon: <FaUserCog /> },
  ]

  const capitalizeWords = (string) => {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const handleInputs = (event) => {
    const { name, value, files } = event.target
    if (String(name) !== "image") {
      setFormData({
        ...formData,
        [name]: value,
      })
    } else {
      setFormData({
        ...formData,
        [name]: files[0],
      })
    }

    setErrors(
      Validation({
        ...formData,
        [event.target.name]: event.target.value,
      })
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const combinedFormData = new FormData()
    for (const key in formData) {
      const value = formData[key]
      if (value !== null && value !== "") {
        combinedFormData.append(key, value)
      }
    }
    const token = JSON.parse(localStorage.getItem("profile"))?.token
    setLoading(true)

    try {
      const { data } = await axios.patch(
        `${VITE_SERVER_URL}/products/${row.id}`,
        combinedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setLoading(false)
      alertAcept("success", "Update Product", "Changes Updated Successfully!")
    } catch (error) {
      setLoading(false)
      alertAcept(
        "error", "Update Product",
        "Could not update changes!",
        error.response?.data?.error || error.message
      )
      console.error(error)
    }
  }

  const handleTabClick = (tabIndex) => {
    setActiveTabIndex(tabIndex)
  }

  const tabContents = [
    <div className={style.userInfoGrid}>
      <div className={style.userPhotoCont}>
        {row.image ? (
          <>
            <div className={style.photoContainer}>
              <img src={row.image} alt="ProductPhoto" />
              <div className={style.overlay}>
                <input type="file" name="image" onChange={handleInputs}></input>
              </div>
            </div>
          </>
        ) : (
          <PiUserCircleFill size={1000} />
        )}
        <h1>{row.name && capitalizeWords(row.name)}</h1>
      </div>

      <div className={style.userDetailCont}>
        <form className={style.forms} onSubmit={handleSubmit}>
          <div className={`${style.input} ${style.inputRow}`}>
            <label>Name Product</label>
            <input
              type="text"
              value={capitalizeWords(formData.name)}
              name="name"
              onChange={handleInputs}
            ></input>
            {errors.name && (
              <div className={style.errorMessage}>
                <MdOutlineError className={style.customErrorIcon} /> &nbsp;{" "}
                {errors.name}
              </div>
            )}
          </div>

          <div className={style.formRow}>
            <div className={style.input}>
              <label>Price</label>
              <input
                type="Number"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleInputs}
              >
              </input>
              {errors.price && (
                <div className={style.errorMessage}>
                  <MdOutlineError className={style.customErrorIcon} /> &nbsp;{" "}
                  {errors.price}
                </div>
              )}
            </div>

            <div className={style.input}>
              <label>Stock</label>
              <input
                type="Number"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleInputs}
              ></input>
              {errors.stock && (
                <div className={style.errorMessage}>
                  <MdOutlineError className={style.customErrorIcon} /> &nbsp;{" "}
                  {errors.stock}
                </div>
              )}
            </div>
          </div>

          <div className={style.formRow}>
            <div className={style.input}>
              {/* <label>Phone Number</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                placeholder="(+51) 555 555 555"
                onChange={handleInputs}
              ></input> */}
              {errors.phone_number && (
                <div className={style.errorMessage}>
                  <MdOutlineError className={style.customErrorIcon} /> &nbsp;{" "}
                  {errors.phone_number}
                </div>
              )}
            </div>

            <div className={style.input}>
              <label>State</label>
              <select
                value={formData.active}
                name="active"
                onChange={handleInputs}
              >
                <option value="true">Activated</option>
                <option value="false">Disabled</option>
              </select>
              {errors.active && (
                <div className={style.errorMessage}>
                  <MdOutlineError className={style.customErrorIcon} /> &nbsp;{" "}
                  {errors.active}
                </div>
              )}
            </div>
          </div>

          <div className={`${style.input} ${style.inputRow}`}>
            <label>Description</label>
            <input
              type="textarea"
              value={formData.description}
              // placeholder="Whashington 123 - G2"
              name="description"
              onChange={handleInputs}
            ></input>
            {errors.description && (
              <div className={style.errorMessage}>
                <MdOutlineError className={style.customErrorIcon} /> &nbsp;{" "}
                {errors.description}
              </div>
            )}
          </div>

          <button disabled={Object.keys(errors).length > 0}>
            Save Changes
          </button>
        </form>
      </div>
    </div>

  ]

  return (
    <>
      {loading ? (
        <img className={style.loader} src={loader} alt="loader" />
      ) : (
        <div className={style.content}>
          <ul className={style.tabContainer} role="tablist">
            {tabs.map((tab, index) => (
              <li
                className={`${style.tab} ${activeTabIndex === index ? style.tabActive : ""
                  }`}
                key={index}
              >
                <a
                  className={`${style.link} ${activeTabIndex === index ? style.linkActive : ""
                    }`}
                  onClick={() => handleTabClick(index)}
                >
                  {tab.icon}
                  <span className={style.tabName}>{tab.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className={style.tabContent}>{tabContents[activeTabIndex]}</div>
        </div>
      )}
    </>
  )
}
