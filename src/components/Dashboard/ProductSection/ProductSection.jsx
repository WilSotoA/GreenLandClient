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
import Button from "@mui/material/Button"
import TextField from '@mui/material/TextField'
import Paper from "@mui/material/Paper";
import { alertAcept } from '../../SweetAlert/SweetAlert';
import { Form } from '../../Form/Form';


const makeStyle = (status) => {
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
  const [updateType, setUpdateType] = useState('') // saber que cambo cambio
  const [statusProduct, setstatusProduct] = useState({
    id: "",
    active: "",
  })
  const [inputsPrice, setInputsPrice] = useState({
    id: "",
    price: "",
  })
  const [inputsStock, setInputsStock] = useState({
    id: "",
    stock: "",
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

  const updateProduct = async (id, dataProducts) => {
    try {
      await axios.patch(`${VITE_SERVER_URL}/products/${id}`, dataProducts, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const x = rows.filter(s => s.id === Number(id) && s.name)
      if (updateType === 'status') {
        if (statusProduct.active === false) {
          alertAcept("success", "Product Disabled", "",
            `<p>the Product<b> ${x.map(s => s.name)} </b> was disabled<p>`)
          setUpdateType("")
        } else {
          alertAcept("success", "Product Enabled", "",
            `<p>the Product<b> ${x.map(s => s.name)} </b> was Enabled<p>`)
          setUpdateType("")
        }
      }
      if (updateType === "price") {
        alertAcept("success", "Update Price Product", "",
          `The product  <b>${x.map((s) => s.name)}</b>  was updated with the price <b>${inputsPrice.price}</b>`)
        setUpdateType("");
      }
      if (updateType === "stock") {
        alertAcept("success", "Update Stock Product", "",
          `The product  <b>${x.map((s) => s.name)}</b> now has a stock of <b>${inputsStock.stock}</b>`)
        setUpdateType("")
      }

    }
    catch (error) {
      console.log("sms error: ====>", error.message);
    }
  }


  const handleStatus = (event) => {
    event.preventDefault();
    const change = 'status'
    const id = event.target.id
    const value = event.target.value
    let status = ""
    if (value === 'true') {
      status = false
    }
    else {
      status = true
    }
    setUpdateType('status'); //dice que se esta cambiando
    setstatusProduct({ id: id, active: status });
  }

  useEffect(() => {
    if (updateType === "status") {
      const DataToSend = new FormData(); //data a enviar 
      DataToSend.append("active", statusProduct.active);
      updateProduct(statusProduct.id, DataToSend);
    }
    if (updateType === "price") {
      const DataToSend = new FormData();
      DataToSend.append("price", inputsPrice.price);
      updateProduct(inputsPrice.id, DataToSend);
    }
    if (updateType === "stock") {
      const DataToSend = new FormData();
      DataToSend.append("stock", inputsStock.stock);
      updateProduct(inputsStock.id, DataToSend);
    }

    dataProducts()
  }, [statusProduct, updateType, inputsPrice])

  const handleKeyPressPrice = (event) => {
    if (event.key === 'Enter') {
      const id = event.target.id;
      const priceUpdate = event.target.value;
      if (priceUpdate > "0") {
        setUpdateType("price")
        setInputsPrice({ id: id, price: priceUpdate })
        const resetinput = document.querySelector(`input[name="inputprice"][id="${id}"]`);
        resetinput.value = ""

      } else {
        alertAcept("error", "Update Price", `the price USD ${priceUpdate} is invalid`, "valor invalido");
        alert("error price")
        const resetinput = document.querySelector(`input[name="inputprice"][id="${id}"]`);
        resetinput.value = ""
      }
    }
  }

  const handleKeyPressStock = (event) => {
    if (event.key === 'Enter') {
      const id = event.target.id;
      const value = event.target.value;
      if (value > 0) {
        setUpdateType('stock')
        setInputsStock({ id: id, stock: value })
        const resetinput = document.querySelector(`input[name="inputstock"][id="${id}"]`);
        resetinput.value = ""

      }
    }
  }
  const [viewForm, setViewForm] = useState(false)
  const handleProduct = (event) => {
    const { id, name } = event.target
    // const use = rows.filter(s => s.id === Number(id) && s)
    // setSelectUser(use)
    if (String(name) === 'close') setViewForm(false)
    if (String(name) === 'form') setViewForm(true)
  }

  const handleDteail = (event) => {

  }

  return (
    <main className={style.CustomerSection}>
      <h1>Products</h1>
      <Table  >
        <TableRow className={style.head}>
          <TextField
            align="center"
            label="Search"
            variant="outlined"
            fullWidth
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className={style.searchBar}
            style={{ marginBottom: "10px", width: "90%" }}
          />
          </TableRow>
        <TableRow className={style.head}>
          <Button
            align="left"
            variant="outlined"
            size="small"
            name="form"
            onClick={handleProduct}
          >
            New Product
          </Button>
        </TableRow>
      </Table>
      <div className={style.Table}>

        <TableContainer
          // component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          {!viewForm ?
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
              <TableBody style={{ broder: "3px solid black", color: "white", backgroundColor: "transparent" }}>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                  // className={style.tableRowContainer}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img className={style.imageProduct} src={row.image} alt='product photo' >
                      </img>
                    </TableCell>
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="left">
                      <label >USD  </label>
                      <input
                        id={row.id}
                        name='inputprice'
                        className={style.inputs}
                        type="Number"
                        placeholder={row.price}
                        min="1"
                        // onChange={handleChangePrice}
                        onKeyDown={handleKeyPressPrice}
                      >
                      </input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        id={row.id}
                        name='inputstock'
                        className={style.inputs}
                        type="Number"
                        placeholder={row.stock}
                        min={row.stock}
                        onKeyDown={handleKeyPressStock}
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
                      <Button
                        align="center"
                        variant="outlined"
                        size="small"
                        name="detail"
                        onClick={handleDteail}
                      >
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            :
            <>
              <Button
                align="center"
                variant="outlined"
                size="small"
                name="close"
                onClick={handleProduct}
              >x
              </Button>
              <Form />
            </>

          }
        </TableContainer>
      </div>
    </main>
  );
}