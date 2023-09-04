import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Popover,
  Typography,
  Pagination,
  TextField,
} from "@mui/material";
import { getAllOrders } from "../../../redux/action";
import style from "./OrderSection.module.css";

const makeStyle = (status) => {
  if (String(status) === "approved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
      padding: "5px 20px 5px 20px",
    };
  } else if (String(status) === "pending") {
    return {
      background: "#ffadad8f",
      color: "red",
      padding: "5px 20px 5px 20px",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};

export const OrderSection = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authData);
  const [showDetails, setShowDetails] = useState(false);
  const [popoverState, setPopoverState] = useState({});
  const [detailButtonState, setDetailButtonState] = useState({});
  const [page, setPage] = useState(1); // Página actual
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 7; // Cantidad de elementos por págin

  useEffect(() => {
    dispatch(getAllOrders(auth?.id));
  }, [dispatch]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const toggleDetailOrders = (orderId) => {
    setPopoverState({
      ...popoverState,
      [orderId]: !popoverState[orderId],
    });
    setDetailButtonState({
      ...detailButtonState,
      [orderId]: true,
    });
  };

  const handleClose = (orderId) => {
    setPopoverState({
      ...popoverState,
      [orderId]: false,
    });
    setDetailButtonState({
      ...detailButtonState,
      [orderId]: false,
    });
  };

  const filteredOrders = auth?.allOrders?.filter(
    (order) =>
      order.orden.id.toString() === searchTerm ||
      order.orden.totalPrice.toString() === searchTerm ||
      order.orden.status.includes(searchTerm) ||
      order.orden.user.name.includes(searchTerm) ||
      order.orden.user.email.toString() === searchTerm
  );

  //Paginate
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  let paginatedOrders = [];
  if (filteredOrders) {
    paginatedOrders = filteredOrders.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
  }
  /*
const paginatedOrders = filteredOrders.slice(
  (page - 1) * itemsPerPage,
  page * itemsPerPage
);
*/
  return (
    <div className={style.OrderSection}>
      <h1>Orders</h1>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={style.searchBar}
        style={{ marginBottom: "10px", width: "90%" }}
      />
      <div className={style.Table}>
        <TableContainer
          // component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className={style.head}>
                <TableCell>ID</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">User</TableCell>
                <TableCell align="left">Products</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              style={{ color: "white", backgroundColor: "transparent" }}
            >
              {paginatedOrders?.length > 0 &&
                paginatedOrders.map((order) => (
                  <TableRow key={order.orden.id} className={style.rowHeight}>
                    <TableCell>{order.orden.id}</TableCell>
                    <TableCell>
                      {new Date(order.orden.date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>{order.orden.totalPrice}</TableCell>
                    <TableCell>
                      <span
                        className={style.status}
                        style={makeStyle(order.orden.status)}
                      >
                        {order.orden.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {showDetails ? (
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={toggleDetails}
                        >
                          ID: {order.orden.user.id}
                          <br />
                          Name: {order.orden.user.name}
                          <br />
                          Email: {order.orden.user.email}
                          <br />
                        </div>
                      ) : (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={toggleDetails}
                        >
                          Details
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => toggleDetailOrders(order.orden.id)}
                        style={{
                          backgroundColor: detailButtonState[order.orden.id]
                            ? "green"
                            : "transparent",
                          color: detailButtonState[order.orden.id]
                            ? "white"
                            : "#1976d2",
                        }}
                      >
                        Details
                      </Button>
                      <Popover
                        open={Boolean(popoverState[order.orden.id])}
                        anchorEl={popoverState[order.orden.id]}
                        onClose={() => handleClose(order.orden.id)}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div style={{ padding: "10px" }}>
                          <Typography variant="h6">Order details</Typography>
                          {order.detail.map((item, index) => (
                            <div key={index}>
                              ID: {item.id}
                              <br />
                              Product: {item.product.name}
                              <br />
                              Quantity: {item.quantity}
                              <br />
                              Price: {item.price}
                              <br />
                            </div>
                          ))}
                        </div>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          count={Math.ceil(auth?.allOrders?.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          className={style.Pagination}
          style={{ marginTop: "10px auto", textAlign: "center" }}
        />
      </div>
    </div>
  );
};
