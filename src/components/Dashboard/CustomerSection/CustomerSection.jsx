import { useEffect, useState } from "react";
import style from "./CustomerSection.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const { VITE_SERVER_URL } = import.meta.env;

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import loader from "../../../assets/loaderGif.gif";

import { alertAcept } from "../../SweetAlert/SweetAlert";
import { UserUpdate } from "../UserUpdate/UserUpdate";
import { getUsers } from "../../../redux/action";

const makeStyle = (status) => {
  // console.log(status);
  if (String(status) === "true") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
      padding: "5px 20px 5px 20px",
    };
  } else if (String(status) === "false") {
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

export const CustomerSection = () => {
  const auth = useSelector((state) => state.authData);

  const [statusUser, setstatusUSer] = useState({
    id: "",
    active: "",
  });
  const [viewdetail, setViewdetail] = useState(false);
  const [selectUser, setSelectUser] = useState({});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (statusUser.active === true || statusUser.active === false) {
      const formDataToSend = new FormData();
      formDataToSend.append("active", statusUser.active);
      updateActive(statusUser.id, formDataToSend);
    }
    // dispatch(getUsers(auth?.id))

    Promise.all([dispatch(getUsers(auth?.id))])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setLoading(false);
      });
  }, [dispatch, statusUser, viewdetail, selectUser]);
  // }, [dispatch])

  const handleStatus = (event) => {
    event.preventDefault();
    let status = "";
    const id = event.target.id;
    const value = event.target.value;
    if (value === "true") {
      status = false;
    } else {
      status = true;
    }
    setstatusUSer({ id: id, active: status });
  };

  const updateActive = async (id, formDataToSend) => {
    const token = JSON.parse(localStorage.getItem("profile"))?.token || null;
    const user = auth?.allUsers?.find((s) => s.id === Number(id) && s.name);
    if (statusUser.active === true) {
      setLoading(true);
      try {
        await axios.patch(`${VITE_SERVER_URL}/users/${id}`, formDataToSend, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alertAcept(
          "success",
          "User Enabled",
          "",
          `<p>the user  <b>${user.name}  </b> was Enabled <p>`
        );
        setstatusUSer({ id: "", active: "" });
        setLoading(false);
      } catch (error) {
        console.log("sms error: ====>", error.message);
        setLoading(false);
      }
    }
    if (statusUser.active === false) {
      try {
        await axios.patch(`${VITE_SERVER_URL}/users/${id}`, formDataToSend, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alertAcept(
          "success",
          "User Disabled",
          "",
          `<p>the user  <b>${user.name}</b>  was Disabled<p>`
        );
        setstatusUSer({ id: "", active: "" });
      } catch (error) {
        console.log("sms error: ====>", error.message);
      }
    }
  };

  const handleDteail = (event) => {
    const { id, name } = event.target;
    const use = auth?.allUsers?.filter((s) => s.id === Number(id) && s);
    setSelectUser(use);
    if (String(name) === "close") setViewdetail(false);
    if (String(name) === "detail") setViewdetail(true);
  };

  return (
    <>
      {loading === true ? (
        <div className={style.prodsContLoader}>
          <img src={loader} alt="Loader"></img>
        </div>
      ) : (
        <main className={style.CustomerSection}>
          <h1>Customers</h1>
          <div className={style.Table}>
            <TableContainer
              // component={Paper}
              style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
              className={style.modTableContainer}
            >
              {!viewdetail ? (
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
                  <TableBody
                    style={{ color: "white", backgroundColor: "transparent" }}
                  >
                    {auth?.allUsers?.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.origin}</TableCell>
                        <TableCell align="left">{row.role.name}</TableCell>

                        <TableCell align="left">
                          <button
                            type="submit"
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
                            id={row.id}
                            name="detail"
                            variant="outlined"
                            size="small"
                            onClick={handleDteail}
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <>
                  <Button
                    align="center"
                    variant="outlined"
                    size="small"
                    name="close"
                    onClick={handleDteail}
                  >
                    x
                  </Button>
                  <UserUpdate key={selectUser.id} row={selectUser[0]} />
                </>
              )}
            </TableContainer>
          </div>
        </main>
      )}
    </>
  );
};
