import { useDispatch, useSelector } from "react-redux"
import { BsFillBagCheckFill } from "react-icons/bs"
import { PiUserCircleFill } from "react-icons/pi"
import { RiLockPasswordFill } from "react-icons/ri"
import { FaUserCog } from "react-icons/fa"
import { getOrdersPerUser } from "../../redux/action"
import { MdOutlineError } from "react-icons/md"
import React, { useEffect, useState } from "react"
import style from "./UserProfile.module.css"
import countries from "countries-list"
import axios from "axios"
const { VITE_SERVER_URL } = import.meta.env

export const UserProfile = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.authData)
  const tabs = [
    { name: "Account Profile", icon: <FaUserCog /> },
    { name: "Order History", icon: <BsFillBagCheckFill /> },
    { name: "Change Password", icon: <RiLockPasswordFill /> },
  ]
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [formData, setFormData] = useState({
    name: auth?.name || "",
    email: auth?.email || "",
    genre: "",
    birth_date: "",
    phone_number: "",
    country: "",
    address: "",
    image: null,
  })
  const [password, setPassword] = useState({
    newPassword: null,
    confirmNewPassword: null,
  })

  const countryOptions = Object.keys(countries.countries).map((countryCode) => (
    <option key={countryCode} value={countryCode.name}>
      {countries.countries[countryCode].name}
    </option>
  ))

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
  }

  const handlePassword = (event) => {
    const { name, value } = event.target

    setPassword({
      ...password,
      [name]: value,
    })
  }
  console.log(formData)
  const handleSubmit = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("profile"))?.token
      const { data } = await axios.patch(
        `${VITE_SERVER_URL}/users/${auth.id}`,
        {
          formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (data.user) {
        // Si la respuesta tiene un campo "message", puedes usarlo
        console.log("mensajeee de que enter")
        alert("Mensaje: " + data.user)
      } else {
        // Si la respuesta no tiene un campo "message", muestra un mensaje genérico
        alert("Operación exitosa.")
      }
    } catch (error) {
      alert("error: " + error.response.data.error)
    }
  }

  const handleSubmitPass = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("profile"))?.token
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
    } catch (error) {
      alert("error: " + error.response.data.error)
    }

    setPassword({
      newPassword: null,
      confirmNewPassword: null,
    })
  }

  const isFormDataComplete = () => {
    const requiredFields = [
      "name",
      "genre",
      "birth_date",
      "phone_number",
      "country",
      "address",
    ]

    return requiredFields.every((field) => !!formData[field])
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
        <h1>{auth?.name}</h1>
        <h2>{auth?.email}</h2>
      </div>
      <div className={style.userDetailCont}>
        <form onSubmit={handleSubmit}>
          <div className={`${style.input} ${style.inputRow}`}>
            <label>Full Name</label>
            <input
              type="text"
              value={formData.name || ""}
              name="name"
              onChange={handleInputs}
            ></input>
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
            </div>
            <div className={style.input}>
              <label>Date of Birth</label>
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleInputs}
              ></input>
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
            </div>
          </div>

          <div className={`${style.input} ${style.inputRow}`}>
            <label>Address</label>
            <input
              type="text"
              value={formData.address}
              placeholder="Whashington 123"
              name="address"
              onChange={handleInputs}
            ></input>
          </div>

          {isFormDataComplete() ? null : (
            <div className={style.errorMessage}>
              <MdOutlineError /> &nbsp; Please complete all fields
            </div>
          )}
          <button disabled={!isFormDataComplete()}>Save Changes</button>
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
        </div>
        <div className={style.input}>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={password.confirmNewPassword}
            onChange={handlePassword}
          ></input>
        </div>
        <button type="submit">Change password</button>
      </form>
    </div>,
  ]

  const handleTabClick = (tabIndex) => {
    setActiveTabIndex(tabIndex)
  }

  useEffect(() => {
    dispatch(getOrdersPerUser(auth?.id))
  }, [dispatch])

  return (
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
  )
}
