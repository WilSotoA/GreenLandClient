import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { undoPurchaseForm } from "../../redux/action";
import { alertConfirm, alertAcept } from "../SweetAlert/SweetAlert";
import styles from "./UndoPurchaseForm.module.css";
import loader from "../../assets/loaderGif.gif";

const { VITE_SERVER_URL } = import.meta.env;

export const UndoPurchaseForm = () => {
  const auth = useSelector((state) => state.authData);
  const userId = auth?.id;
  const [name, setName] = useState(auth?.name || "");
  const [email, setEmail] = useState(auth?.email || "");
  const [orderNumber, setOrderNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orders, setOrders] = useState([]);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      axios
        .get(`${VITE_SERVER_URL}/orders/user/${userId}`, config)
        .then((response) => {
          // Actualizar los estados con los datos del usuario
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("Error getting orders:", error);
        });
    }
  }, [config, userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    if (!token) {
      return alertAcept(
        "error",
        "An error occurred while submitting the claim. Please try again",
        "User must be logged"
      );
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${VITE_SERVER_URL}/orders/undo-purchase`,
        {
          userId: userId,
          orderId: orderNumber,
          message: message,
        },
        config
      );
      setLoading(false);
      if (response.status === 200) {
        alertConfirm(
          "success",
          "The claim has been submitted. You will receive a confirmation email."
        );
        dispatch(undoPurchaseForm());
        setMessage("");
      } else {
        alertAcept(
          "error",
          "An error occurred while submitting the claim. Please try again."
        );
      }
    } catch (error) {
      setLoading(false);
      alertAcept(
        "error",
        "An error occurred while submitting the claim. Please try again",
        error.response?.data?.error?.message ||
          error.response?.data?.error ||
          error.message
      );
    }

    setIsSubmitting(false);
  };

  return (
    <>
      {loading === true ? (
        <div className={styles.prodsContLoader}>
          <img src={loader} alt="Loader"></img>
        </div>
      ) : (
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
              <select
                className={styles.undoPurchaseFormInput}
                onChange={(event) => setOrderNumber(event.target.value)}
              >
                <option value="">Select order id</option>
                {orders?.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.id}
                  </option>
                ))}
              </select>
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
            <p className={styles.undoPurchaseFormMessage}>
              {submissionMessage}
            </p>
          )}
        </div>
      )}
    </>
  );
};
