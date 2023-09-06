import React from "react"
import notFound from "../../assets/404.jpg"

export const NotFound404 = () => {
  return (
    <img
      style={{ margin: "0 auto", maxWidth: "80vw", maxHeight: "60vh" }}
      src={notFound}
      alt="notFoundImg"
    />
  )
}
