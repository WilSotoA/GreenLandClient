import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BsFillBagCheckFill } from "react-icons/bs"
import { PiUserCircleFill } from "react-icons/pi"
import { RiLockPasswordFill } from "react-icons/ri"
import { FaUserCog } from "react-icons/fa"
import { authData, getOrdersPerUser } from "../../redux/action"
import { MdOutlineError } from "react-icons/md"
import { alertAcept } from "../SweetAlert/SweetAlert"
import axios from "axios"
import style from "./UserProfile.module.css"
import loader from "../../assets/loaderGif.gif"
import countries from "countries-list"
import Validation from "./Validation"
import ValidationPass from "./ValidationPass"
const { VITE_SERVER_URL } = import.meta.env

export const UserProfile = () => {
  const dispatch = useDispatch()
  const profile = JSON.parse(localStorage.getItem("profile")) || []
  const auth = useSelector((state) => state.authData)
  const [loading, setLoading] = useState(false)
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [errors, setErrors] = useState({})
  const [errorsPass, setErrorsPass] = useState({})
  const [formData, setFormData] = useState({
    name: profile?.user?.name || "",
    genre: profile?.user?.genre || "None",
    birth_date: profile?.user?.birth_date || Date(),
    phone_number: profile?.user?.phone_number || "",
    country: profile?.user?.country || "None",
    address: profile?.user?.address || "",
    image: null,
  })
  const [password, setPassword] = useState({
    newPassword: null,
    confirmNewPassword: null,
  })
  const tabs = [
    { name: "Account Profile", icon: <FaUserCog /> },
    { name: "Order History", icon: <BsFillBagCheckFill /> },
    { name: "Change Password", icon: <RiLockPasswordFill /> },
  ]

  const countryOptions = Object.keys(countries.countries).map((countryCode) => (
    <option key={countryCode} value={countryCode.name}>
      {countries.countries[countryCode].name}
    </option>
  ))

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

  const handlePassword = (event) => {
    const { name, value } = event.target

    setPassword({
      ...password,
      [name]: value,
    })

    setErrorsPass(
      ValidationPass({
        ...password,
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
        `${VITE_SERVER_URL}/users/${auth.id}`,
        combinedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setLoading(false)

      const newProfileAuth = {
        token: token,
        user: {
          id: data?.id,
          name: data?.name,
          email: data?.email,
          image: data?.image,
          genre: data?.genre,
          birth_date: data?.birth_date,
          phone_number: data?.phone_number,
          country: data?.country,
          address: data?.address,
          roleId: data?.role?.id,
        },
      }

      localStorage.setItem("profile", JSON.stringify(newProfileAuth))
      dispatch(authData(newProfileAuth))
      alertAcept("great", "Changes Updated Successfully!")
    } catch (error) {
      setLoading(false)
      alertAcept(
        "error",
        "Could not update changes!",
        error.response?.data?.error || error.message
      )
      console.error(error)
    }
  }

  const handleSubmitPass = async (event) => {
    event.preventDefault()
    const token = JSON.parse(localStorage.getItem("profile"))?.token
    setLoading(true)
    try {
      const { data } = await axios.post(
        `${VITE_SERVER_URL}/users/updatePassword`,
        {
          confirmNewPassword: password.confirmNewPassword,
          newPassword: password.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setLoading(false)
      alertAcept("great", "Password Updated")
    } catch (error) {
      setLoading(false)
      alertAcept(
        "error",
        "Could not update changes!",
        error.response?.data?.error || error.message
      )
      console.error(error)
    }

    setPassword({
      newPassword: null,
      confirmNewPassword: null,
    })
  }

  const handleTabClick = (tabIndex) => {
    setActiveTabIndex(tabIndex)
  }

  const tabContents = [
    <div className={style.userInfoGrid}>
      <div className={style.userPhotoCont}>
        {auth?.image ? (
          <>
            <div className={style.photoContainer}>
              <img src={auth.image} alt="userPhoto" />
              <div className={style.overlay}>
                <input type="file" name="image" onChange={handleInputs}></input>
              </div>
            </div>
          </>
        ) : (
          <PiUserCircleFill size={100} />
        )}
        <h1>{auth?.name && capitalizeWords(auth?.name)}</h1>
        <h2>{auth?.email}</h2>
      </div>
      <div className={style.userDetailCont}>
        <form className={style.forms} onSubmit={handleSubmit}>
          <div className={`${style.input} ${style.inputRow}`}>
            <label>Full Name</label>
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
              <label>Genre</label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleInputs}
              >
                <option value="None">None</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
              {errors.genre && (
                <div className={style.errorMessage}>
                  <MdOutlineError className={style.customErrorIcon} /> &nbsp;{" "}
                  {errors.genre}
                </div>
              )}
            </div>
            <div className={style.input}>
              <label>Date of Birth</label>
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleInputs}
              ></input>
              {errors.birth_date && (
                <div className={style.errorMessage}>
                  <MdOutlineError className={style.customErrorIcon} /> &nbsp;{" "}
                  {errors.birth_date}
                </div>
              )}
            </div>
          </div>

          <div className={style.formRow}>
            <div className={style.input}>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                placeholder="(+51) 555 555 555"
                onChange={handleInputs}
              ></input>
              {errors.phone_number && (
                <div className={style.errorMessage}>
                  <MdOutlineError className={style.customErrorIcon} /> &nbsp;{" "}
                  {errors.phone_number}
                </div>
              )}
            </div>
            <div className={style.input}>
              <label>Country</label>
              <select
                value={formData.country}
                name="country"
                onChange={handleInputs}
              >
                <option value="None">Select a country</option>
                {countryOptions}
              </select>
              {errors.country && (
                <div className={style.errorMessage}>
                  <MdOutlineError className={style.customErrorIcon} /> &nbsp;{" "}
                  {errors.country}
                </div>
              )}
            </div>
          </div>

          <div className={`${style.input} ${style.inputRow}`}>
            <label>Address</label>
            <input
              type="text"
              value={formData.address}
              placeholder="Whashington 123 - G2"
              name="address"
              onChange={handleInputs}
            ></input>
            {errors.address && (
              <div className={style.errorMessage}>
                <MdOutlineError className={style.customErrorIcon} /> &nbsp;{" "}
                {errors.address}
              </div>
            )}
          </div>

          <button disabled={Object.keys(errors).length > 0}>
            Save Changes
          </button>
        </form>
      </div>
    </div>,
    <div className={style.orderContainer}>
      {auth?.orders?.length > 0 ? (
        auth.orders.map((order) => (
          <div className={style.orderRowContainer} key={order.id}>
            <div className={style.orderRow}>
              <h1>Order ID</h1>
              <h2>{order.id.toString().padStart(8, "0")}</h2>
            </div>

            <div className={style.orderRow}>
              <h1>Date</h1>
              <h2>{order.date}</h2>
            </div>

            <div className={style.orderRow}>
              <h1>Total Price</h1>
              <h2>${order.totalPrice}</h2>
            </div>

            <div className={style.orderRow}>
              <h1>Status Order</h1>
              <h2>{order.status}</h2>
            </div>
          </div>
        ))
      ) : (
        <span>You haven't made any purchases yet.</span>
      )}
    </div>,
    <div className={style.passwordContainer}>
      <form className={style.formPassword} onSubmit={handleSubmitPass}>
        <div className={style.input}>
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={password.newPassword}
            onChange={handlePassword}
          ></input>
          {errorsPass.newPassword && (
            <div className={style.errorMessage}>
              <MdOutlineError className={style.customErrorIcon} /> &nbsp;{" "}
              {errorsPass.newPassword}
            </div>
          )}
        </div>
        <div className={style.input}>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={password.confirmNewPassword}
            onChange={handlePassword}
          ></input>
          {errorsPass.confirmNewPassword && (
            <div className={style.errorMessage}>
              <MdOutlineError className={style.customErrorIcon} /> &nbsp;{" "}
              {errorsPass.confirmNewPassword}
            </div>
          )}
        </div>
        <button type="submit" disabled={Object.keys(errorsPass).length > 0}>
          Change password
        </button>
      </form>
    </div>,
  ]

  useEffect(() => {
    dispatch(getOrdersPerUser(profile?.user?.id))
    setErrors(
      Validation({
        ...formData,
      })
    )
  }, [dispatch])

  return (
    <>
      {loading ? (
        <img className={style.loader} src={loader} alt="loader" />
      ) : (
        <div className={style.content}>
          <ul className={style.tabContainer} role="tablist">
            {tabs.map((tab, index) => (
              <li
                className={`${style.tab} ${
                  activeTabIndex === index ? style.tabActive : ""
                }`}
                key={index}
              >
                <a
                  className={`${style.link} ${
                    activeTabIndex === index ? style.linkActive : ""
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
