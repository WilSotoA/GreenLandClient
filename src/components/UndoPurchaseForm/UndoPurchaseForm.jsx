import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { undoPurchaseForm } from "../../redux/action";
import { alertConfirm, alertAcept } from "../SweetAlert/SweetAlert";
import styles from "./UndoPurchaseForm.module.css";

const { VITE_SERVER_URL } = import.meta.env;

export const UndoPurchaseForm = () => {
  const auth = useSelector((state) => state.authData);
  const userId = auth.userId;
  const [name, setName] = useState(auth.name || "");
  const [email, setEmail] = useState(auth.email || "");
  const [orderNumber, setOrderNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const dispatch = useDispatch();

  useEffect(() => {
    // Realizar la solicitud al servidor para obtener los datos del usuario
    axios
    .get(`${VITE_SERVER_URL}/user/${userId}`)
    .then((response) => {
        // Actualizar los estados con los datos del usuario
        setName(response.data.name);
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.error("Error getting user data:", error);
      });
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${VITE_SERVER_URL}/orders/undo-purchase`, 
        {
        userId: userId, 
        orderNumber: orderNumber, 
        message: message, 
      }, config);

      if (response.status === 200) {
        alertConfirm(
          "The claim has been submitted. You will receive a confirmation email."
        );
        dispatch(undoPurchaseForm());
      } else {
        alertAcept(
          "An error occurred while submitting the claim. Please try again."
        );
      }
    } catch (error) {
        alertAcept(
            "An error occurred while submitting the claim. Please try again",
            error.response?.data?.error || error.message
      );
    }

    setIsSubmitting(false);
  };

  return (
    <div className={styles.undoPurchaseFormContainer}>
      <h2 className={styles.undoPurchaseFormHeading}>Undo purchase form</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.undoPurchaseFormLabel}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={styles.undoPurchaseFormInput}
            required
          />
        </label>
        <label className={styles.undoPurchaseFormLabel}>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={styles.undoPurchaseFormInput}
            required
          />
        </label>
        <label className={styles.undoPurchaseFormLabel}>
          Order number:
          <input
            type="text"
            value={orderNumber}
            onChange={(event) => setOrderNumber(event.target.value)}
            className={styles.undoPurchaseFormInput}
            required
          />
        </label>
        <label className={styles.undoPurchaseFormLabel}>
          Message:
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={styles.undoPurchaseFormTextarea}
            maxLength={200}
            required
          />
        </label>
        <button
          type="submit"
          className={styles.undoPurchaseFormButton}
          disabled={isSubmitting}
        >
          Submit
        </button>
      </form>
      {submissionMessage && (
        <p className={styles.undoPurchaseFormMessage}>{submissionMessage}</p>
      )}
    </div>
  );
};

