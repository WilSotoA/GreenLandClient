import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import style from "./SignUp.module.css"
import axios from "axios"
import { alertAcept } from "../SweetAlert/SweetAlert"
import loader from "../../assets/loaderGif.gif"

import { useSelector } from "react-redux"

const { VITE_SERVER_URL } = import.meta.env
export const SignUp = () => {
  const auth = useSelector((state) => state.authData)
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [agreeToDataProcessing, setAgreeToDataProcessing] = useState(false)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (auth) navigate("/home")
  }, [auth, navigate])

  const regExEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,10}/

  const handleChangeName = (event) => {
    const value = event.target.value
    setName(value)
    if (value.length < 4 || /[^a-zA-Z\s]/.test(value)) {
      setNameError(true)
    } else {
      setNameError(false)
    }
  }

  const handleChangeEmail = (event) => {
    const value = event.target.value
    setEmail(value)

    if (!regExEmail.test(value)) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
  }

  const handleChangePassword = (event) => {
    const value = event.target.value
    setPassword(value)

    if (!regexPassword.test(value)) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }

  const handleChangeConfirmPassword = (event) => {
    const value = event.target.value
    setConfirmPassword(value)

    if (value !== password) {
      setConfirmPasswordError(true)
    } else {
      setConfirmPasswordError(false)
    }
  }

  const handleChangeDataProcessing = () => {
    setAgreeToDataProcessing(!agreeToDataProcessing)
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    setImage(file)
  }

  const handleSignUp = async (event) => {
    event.preventDefault()

    if (name.length < 4 || /[^a-zA-Z\s]/.test(name)) {
      alertAcept(
        "error",
        "Ops, Error!",
        "Please enter a valid name with at least 4 letters and no special characters."
      )
      return
    }

    if (!regExEmail.test(email)) {
      alertAcept("error", "Ops, Error!", "Please enter a valid email address.")
      return
    }

    if (!regexPassword.test(password)) {
      alertAcept(
        "error",
        "Ops, Error!",
        "Password must be between 6 and 10 characters and contain at least one lowercase letter, one uppercase letter, one number, and one special character."
      )

      return
    }

    if (password !== confirmPassword) {
      alertAcept("error", "Ops, Error!", "Passwords do not match.")
      return
    }

    if (!agreeToDataProcessing) {
      alertAcept(
        "error",
        "Ops, Error!",
        "Please agree to the processing of personal data."
      )
      return
    }
    try {
      //creo una instancia que contruye datos en formato de formulario para enviar por una solicitud http datos al servidor.sweetalert
      const formData = new FormData()
      formData.append("name", name)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("image", image)
      //envio un post al back con los datos del formulario
      setLoading(true)
      const response = await axios.post(`${VITE_SERVER_URL}/users`, formData)
      if (response.status === 200) {
        // registro exitoso, navega a la pag de inicio
        setLoading(false)
        alertAcept(
          "success",
          "User created!",
          "User created successfully, Please check your inbox"
        )
        navigate("/login")
      } else {
        setLoading(false)
        // error en el registro, muestra mensaje de error
        throw new Error("Registration failed.")
      }
    } catch (error) {
      setLoading(false)
      console.error(error.response?.data?.error || error.message)
      alertAcept(
        "error",
        "User not created!",
        error.response?.data?.error || error.message
      )
    } finally {
      setLoading(false)
    }
  }

  const handleLoginOnClick = () => {
    navigate("/login")
  }

  return (
    <div className={`${style.signup} ${style.greenText}`}>
      {loading && (
        <div className={style.prodsContLoader}>
          <img src={loader} alt="Loader"></img>
        </div>
      )}
      <div className={style.backButton}>
        <a href="#" className={`${style.navLink} ${style.chevron}`}>
          Back
        </a>
      </div>
      <h1 className={`${style.centeredText} ${style.getStarted}`}>
        Get started!
      </h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label className={style.formLabel}>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleChangeName}
            className={style.formInput}
          />
          {nameError && (
            <span className={style.errorText}>
              Please enter a valid name with at least 4 letters and no special
              characters.
            </span>
          )}
        </div>

        <div>
          <label className={style.formLabel}>Email Address:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChangeEmail}
            className={style.formInput}
          />
          {emailError && (
            <span className={style.errorText}>
              Please enter a valid email address.
            </span>
          )}
        </div>

        <div>
          <label className={style.formLabel}>Password:</label>
          <input
            type="password"
            className={style.formInput}
            value={password}
            onChange={handleChangePassword}
          />
          {passwordError && (
            <span className={style.errorText}>
              Password must be between 6 and 10 characters and contain at least
              one lowercase letter, one uppercase letter, one number, and one
              special character.
            </span>
          )}
        </div>

        <div>
          <label className={style.formLabel}>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            className={style.formInput}
          />
          {confirmPasswordError && (
            <span className={style.errorText}>Passwords do not match.</span>
          )}
        </div>

        <div>
          <input
            type="checkbox"
            checked={agreeToDataProcessing}
            onChange={handleChangeDataProcessing}
            className={style.formInput1}
          />
          <label className={style.personalData}>
            I agree to the processing of <a href="#">Personal data</a>.
          </label>
        </div>

        <div>
          <label className={style.formLabel}>Upload Image:</label>
          <input
            type="file"
            id="imageUpload"
            onChange={handleImageUpload}
            className={style.formInput}
          />
        </div>
        <button
          type="submit"
          className={`${style.button} ${style.greenButton} ${style.loginButton}`}
        >
          Sign Up
        </button>
      </form>

      <div className={style.login}>
        <p className={style.haveAccount}>Do you have an account? →</p>
        <a href="#" className={style.navLink} onClick={handleLoginOnClick}>
          <hr />
          <span className={style.loginLink}>Login</span>
        </a>
      </div>
    </div>
  )
}
