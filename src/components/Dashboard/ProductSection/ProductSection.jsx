import React, { useEffect, useState } from 'react'
import style from './ProductSection.module.css'
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

export const ProductSection = () => {
  const auth = useSelector((state) => state.authData);

  const [rows, setRows] = useState([])
  const [statusUser, setstatusUSer] = useState("")
  const [inputsChange, setInputsChange] = useState({
    inputPrice: "",
    inputStock: "",
  })

  const token = JSON.parse(localStorage.getItem('profile'))?.token || null;

  const dataProducts = async () => {
    try {
      const allUsers = await axios.get(`${VITE_SERVER_URL}/products`, {
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

  const updateActive = async (id, formDataToSend) => {
    try {
      await axios.patch(`${VITE_SERVER_URL}/products/${id}`, formDataToSend, {
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

  useEffect(() => {
    dataProducts()
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
    updateActive(id, formDataToSend);
  }

  const handleChangePrice = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setInputsChange((statePrev) => ({
      ...statePrev,
      inputPrice: value,
    }))
  }
  const handleKeyPressPrice = (event) => {

    const priceUpdate = inputsChange.inputPrice;
    if (event.key === 'Enter') {
      if (priceUpdate <= 0) { alertAcept("error", "Update Price", `the price ${priceUpdate} is invalid`) }
      if (priceUpdate > 0) { alert("envia actualizacion a bd "); setstatusUSer(true)}

    }
  }




  return (
    <div className={style.CustomerSection}>
      <h1>Products</h1>
      <div className={style.Table}>

        <TableContainer
          // component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className={style.head}>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="left">price</TableCell>
                <TableCell align="left">stock</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white", backgroundColor: "transparent" }}>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  className={style.tableRowContainer}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img className={style.imageProduct} src={row.image} alt='product photo' >
                    </img>
                  </TableCell>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="left">
                    <label >USD  </label>
                    <input
                      id='numberPrice'
                      className={style.inputs}
                      type="Number"
                      placeholder={row.price}
                      min="1"
                      onChange={handleChangePrice}
                      onKeyPress={handleKeyPressPrice}
                    >
                    </input>
                  </TableCell>
                  <TableCell align="left">
                    <input
                      type="Number"
                      placeholder={row.stock}
                      // ref={quantityInputRef}
                      min="1"
                      max={row.stock}
                    // onChange={handleQuantity}
                    >
                    </input>
                  </TableCell>
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