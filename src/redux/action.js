import {
  PREV,
  NEXT,
  GET_ALL_PRODUCTS,
  GET_ALL_CATEGORIES,
  APPLY_FILTERS,
  GET_ID_DETAIL,
  NUM_PAGE,
  GET_ALL_REVIEWS,
  GET_WHISLIST,
  DEL_WHISLIST,
  AUTH,
  LOGOUT,
  GET_ORDERS_PER_USER,
  GET_ALL_ORDERS,
  GET_DETAIL_ORDERS,
  DELETE_REVIEW,
  GET_USERS_ADMIN,
  UNDO_PURCHASE_FORM,
} from "./actionType"

import axios from "axios"
const { VITE_SERVER_URL } = import.meta.env


export const paginatePrev = () => {
  return {
    type: PREV,
  }
}
export const paginateNext = () => {
  return {
    type: NEXT,
  }
}
export const paginateNumPage = (value) => {
  return {
    type: NUM_PAGE,
    payload: value,
  }
}

export const getAllReviews = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${VITE_SERVER_URL}/reviews`)
      dispatch({ type: GET_ALL_REVIEWS, payload: data })
    } catch (error) {
      alert("error: " + error.response.data.error)
    }
  }
}

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${VITE_SERVER_URL}/products`)
      dispatch({ type: GET_ALL_PRODUCTS, payload: data })
    } catch (error) {
      alert("error: " + error.response.data.error)
    }
  }
}

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${VITE_SERVER_URL}/categories`)
      dispatch({ type: GET_ALL_CATEGORIES, payload: data })
    } catch (error) {
      alert("error: " + error.response.data.error)
    }
  }
}

export const applyFilters = (filters) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${VITE_SERVER_URL}/filters`, filters)
      dispatch({ type: APPLY_FILTERS, payload: data })
    } catch (error) {
      alert("error: " + error)
    }
  }
}

export const getIdProduct = (id) => {
  return async function (dispatch) {
    try {
      const dataId = await axios.get(`${VITE_SERVER_URL}/products/${id}`)
      const pruductDetail = dataId.data
      dispatch({
        type: GET_ID_DETAIL,
        payload: pruductDetail,
      })
    } catch (error) {
      alert("error: " + error.response.data.error)
    }
  }
}
export const getWhisList = (id) => {
  return async function (dispatch) {
    try {
      const dataId = await axios.get(`${VITE_SERVER_URL}/products/${id}`)
      const pruductDetail = dataId.data
      dispatch({
        type: GET_WHISLIST,
        payload: pruductDetail,
      })
    } catch (error) {
      alert("error: " + error.response.data.error)
    }
  }
}

export const deleteWhisList = (id) => {
  return {
    type: DEL_WHISLIST,
    payload: id,
  }
}

export const getOrdersPerUser = (userId) => {
  return async function (dispatch) {
    try {
      const token = JSON.parse(localStorage.getItem("profile"))?.token
      const { data } = await axios.get(
        `${VITE_SERVER_URL}/orders/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch({ type: GET_ORDERS_PER_USER, payload: data })
    } catch (error) {
      console.log("error: " + error.response.data.error)
    }
  }
}

export const getAllOrders = () => {
  return async function (dispatch) {
    try {
      const token = JSON.parse(localStorage.getItem("profile"))?.token
      const { data } = await axios.get(`${VITE_SERVER_URL}/orders/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({ type: GET_ALL_ORDERS, payload: data })
    } catch (error) {
      alert("error: " + error.response.data.error)
    }
  }
}

export const getDetailOrders = (orderId) => {
  return async function (dispatch) {
    try {
      const token = JSON.parse(localStorage.getItem("profile"))?.token
      const { data } = await axios.get(`${VITE_SERVER_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({ type: GET_DETAIL_ORDERS, payload: data })
    } catch (error) {
      alert("error: " + error.response.data.error)
    }
  }
}

export const authData = (profile) => {
  return {
    type: AUTH,
    payload: profile,
  }
}

export const logout = () => {
  return {
    type: LOGOUT,
  }
}

export const deleteReview = (reviewId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${VITE_SERVER_URL}/reviews/${reviewId}`);
      dispatch({ type: DELETE_REVIEW, payload: reviewId });
    } catch (error) {
      alert("Error deleting review: " + error.message);
    }
  };
};

export const getUsers = () => {
  return async function (dispatch) {
    try {
      const token = JSON.parse(localStorage.getItem("profile"))?.token || null
      const { data } = await axios.get(`${VITE_SERVER_URL}/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({ type: GET_USERS_ADMIN, payload: data })
    } catch (error) {
      alert("error: " + error.response.data.error)
    }
  }
}

export const undoPurchaseForm = () => {
  return {
    type: UNDO_PURCHASE_FORM,
  };
};