import React, { useEffect, useState } from 'react'
import style from './CustomerSection.module.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const { VITE_SERVER_URL } = import.meta.env;

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { alertAcept } from '../../SweetAlert/SweetAlert';


const makeStyle = (status) => {
  // console.log(status);
  if (String(status) === 'true') {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
      padding: '5px 20px 5px 20px',
    }
  }
  else if (String(status) === 'false') {
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

export const CustomerSection = () => {
  const auth = useSelector((state) => state.authData);

  const [rows, setRows] = useState([])
  const [statusUser, setstatusUSer] = useState("")

  const token = JSON.parse(localStorage.getItem('profile'))?.token || null;

  const dataUsers = async () => {
    try {
      const allUsers = await axios.get(`${VITE_SERVER_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setRows(allUsers.data);
    } catch (error) {
      console.log("ERRRRORRerror", error);
      alertAcept("error", "Error Users", error.response?.data?.error.name || error.message);
    }
  }
  useEffect(() => {    
    dataUsers()
  }, [statusUser])
  
  const handleStatus = (event) => {
    event.preventDefault();
    let status = ""
    const id = event.target.id
    const value = event.target.value
    if (value === 'true') {
      status = false      
    }
    else {
      status = true
    }
    const formDataToSend = new FormData();
    formDataToSend.append("active", status);
    setstatusUSer(formDataToSend)
    updateActive(id,formDataToSend);
  }
  
 


  const updateActive = async (id,formDataToSend) => {
    try {
      await axios.patch(`${VITE_SERVER_URL}/users/${id}`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      alertAcept("success", "User Status", "",
      `<p>the user<b>${rows.map((s) => s.id === id && s.name)}</b> was disabled<p>`)
    }
    catch (error) {
      console.log("sms error: ====>", error.message);
    }
  }


  return (
    <div className={style.CustomerSection}>
      <h1>Customers</h1>
    <div className={style.Table}>

      <TableContainer
        // component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className={style.head}>
              <TableCell>Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Origin</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white", backgroundColor: "transparent" }}>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.origin}</TableCell>
                <TableCell align="left">{row.role.name}</TableCell>
                <TableCell align="left">
                  <button type="submit"
                    className={style.buttonstatus}
                    style={makeStyle(row.active)}
                    value={row.active}
                    name={row.name}
                    id={row.id}
                    onClick={handleStatus}
                  >
                    {String(row.active)}
                  </button>
                </TableCell>
                <TableCell align="left" className={style.Details}>
                  <Link to="#" >Details</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </div>
  );
}