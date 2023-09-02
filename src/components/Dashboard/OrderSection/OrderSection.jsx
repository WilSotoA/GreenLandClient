import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getAllOrders } from "../../../redux/action";
import style from "./OrderSection.module.css";


const makeStyle = (status) => {
  // console.log(status);
  if (String(status) === 'approved') {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
      padding: '5px 20px 5px 20px',
    }
  }
  else if (String(status) === 'pending') {
    return {
      background: '#ffadad8f',
      color: 'red',
      padding: '5px 20px 5px 20px',
    }
  }
  else {
    return {
      background: '#59bfff',
      color: 'white',
    }
  }
}


export const OrderSection = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authData);


  useEffect(() => {
    dispatch(getAllOrders(auth?.id));
  }, [dispatch]);
  
  console.log("allOrders:", auth?.allOrders);
  return (
    <div className={style.OrderSection}>
      <h1>Orders</h1>
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
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              style={{ color: "white", backgroundColor: "transparent" }}
            >
              {auth?.allOrders?.length > 0 &&
                auth.allOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>{order.totalPrice}</TableCell>
                    <TableCell>
                    <span className={style.status} style={makeStyle(order.status)}>{order.status}</span></TableCell>
                    <TableCell>{order.user.id}</TableCell>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell>{order.user.email}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};