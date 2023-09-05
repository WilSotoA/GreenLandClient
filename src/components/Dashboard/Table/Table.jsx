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
import style from './Table.module.css'


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
export const RecentOrders = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authData);

  useEffect(() => {
    dispatch(getAllOrders(auth?.id));
  }, [dispatch]);


  
  const sortedOrders = auth?.allOrders
  ? [...auth.allOrders].sort((a, b) => parseInt(b.orden.id) - parseInt(a.orden.id))
  : [];
  const recentOrders = sortedOrders.slice(0, 5);
  
    return (
      <div className={style.OrderSection}>
        <h1>Recent Orders</h1>
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
                  recentOrders.map((order) => (
                    <TableRow key={order.orden.id}>
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
                      <span className={style.status} style={makeStyle(order.orden.status)}>{order.orden.status}</span></TableCell>
                      <TableCell>{order.orden.user.id}</TableCell>
                      <TableCell>{order.orden.user.name}</TableCell>
                      <TableCell>{order.orden.user.email}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  };

/*

  const recentOrders = auth?.allOrders
    ? auth.allOrders.slice(0, 5)
    : [];

  return (
    <div className={style.RecentOrders}>
      <h1>Recent Orders</h1>
      <div className={style.Table}>
        <TableContainer
          // component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
           
            <TableBody
              style={{ color: "white", backgroundColor: "transparent" }}
            >
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

*/